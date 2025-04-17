const {loginStudent,registerStudent,getStudentDetails,updateStudent} = require('../controllers/student')
const router = require('express').Router()
const verifyTokenStudent = require('../middleware/verifyTokenStudent')


router.post('/login',verifyTokenStudent,loginStudent)
router.post('/register',verifyTokenStudent,registerStudent)
router.get('/getDetails/:studentUid',getStudentDetails)
router.post('/update/:studentUid',updateStudent)

module.exports = router