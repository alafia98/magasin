const mongoose = require('mongoose')

const departementSchema = new mongoose.Schema({
    departementId: {type:String, required:true},
    nomDepartement: {type:String, required:true},
    
    status: {type:String, default:'pending'},
    
}, {timestamps: true})

const departementModel = mongoose.model('departements', departementSchema)
module.exports = departementModel