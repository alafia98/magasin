const mongoose = require('mongoose')

const typeMaterielSchema = new mongoose.Schema({
    typeMaterielId: {type:String, required:true},
    nomTypeMateriel: {type:String, required:true},
    
}, {timestamps: true})

const typeMaterielModel = mongoose.model('typeMateriels', typeMaterielSchema)
module.exports = typeMaterielModel