const mongoose = require('mongoose')

const sourceAchatSchema = new mongoose.Schema({
    sourceAchatId: {type:String, required:true},
    nomSourceAchat: {type:String, required:true},
}, {timestamps: true})

const sourceAchatModel = mongoose.model('sourceSAchats', sourceAchatSchema)
module.exports = sourceAchatModel