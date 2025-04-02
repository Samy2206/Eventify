const express = require('express')
const router = express.Router()

const {getStates,getDistricts} = require('../controllers/states')

router.get('/states',getStates)
router.get('/districts/:stateId',getDistricts)

module.exports = router