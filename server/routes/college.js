const router = require('express').Router()
const {registerCollege,loginCollege,setDetails,verifyCollege,getDetails,getCollegeList,changeStatus} = require('../controllers/college')
const verifyTokenCollege = require('../middleware/verifyTokenCollege')

router.post('/register',verifyTokenCollege,registerCollege)
router.post('/login',verifyTokenCollege,loginCollege)
router.post('/details',setDetails)
router.get('/verify/:collegeUid',verifyCollege)
router.get('/details/:collegeUid',getDetails)
router.get('/getlist',getCollegeList)
router.put('/changestatus/:collegeUid',changeStatus)

module.exports = router