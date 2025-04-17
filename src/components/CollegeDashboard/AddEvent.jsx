import React from 'react'
import { useState } from 'react'
import './AddEvent.css'
import { useNavigate } from 'react-router-dom'
// import '../common.css'

const AddEvent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [participationType, setParticipationType] = useState("solo");
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    description: '',
    eventType: '',
    category: '',
    poster: null,
    date: '',
    time: '',
    deadline: '',
    venue: '',
    mapLink: '',
    criteria: '',
    teamType: '',
    teamSize: 1,
    registrationFees: '',
    idCardRequired: 'Necessary',
    seatLimit: '',
    departmentName: '',
    coordinator: '',
    contact: '',
    additionalDetails: '',
    collegeUid :localStorage.getItem('collegeUid')
  })
  const Navigate = useNavigate()


  const handleAddEventClick = async () => {

    const requiredFields = [
      'eventName', 'description', 'eventType', 'category', 'poster', 'date', 'time',
      'deadline', 'venue', 'mapLink', 'criteria', 'teamType', 'registrationFees',
      'idCardRequired', 'seatLimit', 'departmentName', 'coordinator', 'contact', 'additionalDetails'
  ];

  // Check if any required field is empty
  for (let field of requiredFields) {
      if (!eventDetails[field] || eventDetails[field] === '') {
          alert(`Please fill the ${field}`);
          return;  // Stop the function if any required field is missing
      }
  }

    console.log(eventDetails);
    
    try {
      setIsSubmitting(true)
      const response = await fetch('http://localhost:5000/event/addevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Specify that you're sending JSON
        },
        body: JSON.stringify(eventDetails), // Send the event details as a JSON payload
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        Navigate('/CollegeDashBoard');
      } else {
        console.error(data);
      }
      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
      console.error("Fetch failed:", error);
    }
  };
  


const handleChange = (e) => {
  const { name, type, files ,value} = e.target;
  if (type === 'file') {
    // Convert the file to base64
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // Store the base64 string in the eventDetails state
      setEventDetails((prev) => ({
        ...prev,
        [name]: reader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), // This is the base64 string
      }));
      console.log(reader.result); // This will log the Base64 string
    };
    reader.readAsDataURL(file); // This will trigger the base64 conversion
  } else if (name === 'date' || name === 'deadline') {
    // Only take the date part
    const formattedDate = new Date(value).toISOString().split('T')[0];
    setEventDetails((prev) => ({
      ...prev,
      [name]: formattedDate,
    }));
  } else {
    setEventDetails((prev) => ({
      ...prev,
      [name]: e.target.value, // Handle other input types
    }));
  }
};


  return (
    <div className='common-blurbg , add-event-page'>
      <div className="event-details">

        <div className="common-inner-blur , basic-event-details">
          <label htmlFor="">Event Details</label>
          <input type="text" name="eventName" id="eventName" placeholder='Name' value={eventDetails.eventName} onChange={handleChange} />
          <textarea name="description" id="description" placeholder='Description' value={eventDetails.description} onChange={handleChange}></textarea>

          <select name="eventType" value={eventDetails.eventType} onChange={handleChange}>
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
          <select name="category" value={eventDetails.category} onChange={handleChange}>
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
            <label htmlFor="poster">Event Poster</label>
            <input
              type="file"
              name="poster"
              id="poster"
              accept="image/*"
              onChange={handleChange}
            />

          </div>

        </div>
        <div className="common-inner-blur , event-schedule-info">
          <label htmlFor="">Schedule Details</label>
          <div className="date-time">
            <label htmlFor=""> Date and Time: </label>
            <div className="date-time-inner">

              <input type="date" name="date" id="date" value={eventDetails.date} onChange={handleChange} />
              <input type="time" name="time" id="time" value={eventDetails.time} onChange={handleChange} />
            </div>
          </div>
          <div>

            <label htmlFor="">Deadline</label>
            <input type="date" name="deadline" id="dateLine" value={eventDetails.deadline} onChange={handleChange} />
          </div>
          <input type="text" name="venue" id="venue" placeholder='Venue' value={eventDetails.venue} onChange={handleChange} />
          <input type="url" name="mapLink" id="mapLink" placeholder='Enter only embeddable map link' value={eventDetails.mapLink} onChange={handleChange} />
        </div>
      </div>

      <div className="participation-criteria">
        <div className="common-inner-blur ,  participation-criteria-left">
          <label htmlFor="">Registration and Participation</label>
          <textarea name="criteria" id="criteria" placeholder='Eligibility Criteria' /*value={eventDetails.criteria}*/ onChange={handleChange}></textarea>
          <select name="teamType" id="teamType" value={eventDetails.teamType} onChange={handleChange}>
          <option value="">Select Team Type</option>
            <option value="Solo">Solo</option>
            <option value="Team">Team</option>
          </select>
          {eventDetails.teamType === "Team" &&
            <input type="number" name="teamSize" id="teamSize" placeholder='TeamSize' value={eventDetails.teamSize} onChange={handleChange} />
          }
          <input type="number" name="registrationFees" id="registrationFees" placeholder='Registration Fees' value={eventDetails.registrationFees} onChange={handleChange} />
          <div>
            <label htmlFor="">Id Card Required: </label> <br />
            <label htmlFor="">Yes </label>
            <input
              type="radio"
              name="idCardRequired"
              id="idCardRequired"
              value="Necessary"
              checked={eventDetails.idCardRequired === 'Necessary'}
              onChange={handleChange}
            />
            <label htmlFor=""> No </label>
            <input
              type="radio"
              name="idCardRequired"
              id="idCardRequired"
              value="Not Necessary"
              checked={eventDetails.idCardRequired === 'Not Necessary'}
              onChange={handleChange}
            />
          </div>

          <input type="number" name="seatLimit" id="seatLimit" placeholder='Seat Limit' value={eventDetails.seatLimit} onChange={handleChange} />
        </div>
        <div className="common-inner-blur , participation-criteria-right">
          <label htmlFor="">Organizer Details</label>
          <input type="text" name="departmentName" id="departmentName" placeholder='Department Name' value={eventDetails.departmentName} onChange={handleChange} />
          <input type="text" name="coordinator" id="coordinator" placeholder='Coordinator' value={eventDetails.coordinator} onChange={handleChange} />
          <input type="text" name="contact" id="contact" placeholder='Phone Number / Email' value={eventDetails.contact} onChange={handleChange} />

        </div>
      </div>
      <div className="extra-details">
        <label htmlFor="">Additional Details</label>
        <textarea name="additionalDetails" id="additionalDetails" placeholder='Additional Details' value={eventDetails.additionalDetails} onChange={handleChange}></textarea>
      </div>
      <div className="add-button">
  <button onClick={handleAddEventClick} disabled={isSubmitting}>
    {isSubmitting ? "Adding..." : "Add"}
  </button>
</div>

    </div>
  )
}

export default AddEvent
