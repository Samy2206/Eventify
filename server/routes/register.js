const express = require('express')
const router = express.Router()

const{sendRequest,getRequests,approveRequest,rejectRequest,checkRegistered,getStudentRequests,updatePaymentStatus} = require('../controllers/register')

router.post('/sendrequest',sendRequest)
router.get('/getrequests/:eventId',getRequests)
router.put('/approve/:requestId',approveRequest)
router.put('/reject/:requestId',rejectRequest)
router.get('/student/requests/:studentUid',getStudentRequests)
router.put('/updatepaymentstatus/:requestId',updatePaymentStatus)
router.post('/checkregistered',checkRegistered)

module.exports = router