const states = require('./states')
const student = require('./student')
const college = require('./college')
const event = require('./event')
const express = require('express')

const router = express.Router()


router.use('/user/college',college)
router.use('/api',states)
router.use('/user/student',student)
router.use('/event',event)

module.exports= router
