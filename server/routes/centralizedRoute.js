const states = require('./states')
const student = require('./student')
const college = require('./college')
const express = require('express')

const router = express.Router()


router.use('/user/college',college)
router.use('/api',states)
router.use('/user/student',student)

module.exports= router
