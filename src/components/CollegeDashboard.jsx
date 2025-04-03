import React from 'react'
import './common.css'
import './CollegeDashboard.css'
import EventCard from './CollegeDashboard/EventCard'
import { useState , useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faPlus);


const CollegeDashboard = () => {
    const Navigate = useNavigate()
    const location = useLocation();
    const collegeUid = location.state?.uid || "";
    const [vError,setVError] = useState(false)

    const [events, setEvents] = useState([])


    useEffect (()=>{
         handleAddEvent()
    },[])

   

    const handleAddEvent = async () => {
        try {
            const isVerified = await fetch(`http://localhost:5000/user/college/verify/${collegeUid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!isVerified.ok) {
                const errorData = await isVerified.json(); // Get error details from backend
                setVError(true)
                throw new Error(`Error: ${isVerified.status} - ${errorData.message || isVerified.statusText}`);
            }
    
            const data = await isVerified.json();
            console.log("Verification Response:", data);
            
        } catch (error) {
            console.error("Error verifying college:", error);
        }
    };
    

    return (
        <div className='common-blurbg , college-dashboard'>
        
        {vError ? (  <div className="outerError">
            <div className="vError">
    <h1 className="error-heading">Verification Under Process</h1>
    <div className="loading-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
    </div>
</div>
</div>
) : (
            <>
            <h3>College Dashboard</h3>
            <div className="grid-container">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            <button onClick={()=>Navigate('AddEvent')} className='floating-add-button'><FontAwesomeIcon icon={faPlus} className='fa-icon-add' /></button>
            </>
        )}
        </div>
    )
}

export default CollegeDashboard
