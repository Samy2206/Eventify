const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    uid:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
})

const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin