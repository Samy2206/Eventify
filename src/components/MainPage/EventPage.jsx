import React from 'react'
import '../common.css'
import './EventPage.css'
import { useState , useEffect} from 'react'
import EventCard from '../CollegeDashboard/EventCard'
const EventPage = () => {

  const [events,setEvents]= useState([])


  useEffect (()=>{
          loadEvents()
         
      },[])
  
  
      const loadEvents = async () => {
          try {
              const response = await fetch(`http://localhost:5000/event/list/`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                  },
              });
      
              if (!response.ok) {
                  throw new Error(`Failed to fetch events: ${response.statusText}`);
              }
      
              const data = await response.json();
              console.log("Events fetched:", data.events); // for debugging
              setEvents(data.events); // This sets the array of events
          } catch (error) {
              console.error("Error loading events:", error);
          }
      };

  return (
    <div className='common-blurbg , event-page'>
    {events.length !== 0 ?
      <div className="grid-container">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} refreshEvents={loadEvents}/>
                ))}
            </div> : <div className='no-events , common-inner-blur'>
              <h1 >No Events Listed.........</h1>
            </div>}
          
            
    </div>
  )
}

export default EventPage
