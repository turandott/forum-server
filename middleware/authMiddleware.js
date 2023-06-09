const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')

// const express = require("express");
// const db = require("../config/dbConfig");
// //Assigning db.users to User variable
//  const User = require("../models/User");

// //Function to check if username or email already exist in the database
// //this is to avoid having two users with the same username and email
//  const saveUser = async (req, res, next) => {
//  //search the database to see if user exist
//  try {
//    const firstName = await User.findOne({
//      where: {
//        firstName: req.body.firstName,
//      },
//    });
//    //if username exist in the database respond with a status of 409
//    if (firstName) {
//      return res.json(409).send("username already taken");
//    }

//    //checking if email already exist
//    const emailcheck = await User.findOne({
//      where: {
//        email: req.body.email,
//      },
//    });

//    //if email exist in the database respond with a status of 409
//    if (emailcheck) {
//      return res.json(409).send("Authentication failed");
//    }

//    next();
//  } catch (error) {
//    console.log(error);
//  }
// };

// //exporting module
//  module.exports = {
//  saveUser,
// };


module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
};