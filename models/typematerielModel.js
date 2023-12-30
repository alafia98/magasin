const mongoose = require('mongoose')

const typeMaterielSchema = new mongoose.Schema({
    typeMaterielId: {type:String, required:true},
    nomTypeMateriel: {type:String, required:true},
    status: {type:String, default:'pending'},
    
}, {timestamps: true})

const typeMaterielModel = mongoose.model('societes', typeMaterielSchema)
module.exports = typeMaterielModel