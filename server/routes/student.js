const {loginStudent,registerStudent} = require('../controllers/student')
const router = require('express').Router()
const verifyTokenStudent = require('../middleware/verifyTokenStudent')


router.post('/login',verifyTokenStudent,loginStudent)
router.post('/register',verifyTokenStudent,registerStudent)

module.exports = router