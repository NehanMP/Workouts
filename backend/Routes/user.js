const express = require('express')

// Contoller functions 
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

// Login Route
router.post('/Login', loginUser)

// signup route
router.post('/Signup', signupUser)

module.exports = router