const mongoose = require('mongoose')

const typeMaterielSchema = new mongoose.Schema({
    nomTypeMateriel: {type:String, required:true, unique:true},
    slug: {type:String, lowercase:true}
}, {timestamps: true})

const typeMaterielModel = mongoose.model('typeMateriels', typeMaterielSchema)
module.exports = typeMaterielModel