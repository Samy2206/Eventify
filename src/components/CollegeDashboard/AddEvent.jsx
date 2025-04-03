import React from 'react'
import { useState } from 'react'
import './AddEvent.css'
// import '../common.css'

const AddEvent = () => {
  const [participationType, setParticipationType] = useState("solo");
  return (
    <div className='common-blurbg , add-event-page'>
      <div className="event-details">

        <div className="common-inner-blur , basic-event-details">
        <label htmlFor="">Event Details</label>
          <input type="text" name="eName" id="eName" placeholder='Name' />
          <textarea name="eDestription" id="eDescripton" placeholder='Description'></textarea>
          <select name="eType">
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
          <select name="eCategory">
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
            <input type="file" name="ePoster" id="ePoster" accept='image/*' />
          </div>

        </div>
        <div className="common-inner-blur , event-schedule-info">
        <label htmlFor="">Schedule Details</label>
          <div className="date-time">
          <label htmlFor=""> Date and Time: </label>
          <div className="date-time-inner">

           <input type="date" name="eDate" id="eDate" />
            <input type="time" name="eTime" id="eTime" />
          </div>
          </div>
          <div>

          <label htmlFor="">Deadline</label>
          <input type="date" name="eDeadLine" id="eDateLine"/>
          </div>
          <input type="text" name="eVenue" id="eVenue" placeholder='Venue' />
          <input type="url" name="eMapLink" id="eMapLink" placeholder='Map Link' />
        </div>
      </div>

      <div className="participation-criteria">
        <div className="common-inner-blur ,  participation-criteria-left">
        <label htmlFor="">Registration and Participation</label>
          <textarea name="eCriteria" id="eCriteria" placeholder='Eligibility Criteria'></textarea>
          <select name="tType" id="tType" value={participationType} onChange={() => setParticipationType(e.target.value)}>
            <option value="Solo">Solo</option>
            <option value="Team">Team</option>
          </select>
          {participationType === "Team" &&
            <input type="number" name="tSize" id="tSize" placeholder='TeamSize' />
          }
          <input type="number" name="eFees" id="eFees" placeholder='Registration Fees' />
          <div>
            <label htmlFor="">Id Card:  </label> <br />
            <label htmlFor="">Yes </label>< input type="radio" name="card" id="card" defaultChecked value="Necessary" />
            <label htmlFor="">  No </label><input type="radio" name="card" id="card" value="Not Necessary" />
          </div>
          <input type="number" name="eLimit" id="eLimit" placeholder='Seat Limit' />
        </div>
        <div className="common-inner-blur , participation-criteria-right">
        <label htmlFor="">Organizer Details</label>
          <input type="text" name="eDeptName" id="eDeptName" placeholder='Department Name' />
          <input type="text" name="eCoordinator" id="eCoordinator" placeholder='Coordinator' />
          <input type="text" name="eContact" id="eContact" placeholder='Phone Number / Email' />

        </div>
      </div>
      <div className="extra-details">
      <label htmlFor="">Additional Details</label>
        <textarea name="" id="" placeholder='Additional Details'></textarea>
      </div>
      <div className="add-button">
        <button>Add</button>
      </div>
    </div>
  )
}

export default AddEvent
