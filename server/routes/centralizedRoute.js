const states = require('./states')
const student = require('./student')
const college = require('./college')
const event = require('./event')
const register = require('./register')
const pay = require('./pay')
const  wishlist = require('./wishlist')
const admin = require('./admin')
const express = require('express')

const router = express.Router()


router.use('/user/college',college)
router.use('/api',states)
router.use('/user/student',student)
router.use('/event',event)
router.use('/register',register)
router.use('/pay',pay)
router.use('/user/admin',admin)
router.use('/wishlist',wishlist)

module.exports= router
