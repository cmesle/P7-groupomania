const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('dotenv')

exports.signup = (req, res, next) => {
    async function saveNewUser() {
           let hashedEmail = await bcrypt.hash(req.body.email, 10)

            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({                        // creating new user after password hashing
                        email: hashedEmail,
                        pseudo: req.body.pseudo,
                        role: 'user',
                        password: hash
                    })

                    user.save()
                        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                        .catch((error) => res.status(400).json({ error }))
                })
                .catch((error) => res.status(500).json({ error }))
    }
    saveNewUser()
}

exports.login = (req, res, next) => {
  User.find()
        .then((usersArray) => {
            // looking for the user trying to log in in the database
            for (const user of usersArray) {
                // checking email
                bcrypt.compare(req.body.email, user.email)
                    .then((valid) => {
                        if (valid) {
                            User.findOne({ email: user.email })
                                .then((user) => {
                                    // checking if the password is ok
                                    bcrypt.compare(req.body.password, user.password)
                                        .then((valid) => {
                                            if (!valid) {
                                                return res.status(401).json({message: 'email et/ou mot de passe incorrect(s)'})
                                            } else {
                                                return res.status(200).json({
                                                    userId: user._id,
                                                    token: jwt.sign(
                                                        { userId: user._id,
                                                        userRole:user.role },
                                                        process.env.TOKEN,
                                                        { expiresIn: '24h' }
                                                    ),
                                                })
                                            }
                                        })
                                        .catch((error) =>
                                            res.status(500).json({ error })
                                        )
                                })
                                .catch((error) =>
                                    res.status(500).json({ error })
                                )
                            }
                    })
                    .catch((error) => res.status(500).json({ error }))
            }
        })
        .catch((error) => res.status(500).json({ error }))

    // User.findOne({ email: req.body.email })
    //     .then(user => {
    //         if (!user) {
    //             return res.status(401).json({ message: 'email et/ou mot de passe incorrect(s)' })
    //         } else {
    //             bcrypt.compare(req.body.email, user.email)
    //                 .then(
    //                     // checking if the password is ok
    //                     bcrypt.compare(req.body.password, user.password)
    //                         .then(valid => {
    //                             if (!valid) {
    //                                 return res.status(401).json({ message: 'email et/ou mot de passe incorrect(s)' })
    //                             } else {
    //                                 return res.status(200).json({
    //                                     userId: user._id,
    //                                     token: jwt.sign(
    //                                         { userId: user._id },
    //                                         process.env.TOKEN,
    //                                         { expiresIn: '24h' }
    //                                     )
    //                                 })
    //                             }
    //                         })
    //                         .catch(error => res.status(500).json({ error }))
    //                 )
    //                 .catch(error => res.status(500).json({ error }))
    //         }
    //     })
    //     .catch(error => res.status(500).json({ error }))
}

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.getUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) =>
            res.status(200).json({
                userId: user._id,
                userPseudo: user.pseudo,
                userRole: user.role
            })
        )
        .catch((error) => res.status(445).json({ error }))
}
