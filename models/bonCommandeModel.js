const mongoose = require('mongoose')

const bonCommandeSchema = new mongoose.Schema({
    dateSortie: {type: Date, required:true},
    // materiel: {type: String,lowercase: true,},
    materiel: {type: String,required: true,},
    unite: {type: String,required: true},
    qteDemandee: {type: Number,required: true},
    qteLivree: {type: Number},
})

const BonCommandeModel = mongoose.model('bonCommande', bonCommandeSchema)
module.exports = BonCommandeModel