const express = require('express')
const authMiddleware = require("../middlewares/authMiddleware")
const {loginController, registerController, authController, getSocietesController,
    getTypeMaterielsController, getServicesController, getMainCourantesController,
    getMaterielsController, ajouterTypeMaterielController, ajouterSocieteController,
    ajouterServiceController,ajouterMaterielController, getBonLivraisonsController,
    ajouterBonLivraisonController,getBonCommandesController, ajouterBonCommandeController,
    ajouterMainCouranteController, getStockController,
} = require('../controllers/userCtrl')

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

// main commande
router.get('/getMainCourantes', authMiddleware, getMainCourantesController);
router.post('/ajouterMainCourante', authMiddleware, ajouterMainCouranteController)

// Service
router.get('/getServices', authMiddleware, getServicesController);
router.post('/ajouterService', authMiddleware, ajouterServiceController)
// router.put('/modifierService/:id', authMiddleware, modifierServiceController)

// Societes
router.get('/getSocietes', authMiddleware, getSocietesController);
router.post('/ajouterSociete', authMiddleware, ajouterSocieteController)


router.get('/stock', authMiddleware, getStockController)

module.exports = router;