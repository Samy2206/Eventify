import React from 'react'
import './RegisteredList.css'
import '../common.css'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisteredEventItem from './RegisteredEventItem'

const RegisteredList = () => {
    const [requests,setRequests] = useState([])

    useEffect(()=>{
        loadRequests()
    },[])

    useEffect(()=>{
        console.log(requests)
    },[requests])

    const loadRequests = async()=>{
        try{
            const response = await fetch(`http://localhost:5000/register/student/requests/${localStorage.getItem('studentUid')}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })

            const data = await response.json()
            const requests = data.requests
            setRequests(requests)


            if(!response.ok)
                return console.log("Error fetching requests: ",data.message)

        }catch(e)
        {
            return console.log("Error fetching requests: ",e)
        }
    }

  return (
    <div className='registered-list common-blurbg'>
    <div className="inner">

        {requests && requests.map((request)=>(
                <RegisteredEventItem key={request._id} request={request}/>
            ))}
    </div>  
    </div>
  )
}

export default RegisteredList
