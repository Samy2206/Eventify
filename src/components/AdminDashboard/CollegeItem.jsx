import React, { useState } from 'react'
import '../common.css'
import './CollegeItem.css'

const CollegeItem = ({ college }) => {
    const [verified,setVerified] = useState(college.verified) 

    const handleVerify= async() =>
    {
        const response = await fetch(`http://localhost:5000/user/college/changestatus/${college.uid}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await response.json()
        console.log(data.college.verified)
        if(response.ok)
            setVerified(data.college.verified)
    }

    return (
        <div className='common-inner-blur college-item'>

            <div className="name-email">
                <div>
                    <h2>College Details:</h2><br />
                    <h4>Name: {college.name}</h4>
                    <h4>Code: {college.collegeCode}</h4>
                    <h4> Email: {college.email}</h4>
                    <h4><a href={college.website}>Website: {college.website}</a></h4>
                    <a href={college.website}></a>
                </div>
         
                <div>
                    <img src={college.collegeLogo} alt="" />
                </div>
            </div>
            <hr />
            <div className="admin-details">
                <div>
                    
                <h2>Admin Details: </h2><br />
                <h4>Name: {college.adminName}</h4>
                <h4>Email: {college.adminEmail}</h4>
                <h4>Contact: {college.adminContact}</h4>
                </div>
              
                <div>
                    <h2>Affiliation Details</h2><br />
                    <h4>Affitiation: {college.affiliation}</h4>
                    <h4>Accredation: {college.accreditation}</h4>
                </div>
            </div>
            <hr />
            <div className='address'>
                <div>

                <h2>Address:</h2>
                <br />
                <h4>{college.address}</h4>
                <h4>State: {college.state}</h4>
                <h4>District: {college.district}</h4>
                <h4>Pincode: {college.pincode}</h4>
                </div>
            </div>
            <hr />
            <div className="button">
                <button onClick={handleVerify}>{verified ? 'Unvalidate' : 'Validate'}</button>
            </div>
        </div>
    )
}

export default CollegeItem
