const mongoose = require('mongoose')
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const bonCommandeSchema = new mongoose.Schema({
    dateSortie: {type: Date, default: Date.now},
    article: {type: String,required: true,},
    unite: {type: String,required: true,},
    quantiteDemandee: {type: Number,required: true},
    quantiteLivre: {type: Number, required:true},
})

const BonCommande = mongoose.model('bonCommande', bonCommandeSchema)
module.exports = BonCommande