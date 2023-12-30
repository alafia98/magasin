const mongoose = require('mongoose')

const materielSchema = new mongoose.Schema({
    materielId: {type:String, required:true},
    nomMateriel: {type:String, required:true},
    
    status: {type:String, default:'pending'},
    
}, {timestamps: true})

const materielModel = mongoose.model('materiels', materielSchema)
module.exports = materielModel