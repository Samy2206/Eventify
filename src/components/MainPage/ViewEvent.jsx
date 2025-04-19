import React from 'react'
import '../common.css'
import './ViewEvent.css'
import { useLocation } from 'react-router-dom'
import { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'

const ViewEvent = () => {
    const Navigate = useNavigate()
    const location = useLocation()
    const {eventId,collegeName} = location.state;
    const [event,setEvent] = useState(null)
    useEffect(()=>{
        loadData()
    },[eventId])

    const loadData = async ()=>{
        const response = await fetch(`http://localhost:5000/event/loadevent/${eventId}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        }
        )

        
        const data = await response.json()
        if(!response.ok)
        {
            console.log(data)
            return
        }

        await setEvent(data.event)

    }

    const handleRegister =()=>{
        Navigate('/EventPage/RegisterEvent' , {state:{event:event}})
    }

    return (
        <>
            {event ? (
                <div className="viewevent-page common-blurbg">
                    {/* <hr /> */}
                    <div className="info-bar common-inner-blur">
                        <h2>{collegeName}</h2>
                        <h1>{event.eventName}</h1>
                        <div className="date-time">
                            <h3>{event.date}</h3>
                            <h3>{event.time}</h3>
                        </div>
                    </div>
                    {/* <hr /> */}
    
                    <div className="event-description">
                        <div className="poster common-inner-blur">
                            <img
                                src={event.poster}
                                alt="Event Poster"
                            />
                        </div>
    
                        <div className="description common-inner-blur">
                        <h3>Description</h3>
                        <hr />
                        <br />
                            {event.description}
                        </div>

                        <div className="additional-details common-inner-blur">
                        <h3>Additional Details</h3>
                        <hr />
                        <h4>Deadline: {event.deadline}</h4>
                        <br />

                            {event.additionalDetails}
                        </div>
                    </div>
                    {/* <hr /> */}
    
                    <div className="eligibility-details">
                        <div className="team-details">
                            <h3 className='common-inner-blur'>Team Type: {event.teamType}</h3>
                            <h3 className='common-inner-blur'>Team Size: {event.teamSize}</h3>
                            <h3 className='common-inner-blur'>Seat Limit: {event.seatLimit}</h3>
                        </div>
    
                        <p className='common-inner-blur'> <h3 style={{display:'inline'}}>Eligibility Criteria:</h3> {event.criteria}</p>
                        <div>

                        <h4 className='common-inner-blur'>ID Card: {event.idCardRequired ? "Required" : "Not Required"}</h4>
                        <h4 className='common-inner-blur'>Fees: ₹{event.registrationFees}</h4>
                        </div>
                    </div>
                    {/* <hr /> */}
    
                    <div className="contact-details common-inner-blur">
                        <h4>Coordinator: {event.coordinator} ({event.contact})</h4>
                    </div>
    
                    {/* <hr /> */}
    
                    <div className="venue common-inner-blur">
                        <div className="address">
                            <h4>Venue:{event.venue}</h4>
                        </div>
                        <iframe
                            src={event.mapLink}
                            width="50%"
                            height="300"
                            style={{ border: '2px solid black' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
    
                    {/* <hr /> */}
                    <div className="button">
                    {localStorage.getItem('userType')==='student'?<>

                        <button onClick={()=>Navigate('/EventPage')}>Back</button>
                        <button onClick={handleRegister}>Register</button>
                    </>
                    :
                    <button onClick={()=>Navigate('/CollegeDashboard')}>Back</button>
                    }
                    </div>
                </div>
            ) : (
                <h3 style={{ textAlign: "center", marginTop: "100px" }}>Loading...</h3>
            )}
        </>
    );
    
}

export default ViewEvent
