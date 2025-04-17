const Event = require('../Schema/Event')

const addEvent = async (req, res) => {
  try {
    
      const event = new Event(req.body)
      console.log(event)
      await event.save();
      res.status(201).json({ message: "Event Added Successfully", event });
   
    }

   catch (e) {
    res.status(500).json({ message: "Error while adding event: " + e.message });
  }
};

const getCollegeEvent = async (req,res)=>{
  try {
    const events = await Event.find({collegeUid:req.params.collegeUid}); // Fetches all documents in the Event collection
    res.status(200).json({ success: true, events }); // `events` will be an array
  } catch (e) {
    res.status(500).json({ success: false, error: "Internal server error: " + e.message });
  }
}

const getEventList = async (req,res)=>{
  try {
    const events = await Event.find(); 
    res.status(200).json({ success: true, events });
  } catch (e) {
    res.status(500).json({ success: false, error: "Internal server error: " + e.message });
  }
}

const deleteEvent = async (req, res) => {
  console.log("Delete event called: " + req.params.eventId);
  try {
    const eventId = req.params.eventId;
    const result = await Event.deleteOne({ _id: eventId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, message: 'Event Deleted Successfully' });
  } catch (e) {
    console.error("Error deleting event:", e);
    res.status(500).json({ success: false, message: 'Internal Server Error: ' + e.message });
  }
};

const getEvent = async (req,res) =>{
  console.log("Event Loaded"+req.params.eventId)
  try{
    const eventId = req.params.eventId
    const event = await Event.findOne({_id:eventId})
    if(!event)
      return res.status(404).json({success:false,message:"Event not found"})

    res.status(200).json({success:true,event:event})
  }
  catch(e)
  {
    console.log("Error Loading Event:"+e)
    res.status(500).json({success:false,message:"Internal server error:"+e})
  }

}


module.exports = {addEvent , getCollegeEvent,deleteEvent,getEventList,getEvent}