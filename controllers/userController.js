const db = require('../models');
const User = db.user;
const Password = db.password;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");







//signing a user up
//hashing users password before its saved to the database with bcrypt
exports.signup = async (req, res) => {
    try {
        const { firstName, email, password } = req.body;
        const data = {
            firstName,
            email,
            password: await bcrypt.hash(password, 10),
        };
        //saving the user
        const user = await User.create(data);

        //if user details is captured
        //generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            //send users details
            return res.status(201).send(user);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};


//login authentication

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //find a user by their email
        const user = await User.findOne({
            where: {
                email: email
            }

        });

        //if user email is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            //if password is the same
            //generate token with the user's id and the secretKey in the env file

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                //if password matches wit the one in the database
                //go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                //send user data
                return res.status(201).send(user);
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};




exports.getUsers = (req, res, next) => {
    User.findAll({
        include: [{
            model: Password,
            attributes: ['password']
        }]
    })
        .then(users => {
            res.status(200).json({ users: users });
        })
        .catch(err => console.log(err));
}

exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId, {
        include: [{
            model: Password,
            attributes: ['password']
        }]
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User no found' });
            }
            user.getPassword().then(password => {
                console.log(password);
            })
            res.status(200).json({ user: user });
        })
        .catch(err => console.log(err));
}

exports.createUser = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    User.create({
        firstName: firstName,
        email: email,
        lastName: lastName,
    })
        .then(user => {
            // create a new password record with the user ID and password
            Password.create({
                password: password
            })
                .then(password => {
                    user.setPassword(password);
                    console.log('Saved Password');
                    res.status(201).json({
                        message: 'User created successfully!',
                        user: user
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
}


exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const updatedFirstName = req.body.firstName;
    const updatedEmail = req.body.email;
    const updatePassword = req.body.password;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            user.firstName = updatedFirstName;
            user.email = updatedEmail;
            user.password = updatePassword;
            Password.findOne({ where: { userId: userId } })
                .then(password => {
                    if (!password) {
                        return res.status(404).json({ message: 'Password record not found!' });
                    }
                    password.password = updatePassword;
                    return password.save();
                })
                .then(result => {
                    res.status(200).json({ message: 'Password updated!', password: result });
                })
            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: 'User updated!', user: result });
        })
        .catch(err => console.log(err));
}


exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            return User.destroy({
                where: {
                    id: userId
                }
            });
        })
        .then(result => {
            res.status(200).json({ message: 'User deleted!' });
        })
        .catch(err => console.log(err));
}
