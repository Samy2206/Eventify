const router = require('express').Router()
const {createOrder,makePayment,addPayment,getPaymentDetails} = require('../controllers/pay')

router.post('/order',createOrder)
router.post('/verify',makePayment)
router.post('/addPayment',addPayment)
router.get('/getDetails/:paymentId',getPaymentDetails)

module.exports = router