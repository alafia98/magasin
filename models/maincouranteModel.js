const mongoose = require('mongoose')
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const mainCouranteSchema = new mongoose.Schema({
    article:{type:String},
    observation:{type:String},
    date: {type:Date, default: Date.now},
    entree:{type:Number},
    sortie:{type:Number},
    stock:{type:Number},

}, {timestamps: true})

// mainCouranteSchema.plugin(AutoIncrement, {inc_field:'code'})
const mainCouranteModel = mongoose.model('mainCourante', mainCouranteSchema)
module.exports = mainCouranteModel