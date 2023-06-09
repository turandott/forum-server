const db = require('../models');
const User = db.user;
const Password = db.password;
const Role = db.role;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const { secret } = require("../config/config");
const { json } = require('sequelize');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {
    async registration(req, res, next) {

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors })
            }
            const avatar = req.body.avatar;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const email = req.body.email;
            const password = req.body.password;
            const role = req.body.role || "USER";
            const candidate = await User.findOne({ where: { email } })
            if (candidate) {
                return res.status(400).json({ message: "Пользователь с такой почтой уже существует" })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ where: { name: role } })
            const user = await User.create({ email: email, avatar: avatar, firstName: firstName, lastName: lastName, roleId: userRole.id })
            res.json(user.id)
            const passwordRecord = await Password.create({ password: hashPassword, userId: user.id })
            await user.setRoles([userRole.id])
            return res.json({ message: "Пользователь успешно зарегистрирован" })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: { email },
                include: [{ model: Password }]
            })
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${email} не найден` })
            }

            const validPassword = bcrypt.compareSync(password, user.password.password)
            if (!validPassword) {
                return res.status(400).json({ message: 'Введен неверный пароль' })
            }
            const userRole = await Role.findOne({ where: { id: user.roleId } })
            const token = generateAccessToken(user.id, userRole.name);
            return res.json({ token });
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Ошибка при входе в систему' })
        }
    }

    async getUsers(req, res) {

        try {
            // const userRole= Role.create();
            // const adminRole=Role.create({name: "ADMIN"})
            // res.json("server work")
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()
