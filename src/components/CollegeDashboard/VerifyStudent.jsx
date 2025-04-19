import React from 'react'
import './VerifyStudent.css'
import '../common.css'
import EventList from './EventList'
import { useEffect ,useState} from 'react'


const VerifyStudent = () => {
    const collegeUid = localStorage.getItem('collegeUid')
    const[events,setEvents] = useState([])
    const [searchQuery, setSearchQuery] = useState('') // State to store search query
    useEffect(()=>{
        loadEvents()
       console.log(events)
    },[])

    const filteredEvents = events.filter((event) => {
        return event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) || // Match by event name
               event.description.toLowerCase().includes(searchQuery.toLowerCase()) // Match by event description
    })

    const loadEvents = async () => {
        try {
            const response = await fetch(`http://localhost:5000/event/list/${collegeUid}`, {
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

    <div className='event-list-verify common-blurbg'>
    <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                    className="search-bar"
                />
            </div>
    {filteredEvents.map((event) => (
                    <EventList key={event.id} event={event}/>
                ))}
    </div>

  )
}

export default VerifyStudent
