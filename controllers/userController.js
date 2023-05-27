const User = require('../models/User');

exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json({ users: users });
        })
        .catch(err => console.log(err));
}

exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User no found' });

            }
            res.status(200).json({ user: user });
        })
        .catch(err => console.log(err));
}

exports.createUser = (req, res, next) => {
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;
    User.create({
        firstName: firstName,
        email: email,
        password: password,
    })
        .then(result => {
            console.log('Created User');
            res.status(201).json({
                message: 'User created successfully!',
                user: result
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
