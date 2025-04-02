const router = require('express').Router()
const {registerCollege,loginCollege,setDetails,verifyCollege} = require('../controllers/college')
const verifyTokenCollege = require('../middleware/verifyTokenCollege')

router.post('/register',verifyTokenCollege,registerCollege)
router.post('/login',verifyTokenCollege,loginCollege)
router.post('/details',setDetails)
router.get('/verify/:collegeUid',verifyCollege)


module.exports = router