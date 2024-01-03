const mongoose = require('mongoose')

const societeSchema = new mongoose.Schema({
    societeId: {type:String, required:true},
    nomSociete: {type:String, required:true},
    adresse: {type:String},
    email: {type:String, required:true},
    fax: {type:Number},
    nomContact: {type:String},
    fonction: {type:String},
    phone: {type:Number},
    observation: {type:String}
}, {timestamps: true})

const societeModel = mongoose.model('societes', societeSchema)
module.exports = societeModel