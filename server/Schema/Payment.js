const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    paymentId:{
        type:String,
        required:true,
    },
    orderId:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    eventId:{
        type:String
    },
    requestId:{
        type:String
    }
},{timestamps:true})

const Payment = mongoose.model('Payment',paymentSchema)

module.exports = Payment