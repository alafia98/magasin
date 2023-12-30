const mongoose = require('mongoose')

const societeSchema = new mongoose.Schema({
    societeId: {type:String, required:true},
    nomSociete: {type:String, required:true},
    sourceAchat: {type:String, required:true},
    adresse: {type:String},
    ville: {type:String},
    region: {type:String},
    nomContact: {type:String},
    fonction: {type:String},
    phone: {type:String},
    email: {type:String},
    status: {type:String, default:'pending'},
    
}, {timestamps: true})

const societeModel = mongoose.model('societes', societeSchema)
module.exports = societeModel