import React from 'react'
import './EventList.css'
import '../common.css'
import { useNavigate } from 'react-router-dom'
import { div } from 'framer-motion/client'

const EventList = ({event}) => {
    const Navigate = useNavigate()


    const handleVerifyClick=()=>{
        Navigate('/CollegeDashboard/VerifyStudentList' , {state:{eventId:event._id}})
    }

  return (


    <div className='event-list blur-pending'>
      <h3>{event.eventName}</h3>
      <h3>Event date:{event.date}</h3>
      <h3>Approved:{event.approved}</h3>
      <h3>Rejected:{event.rejected}</h3>
      <button onClick={handleVerifyClick}>Verify</button>

    </div>
 
  )
}

export default EventList
