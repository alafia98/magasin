const express = require('express')
const {loginController, registerController, authController, getSocietesController,
    getTypeMaterielsController, getServicesController,
    getMaterielsController, ajouterTypeMaterielController, ajouterSocieteController,
    ajouterServiceController,ajouterMaterielController, getBonLivraisonsController,
    ajouterBonLivraisonController,getBonCommandesController, ajouterBonCommandeController,
    
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


// bon livraison
router.get('/getBonLivraisons', authMiddleware, getBonLivraisonsController);
router.post('/ajouterBonLivraison', authMiddleware, ajouterBonLivraisonController);

// bon commande
router.get('/getBonCommandes', authMiddleware, getBonCommandesController);
router.post('/ajouterBonCommande', authMiddleware, ajouterBonCommandeController);

// Service
router.get('/getServices', authMiddleware, getServicesController);
router.post('/ajouterService', authMiddleware, ajouterServiceController)
// router.put('/modifierService/:id', authMiddleware, modifierServiceController)

// Societes
router.get('/getSocietes', authMiddleware, getSocietesController);
router.post('/ajouterSociete', authMiddleware, ajouterSocieteController)

module.exports = router;