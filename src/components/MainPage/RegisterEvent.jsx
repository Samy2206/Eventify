import React, { useState } from 'react'
import './RegisterEvent.css'
import '../common.css'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const RegisterEvent = () => {
    const Navigate = useNavigate()
    const location = useLocation()
    const {event} = location.state
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[collegeName,setCollegeName] = useState('')
    const[recommendation,setRecommendation] = useState('No')
    const[recommendationLetter,setRecommendationLetter] = useState('')
    const[idCard,setIdCard] = useState('')
    const[profilePicture,setProfilePicture] = useState('')
    const[mobileNo,setMobileNo] = useState('')


    useEffect(()=>{
        getStudentDetails()
    },[event])

    const getStudentDetails=async()=>{
        const response = await fetch(`http://localhost:5000/user/student/getDetails/${localStorage.getItem('studentUid')}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await response.json()
        const student = data.student
        setEmail(student.email)
        setName(student.name)

    }

    const updateStudent=async()=>{
        try{
            const response = await fetch(`http://localhost:5000/user/student/update/${localStorage.getItem('studentUid')}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:name,
                    collegeName:collegeName,
                    idCard:idCard,
                    profilePicture:profilePicture,
                    mobileNo:mobileNo,
                })

            })

            const data = await response.json()
            if(!response.ok)
                return console.log("Error while updating Student:",data.message)

            console.log("Student Updated Successfully:",data.student)
        }catch(e)
        {

        }
    }

    const handleSendRequest=async()=>{
        try{
            

         const response = await fetch('http://localhost:5000/register/sendrequest',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                studentUid:localStorage.getItem('studentUid'),
                collegeUid:event.collegeUid,
                eventId:event._id,
                recommendationLetter:recommendationLetter,
                profilePicture:profilePicture,
                idCard:idCard,
                mobileNo:mobileNo,
            })
         })

         const data = await response.json()

         if(!response.ok)
            return console.log("Error while sending request:",data.message)


         console.log("Succesfully request send: ",data.request)
         Navigate('/EventPage')

        await updateStudent()
        }
        catch(e)
        {
            console.log("Error while fetching data:"+e.message)
        }
    }

    const handleChange = (e) => {
        const { type, files, name } = e.target;
        
        if (type === 'file') {
            const file = files[0];
            const reader = new FileReader();
    
            reader.onloadend = () => {
                if (name === 'recommendationLetter') {
                    // Check if the file is a PDF or an image
                    if (file.type === 'application/pdf') {
                        // Handle PDF files
                        setRecommendationLetter(reader.result); // Base64 PDF string
                        console.log(reader.result); // Logs the Base64 string for the PDF
                    } else {
                        // Handle image files (PNG, JPEG, JPG)
                        setRecommendationLetter(reader.result);
                        console.log(reader.result); // Logs the Base64 string for image files
                    }
                } else if (name === 'idCard') {
                    setIdCard(reader.result); // Store the base64 string for the ID Card
                } else if (name === 'profilePicture') {
                    setProfilePicture(reader.result); // Store the base64 string for the profile picture
                }
            };
    
            reader.readAsDataURL(file); // This will trigger the base64 conversion
        }
    };
    
    

  return (
    <div className="register-event common-blurbg">
        <div className="wrapper common-inner-blur">
                <h2>Registration Details</h2>
                <input type="text" name="name" id="name" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="text" name="email" id="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} disabled/>
                <input type="text" name="collegeName" id="collegeName" placeholder='College Name'value={collegeName} onChange={(e)=>setCollegeName(e.target.value)}/>
                <input type="text" name="mobileNo" id="mobileNo"  value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)} placeholder='Mobile No'/>
                <div>
                <h4>Recommendation:</h4>
                <select name="recommendation" id="recommendation" value={recommendation} onChange={(e)=>setRecommendation(e.target.value)}>
                    {/* <option value="Select">Select</option> */}
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                {recommendation === 'Yes' &&<>
                <input style={{marginTop:'10px'}} type="file" name="recommendationLetter" id="" accept='image/*,.pdf' onChange={handleChange}/>
                </>
                }
                </div>
                <div>
                  <h4>ID Card:</h4>  
                  <input type="file" name="idCard" id="idCard" accept='image/*' onChange={handleChange}/>
                </div>
                <div>
                    <h4>Profile Picture:</h4>
                    <input type="file" name="profilePicture" id="profilePicture" accept='image/*'onChange={handleChange} />
                </div>

                <div style={{display:'flex',justifyContent:'center'}}>
                    <button onClick={handleSendRequest} className='common-button-style'>Send Request</button>
                </div>

        </div>
    </div>
  )
}

export default RegisterEvent
