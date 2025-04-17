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
    approved:{
        type:Boolean,
        default:false,
    },
    rejected:{
        type:Boolean,
        default:false,
    },
    mobileNo:{
        type:String,
    }
},{timestamps:true})

const Request = mongoose.model('Request',requestSchema)

module.exports = Request