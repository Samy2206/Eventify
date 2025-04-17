const express = require('express')
const router = express.Router()

const{sendRequest} = require('../controllers/register')

router.post('/sendrequest',sendRequest)

module.exports = router