const express = require('express')

const {
    handleSignInUserController,
    handleSignUpUserController,
} = require('../controller/user.controller')

const router = express.Router()

router.post('/create', handleSignUpUserController)
router.post('/login', handleSignInUserController)


module.exports = router;