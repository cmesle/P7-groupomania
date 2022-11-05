const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const regex = require('../middleware/regex')

router.post('/signup', userCtrl.signup) // remettre regex
router.post('/login', userCtrl.login) // remettre regex
router.get('/user', userCtrl.getAllUsers) // remettre regex
router.get('/user/:id', userCtrl.getUser) // remettre regex

module.exports = router