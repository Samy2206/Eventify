const router = require('express').Router()
const {addEvent,getCollegeEvent,deleteEvent,getEventList} = require('../controllers/event')

router.use('/addevent',addEvent)
router.use('/list/:collegeUid',getCollegeEvent)
router.use('/delete/:eventId',deleteEvent)
router.use('/list',getEventList)

module.exports = router