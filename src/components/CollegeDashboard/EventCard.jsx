import React from 'react'
import '../common.css'
import './Eventcard.css'

const EventCard = ({event}) => {
  return (
    <div className=' event-card'>
    <div className="inner">

        <h4>{event.eventName}</h4>
        {event.collegeName} : {event.eventDate}
        <img src={event.imageUrl} alt="Image not found" />
        <div className="details">
            {event.eventDetails}
        </div>
        <div className="buttons">
            <button>View</button>
            <button>Wishlist</button>
        </div>
        
    </div>
    </div>
  )
}

export default EventCard
