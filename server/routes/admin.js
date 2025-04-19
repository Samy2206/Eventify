const router = require('express').Router()
const {loginAdmin} = require('../controllers/admin')
const verifyTokenStudent = require('../middleware/verifyTokenStudent')

router.post('/login',verifyTokenStudent,loginAdmin)

module.exports = router