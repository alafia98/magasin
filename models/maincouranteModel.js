const mongoose = require('mongoose')

const maincouranteSchema = new mongoose.Schema({
    entre: {type:date},
    sortie: {type:date},
}, {timestamps: true})

const maincouranteModel = mongoose.model('maincourante', maincouranteSchema)
module.exports = maincouranteModel