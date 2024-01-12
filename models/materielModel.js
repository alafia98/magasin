const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const materielSchema = new mongoose.Schema({
    nomMateriel: {type:String, required:true, unique:true},
    slug: {type:String, lowercase:true},
    typeMateriel: {type: Schema.Types.ObjectId, ref:"typeMateriels", required:true},
    unite: {type:String},
    model: {type:String},
    serie: {type:String},
    reference: {type:String},    
}, {timestamps: true})

const materielModel = mongoose.model('materiels', materielSchema)
module.exports = materielModel