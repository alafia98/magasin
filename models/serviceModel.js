const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    serviceId: {type:String, required:true},
    nomService: {type:String, required:true},
}, {timestamps: true})

const serviceModel = mongoose.model('services', serviceSchema)
module.exports = serviceModel