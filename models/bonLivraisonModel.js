const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const bonLivraisonSchema = new mongoose.Schema({
    code: {type:Number, unique:true},
    date: {type: Date, default: Date.now},
    article: {type: String,required: true,},
    unite: {type: String,required: true,},
    prixUnitaire: {type: Number},
    quantite: {type: Number,required: true,},
    prixTotal: {type: Number},
})

bonLivraisonSchema.plugin(AutoIncrement, {inc_field:'code'})
const BonLivraison = mongoose.model('bonLivraison', bonLivraisonSchema)
module.exports = BonLivraison