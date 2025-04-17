const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    uid:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
    },
    name:{
        type:String,
        required:true
    },
    collegeName:{
        type:String,
        default:'NA'
    },
    idCard:{
        type:String
    },
    profilePicture:{
        type:String
    },
    mobileNo:{
        type:String,
    },
},{timestamps:true})

const Student = mongoose.model('Student',studentSchema)
module.exports = Student