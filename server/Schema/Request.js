const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    studentUid:{
        type:String,
        required:true,
    },
    collegeUid:{
        type:String,
        required:true,
    },
    eventId:{
        type:String,
        required:true,
    },
    recommendationLetter:{
        type:String,
    },
    profilePicture:{
        type:String,
        required:true
    },
    idCard:{
        type:String,
    },
    request:{
        type:String,
        default:'pending'
    },
    mobileNo:{
        type:String,
    },
    payment:{
        type:Boolean,
        default:false,
    },
    paymentId:{
        type:String,
    }
},{timestamps:true})

const Request = mongoose.model('Request',requestSchema)

module.exports = Request