const express = require('express')
const {loginController, registerController, authController, getSocietesController,
    getTypeMaterielsController, getServicesController, getSourcesAchatController,
    getMaterielsController, ajouterTypeMaterielController, ajouterSocieteController,
    ajouterServiceController,ajouterMaterielController
} = require('../controllers/userCtrl')
const authMiddleware = require("../middlewares/authMiddleware")
// router project
const router = express.Router()
// LOGIN 
router.post('/login', loginController)
// REGISTER 
router.post('/register', registerController)
// AUTH 
router.post('/getUserData', authMiddleware, authController);

// Type Materiel
router.get('/getTypeMateriels', authMiddleware, getTypeMaterielsController);
router.post('/ajouterTypeMateriel', authMiddleware, ajouterTypeMaterielController);
// router.put('/modifierTypeMateriel/:id', authMiddleware, modifierTypeMaterielController);

// Materiel
router.get('/getMateriels', authMiddleware, getMaterielsController);
router.post('/ajouterMateriel', authMiddleware, ajouterMaterielController);
// router.put('/modifierMateriel/:id', authMiddleware, modifierMaterielController);

// Service
router.get('/getServices', authMiddleware, getServicesController);
router.post('/ajouterService', authMiddleware, ajouterServiceController)
// router.put('/modifierService/:id', authMiddleware, modifierServiceController)

// Societes
router.get('/getSocietes', authMiddleware, getSocietesController);
router.post('/ajouterSociete', authMiddleware, ajouterSocieteController)

module.exports = router;