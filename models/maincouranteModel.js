const mongoose = require('mongoose')

const mainCouranteSchema = new mongoose.Schema({
    materiel:{type:String},
    unite:{type:String},
    observation:{type:String},
    dateEntree: {type:Date, default: Date.now},
    qteEntree: {type:Number},
    dateSortie: {type:Date, default: Date.now},
    qteSortie: {type:Number},


}, {timestamps: true})

const mainCouranteModel = mongoose.model('mainCourante', mainCouranteSchema)
module.exports = mainCouranteModel