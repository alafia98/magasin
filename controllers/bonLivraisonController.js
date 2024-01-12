const BonLivraison = require('../models/bonLivraisonModel');

exports.addBonLivraison = async (req, res) => {
  try {
    const bonLivraison = new BonLivraison(req.body);
    const result = await bonLivraison.save();
    res.json(result);
  } catch (error) {
    console.error('Error adding Bon Livraison:', error.message);
    res.status(500).json({ error: 'Failed to add Bon Livraison' });
  }
};