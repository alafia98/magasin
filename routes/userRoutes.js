const express = require('express')
const {loginController, registerController, authController} = require('../controllers/userCtrl')
const authMiddleware = require("../middlewares/authMiddleware")

// router project
const router = express.Router()

// routes
// LOGIN || POST
router.post('/login', loginController)

// REGISTER || POST
router.post('/register', registerController)

// AUTH || POST
// router.post('/getUserData', authMiddleware, authController)

// SOCIETE || POST

module.exports = router;