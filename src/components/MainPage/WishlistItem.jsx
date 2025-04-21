import React, { useEffect, useState } from 'react'
import './WishlistItem.css'
import { useNavigate } from 'react-router-dom'

const WishlistItem = ({ item }) => {
    const Navigate = useNavigate()
    const [event, setEvent] = useState('')
    const [collegeName,setCollegeName] = useState('')
    const [regFlag,setRegFlag] = useState(false)

    useEffect(() => {
        const fetchEventAndCheck = async () => {
            await loadEvent()
        }
        fetchEventAndCheck()
    }, [])
    
    useEffect(() => {
        if (event._id) {
            checkRegistered()
            getCollegeName()
        }
    }, [event])
    

    const getCollegeName = async()=>{
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

    const loadEvent = async () => {
        try {
            const response = await fetch(`http://localhost:5000/event/loadevent/${item}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (!response.ok) {
                console.log(data)
                return
            }
            setEvent(data.event)

        } catch (e) {
            console.log("Error loading event data: ", e)
            return
        }

    }

    const checkRegistered = async()=>{
        try{
            const response = await fetch('http://localhost:5000/register/checkregistered',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    studentUid:localStorage.getItem('studentUid'),
                    eventId:event._id
                })
            })

            if(response.ok)
                setRegFlag(true)

            if(!response.ok)
                console.log('Error checking registration')

        }catch(e)
        {
            console.log("Error checking registration: ",e)
            return
        }
    }

    const handleRemove = async () => {
        try {
          const response = await fetch(`http://localhost:5000/wishlist/remove`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                studentUid:localStorage.getItem('studentUid'),
                eventId:item
            })
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            console.log("Error removing event from wishlist", data);
            return;
          }
      
          // Refresh page
          window.location.reload();
        } catch (e) {
          console.log("Error removing wishlist item: ", e);
        }
      }
      

    return (
        <div className="wishlist-wrapper">
            
        <div className='wishlist-item common-inner-blur'>
            <h3>{event.eventName}</h3>
            <h3>{event.date}</h3>
            <h3>{event.deadline}</h3>
            <h3>{regFlag ? 'Registered' : 'Not Registered'}</h3>
            <div className="button">
            <button onClick={()=>Navigate('/EventPage/ViewEvent', {state:{eventId:event._id,collegeName:collegeName}})}>View</button>
            <button onClick={handleRemove}>Remove</button>

            </div>

        </div>
        </div>
    )
}

export default WishlistItem
