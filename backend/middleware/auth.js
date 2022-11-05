const jwt = require('jsonwebtoken')
const env = require('dotenv')
const User = require('../models/User')

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.TOKEN)
        const userId = decodedToken.userId
        const userRole = decodedToken.userRole

        req.auth = {
            userId: userId,
            userRole: userRole
        }

        next()
    } catch (error) {
        res.status(401).json({ error })
    }
}
