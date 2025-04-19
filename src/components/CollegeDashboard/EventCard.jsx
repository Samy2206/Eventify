import React from 'react'
import '../common.css'
import './Eventcard.css'
import { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const EventCard = ({event  , refreshEvents}) => {

  const Navigate = useNavigate()

  const [collegeName,setCollegeName] = useState('')

  useEffect(() => {
   getCollegeName()
  }, []);
  

  const handleViewEvent=()=>{

    if(localStorage.getItem('userType')==='student')
    {
      console.log(event._id)
      Navigate('ViewEvent',{state:{eventId:event._id,collegeName:collegeName}})
    }
    else
    { 
      Navigate('/EventPage/ViewEvent',{state:{eventId:event._id,collegeName:collegeName}})
    }

  }

  const handleWishlistEvent=async()=>{
    try{
        const response = await fetch(`http://localhost:5000/wishlist`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            eventId:event._id,
            studentUid:localStorage.getItem('studentUid')
          })
        })

        const data = response.json()
        if(!response.ok)
          alert('Unable to wishlist event')

        alert('Event Wishlisted')
          return 
        
    }catch(e)
    {
      return console.log("Error wishlisting event: ",e)
    }
  }

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/event/delete/${event._id}`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        }
      });
  
      const data = await response.json();
      console.log(data.message);
  
      if (data.success) {
        alert('Event deleted successfully');
        refreshEvents()
        
      } else {
        alert('Failed to delete: ' + data.message);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };
  
  const getCollegeName = async ()=>{
    const response = await fetch(`http://localhost:5000/user/college/details/${event.collegeUid}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      }
    })

    const data = await response.json()
    console.log(data.name)
    setCollegeName(data.name)
  }

  return (
    <div className=' event-card'>
    <div className="inner">

        <h4>{event.eventName}</h4>
        {collegeName} : {event.date}
        <img src={event.poster} alt="Image not found" />
        <div className="details">
            {event.description}
        </div>
        <div className="buttons">
            <button onClick={handleViewEvent}>View</button>
            {localStorage.getItem('userType') === 'student'? 
            <>
              <button onClick={handleWishlistEvent}>Wishlist</button>
            </> : 
            <>
              <button onClick={handleDeleteEvent}>Delete</button>
            </>}
        </div>
        
    </div>
    </div>
  )
}

export default EventCard
