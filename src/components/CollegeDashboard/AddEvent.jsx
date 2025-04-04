import React from 'react'
import { useState } from 'react'
import './AddEvent.css'
import { useNavigate } from 'react-router-dom'
// import '../common.css'

const AddEvent = () => {
  const [participationType, setParticipationType] = useState("solo");
  const [eventDetails, setEventDetails] = useState({
    eName: '',
    eDescription: '',
    eType: '',
    eCategory: '',
    ePoster: null,
    eDate: '',
    eTime: '',
    eDeadLine: '',
    eVenue: '',
    eMapLink: '',
    eCriteria: '',
    tSize: '',
    eFees: '',
    card: 'Necessary',
    eLimit: '',
    eDeptName: '',
    eCoordinator: '',
    eContact: '',
    additionalDetails: '',
    eAddDetails:'',
  })
  const Navigate = useNavigate()

  const handleAddEventClick = async ()=>{
    const response = fetch('http://localhost:5000/event/addevent',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
    })

    const data = await response.json()
    if(response.ok)
    {
      console.log(data)
      Navigate('/CollegeDashBoard')
    }
    else{
      console.log(data)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setEventDetails((prev) => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (type === 'radio') {
      setEventDetails((prev) => ({
        ...prev,
        [name]: value
      }));
    } else {
      setEventDetails((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className='common-blurbg , add-event-page'>
      <div className="event-details">

        <div className="common-inner-blur , basic-event-details">
        <label htmlFor="">Event Details</label>
          <input type="text" name="eName" id="eName" placeholder='Name' value={eventDetails.eName} onChange={handleChange} />
          <textarea name="eDestription" id="eDescripton" placeholder='Description' /*value={eventDetails.eDescription}*/ onChange={handleChange} ></textarea>
          <select name="eType" value={eventDetails.eType} onChange={handleChange}>
            <option value="" disabled>Select Event Type</option>
            <option value="seminar">Seminar</option>
            <option value="workshop">Workshop</option>
            <option value="hackathon">Hackathon</option>
            <option value="conference">Conference</option>
            <option value="webinar">Webinar</option>
            <option value="competition">Competition</option>
            <option value="fest">Fest</option>
            <option value="sports">Sports Event</option>
            <option value="cultural">Cultural Event</option>
            <option value="technical">Technical Event</option>
            <option value="guest_lecture">Guest Lecture</option>
            <option value="meetup">Meetup</option>
            <option value="career_fair">Career Fair</option>
            <option value="other">Other</option>
          </select>
          <select name="eCategory" value={eventDetails.eCategory} onChange={handleChange}>
            <option value="">Select Event Category</option>
            <option value="technical">Technical</option>
            <option value="non_technical">Non-Technical</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="academic">Academic</option>
            <option value="entrepreneurship">Entrepreneurship</option>
            <option value="social">Social Service</option>
            <option value="career">Career & Placement</option>
            <option value="health">Health & Wellness</option>
            <option value="arts">Arts & Music</option>
            <option value="management">Management</option>
            <option value="robotics">Robotics & AI</option>
            <option value="coding">Coding & Development</option>
            <option value="business">Business & Finance</option>
            <option value="literature">Literature & Debate</option>
            <option value="fashion">Fashion & Lifestyle</option>
            <option value="other">Other</option>
          </select>
          <div className="event-poster">
            <label htmlFor="ePoster">Event Poster</label>
            <input type="file" name="ePoster" id="ePoster" accept='image/*' value={eventDetails.ePoster} onChange={handleChange}/>
          </div>

        </div>
        <div className="common-inner-blur , event-schedule-info">
        <label htmlFor="">Schedule Details</label>
          <div className="date-time">
          <label htmlFor=""> Date and Time: </label>
          <div className="date-time-inner">

           <input type="date" name="eDate" id="eDate" value={eventDetails.eDate} onChange={handleChange}/>
            <input type="time" name="eTime" id="eTime" value={eventDetails.eTime} onChange={handleChange}/>
          </div>
          </div>
          <div>

          <label htmlFor="">Deadline</label>
          <input type="date" name="eDeadLine" id="eDateLine" value={eventDetails.eDeadLine} onChange={handleChange}/>
          </div>
          <input type="text" name="eVenue" id="eVenue" placeholder='Venue' value={eventDetails.eVenue} onChange={handleChange}/>
          <input type="url" name="eMapLink" id="eMapLink" placeholder='Map Link' value={eventDetails.eMapLink} onChange={handleChange} />
        </div>
      </div>

      <div className="participation-criteria">
        <div className="common-inner-blur ,  participation-criteria-left">
        <label htmlFor="">Registration and Participation</label>
          <textarea name="eCriteria" id="eCriteria" placeholder='Eligibility Criteria' /*value={eventDetails.eCriteria}*/ onChange={handleChange}></textarea>
          <select name="tType" id="tType" value={eventDetails.eType} onChange={handleChange}>
            <option value="Solo">Solo</option>
            <option value="Team">Team</option>
          </select>
          {eventDetails.eType === "Team" &&
            <input type="number" name="tSize" id="tSize" placeholder='TeamSize' />
          }
          <input type="number" name="eFees" id="eFees" placeholder='Registration Fees' value={eventDetails.eFees} onChange={handleChange}/>
          <div>
            <label htmlFor="">Id Card:  </label> <br />
            <label htmlFor="">Yes </label>< input type="radio" name="card" id="card" defaultChecked value="Necessary" checked={eventDetails.card === 'Necessary'} onChange={handleChange}/>
            <label htmlFor="">  No </label><input type="radio" name="card" id="card" value="Not Necessary" checked={eventDetails.card === 'NotNecessary'} onChange={handleChange}/>
          </div>
          <input type="number" name="eLimit" id="eLimit" placeholder='Seat Limit' value={eventDetails.eLimit} onChange={handleChange} />
        </div>
        <div className="common-inner-blur , participation-criteria-right">
        <label htmlFor="">Organizer Details</label>
          <input type="text" name="eDeptName" id="eDeptName" placeholder='Department Name' value={eventDetails.eDeptName} onChange={handleChange}/>
          <input type="text" name="eCoordinator" id="eCoordinator" placeholder='Coordinator' value={eventDetails.eCoordinator} onChange={handleChange}/>
          <input type="text" name="eContact" id="eContact" placeholder='Phone Number / Email' value={eventDetails.eContact} onChange={handleChange}/>

        </div>
      </div>
      <div className="extra-details">
      <label htmlFor="">Additional Details</label>
        <textarea name="eAddDetails" id="eAddDetails" placeholder='Additional Details' value={eventDetails.eAddDetails} onChange={handleChange}></textarea>
      </div>
      <div className="add-button">
        <button onClick={handleAddEventClick}>Add</button>
      </div>
    </div>
  )
}

export default AddEvent
