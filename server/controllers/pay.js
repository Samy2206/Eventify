const Razorpay = require('razorpay')
const crypto = require('crypto')
const Payment = require('../Schema/Payment')
const Request = require('../Schema/Request')
require('dotenv').config()

var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });


  const createOrder=async(req,res)=>{
  
    try{
    const options = req.body
    console.log(options)
  
    //order creation
    order = await instance.orders.create(options)
  
    if(!order)
      return res.status(500).json({success:false,message:'Error creating order',e})
  
    res.status(200).json({success:true,order})
  }
  catch(e)
  {
    console.log('Error creating order: ',e)
    return res.status(500).json({success:false,message:'Internal Server Error: ',e})
  }
  }


  const makePayment = async(req, res) => {
    const { order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    const body = order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');
  
    const isValid = expectedSignature === razorpay_signature;
  
    if (isValid) {
      
      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  }

  const addPayment = async(req,res)=>{
    try{
      const {paymentId,amount,orderId,eventId,requestId} = req.body
      const payment = await new Payment({paymentId,amount,orderId,eventId,requestId})

      if(!payment)
        return res.status(400).json({success:false,message:'Error Adding Payment'})

      await payment.save()

      await Request.findOneAndUpdate({_id:requestId},{$set:{paymentId:paymentId}})

      res.status(200).json({success:true,payment:payment})
    }
    catch(e)
    {
      console.log("Error Adding Event: ",e)
      return res.status(500).json({success:false,message:'Internal Server Error: ',e})
    }
  }

  const getPaymentDetails = async(req,res)=>{
    try{  
        const payment = await Payment.findOne({paymentId:req.params.paymentId})
        if(!payment)
          return res.status(404).json({success:false,message:'Payment Not Found'})

        res.status(200).json({success:true,payment:payment})

    }catch(e)
    {
      console.log("Error fetching Payment Details: ",e)
      return res.status(500).json({success:false,message:'Internal Server Error: ',e})
    }
  }


  module.exports = {createOrder,makePayment,addPayment,getPaymentDetails}