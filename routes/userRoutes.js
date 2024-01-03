const express = require('express')
const {loginController, 
    registerController, 
    authController,
    getSocietesController,
    getTypeMaterielsController,
    getServicesController,
    getSourcesAchatController,
    getMaterielsController
} = require('../controllers/userCtrl')
const authMiddleware = require("../middlewares/authMiddleware")

// router project
const router = express.Router()

// routes
// LOGIN || POST
router.post('/login', loginController)

// REGISTER || POST
router.post('/register', registerController)

// AUTH || POST
router.post('/getUserData', authMiddleware, authController);

// Societes
router.get('/getSocietes', authMiddleware, getSocietesController);

router.get('/getTypeMateriels', authMiddleware, getTypeMaterielsController);

router.get('/getMateriels', authMiddleware, getMaterielsController);

router.get('/getServices', authMiddleware, getServicesController);

router.get('/getSourceAchat', authMiddleware, getSourcesAchatController);

module.exports = router;