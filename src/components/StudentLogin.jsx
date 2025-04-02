import React from 'react'
import './StudentLogin.css'
import { useState } from 'react'
import { auth } from '../../firebase.jsx'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../../firebase.jsx'
import { useNavigate } from 'react-router-dom'


const StudentLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const Navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const token = await userCredentials.user.getIdToken()

      const response = await fetch("http://localhost:5000/user/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (response.ok) {
        console.log("Login Successful: ", data)
        Navigate('/EventPage')
      }
      

    }
    catch (e) {
      console.error("Login Error:",e.message)
    }
  }
  const handleRegister = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password,)
      const token = await userCredentials.user.getIdToken()
      const uid = userCredentials.user.uid

      const response = await fetch('http://localhost:5000/user/student/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid, email, name }),
      })

      if (!response.ok) {
        const errText = await response.text()
        throw new Error(errText)
      }

      if (response.ok) {
        Navigate('/EventPage')
      }
      const data = await response.json()
      console.log("Registration Successful: ", data)
    }
    catch (e) {
      console.error("Registration Error: ", e)
    }
  }
  return (
    <>
      <div className="login-page">
        <h3 className='Eventify-logo'>Student</h3>
        <div className="login-page-inner">


          <div className="login-container">
            <h2>Login</h2>
            <input type="email" name="email" id="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" name='password' id='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={handleLogin}>Login</button>
          </div>
          <div className="gap"></div>
          <div className="register-container">
            <h2>Registration</h2>
            <input type="text" name="name" id="name" placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
            <input type="email" name="email" id="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" name="password" id="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={handleRegister}>Register</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentLogin
