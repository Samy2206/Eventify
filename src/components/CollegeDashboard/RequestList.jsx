import React from 'react'
import './EventList.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RequestList = ({ request }) => {
  const Navigate = useNavigate()
  const [name, setName] = useState('')
  const [collegeName, setCollegeName] = useState('')
  const [student,setStudent] = useState(null)

  useEffect(() => {
    console.log(request)
    getStudentDetails()
  }, [])

  const getStudentDetails = async () => {
    const response = await fetch(`http://localhost:5000/user/student/getDetails/${request.studentUid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    const student = data.student
    setStudent(student)
    setName(student.name)
    setCollegeName(student.collegeName)
  }

  const handleViewClick=()=>{
      Navigate('/CollegeDashboard/ViewRequest' ,{state:{request:request,student:student}})
  }

  return (
    <div className={request.request==="pending" ?('event-list blur-pending'):request.request==='approved'?('event-list blur-approved'):('event-list blur-rejected')}>
      { <>
        <h3>Student Name:{name}</h3>
        <h3>College Name:{collegeName}</h3>
        <h3>Status:{request.request}</h3>
        <h3>{request.request==='approved' && (request.payment === true ? 'Payment : Done' : 'Payment : Pending')}</h3>
        {student && 
        <button onClick={handleViewClick}>View</button>
        }
      </>
      }
    </div>
  )
}

export default RequestList
