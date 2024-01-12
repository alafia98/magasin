const mongoose = require('mongoose')

const bonLivraisonSchema = new mongoose.Schema({
    code: {type:Number, unique:true},
    date: {type: Date,default: Date.now},
    article: {type: String,required: true,},
    unite: {type: String,required: true,},
    prixUnitaire: {type: Number,required: true,},
    quantite: {type: Number,required: true,},
    prixTotal: {type: Number,required: true,},
})

const BonLivraison = mongoose.model('BonLivraison', bonLivraisonSchema)
module.exports = BonLivraison