const express = require('express');
const router = express.Router();
const bonLivraisonController = require('../controllers/bonLivraisonController');

// Ajouter un Bon Livraison
router.post('/bonlivraison', bonLivraisonController.addBonLivraison);

module.exports = router;