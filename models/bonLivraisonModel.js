const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const bonLivraisonSchema = new mongoose.Schema({
    code: {type:Number, unique:true},
    dateEntree: {type: Date, required:true},
    // materiel: {type: String, lowercase:true},
    materiel: {type: String, required:true},
    unite: {type: String, required: true},
    prixUnitaire: {type: Number},
    quantite: {type: Number, required: true},
    prixTotal: {type: Number},
})

bonLivraisonSchema.plugin(AutoIncrement, {inc_field:'code'})
const BonLivraisonModel = mongoose.model('bonLivraisons', bonLivraisonSchema)
module.exports = BonLivraisonModel