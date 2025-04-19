import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect,useState } from 'react'
import './VerifyStudentList.css'

import RequestList from './RequestList'

const VerifyStudentList = () => {
    const location = useLocation()
    const {eventId} = location.state
    const[requests,setRequests]=useState([])

    useEffect(()=>{

        loadRequests()
        console.log(requests)
      
    },[])

    const [searchQuery, setSearchQuery] = useState('')

    // Filtered requests based on search query
    const filteredRequests = requests.filter(request =>
        request.studentUid.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.collegeUid.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const loadRequests=async()=>{
        try{
        const response = await fetch(`http://localhost:5000/register/getrequests/${eventId}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })

        const data = await response.json()
        if(!response.ok)
            return console.log("Error fetching data:",data.message)
        setRequests(data.requests)


    }
    catch(e)
    {
        console.log("Error fetching requests: ",e)
    }
    }
  return (
    <div className='verify-student-list common-blurbg'>
        <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by student ID  or college ID"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
        </div>
    {requests && 
    filteredRequests.map((request)=>(
        <RequestList key={request._id} request={request}/>
    ))
    }
    </div>
  )
}

export default VerifyStudentList
