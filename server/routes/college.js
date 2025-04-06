const router = require('express').Router()
const {registerCollege,loginCollege,setDetails,verifyCollege,getDetails} = require('../controllers/college')
const verifyTokenCollege = require('../middleware/verifyTokenCollege')

router.post('/register',verifyTokenCollege,registerCollege)
router.post('/login',verifyTokenCollege,loginCollege)
router.post('/details',setDetails)
router.get('/verify/:collegeUid',verifyCollege)
router.get('/details/:collegeUid',getDetails)

module.exports = router