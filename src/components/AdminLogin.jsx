import React from 'react'
import './StudentLogin.css'
import { useState } from 'react'
import { auth } from '../../firebase.jsx'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../../firebase.jsx'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const Navigate = useNavigate()
  
    const handleLogin = async () => {
      try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        const token = await userCredentials.user.getIdToken()
  
        const response = await fetch("http://localhost:5000/user/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
  
        const data = await response.json()
        if (response.ok) {
          console.log("Login Successful: ", data)
          localStorage.setItem('userType',"admin")
          localStorage.setItem('adminUid',data.uid)
          Navigate('/AdminDashboard')
        }
        
  
      }
      catch (e) {
        console.error("Login Error:",e.message)
      }
    }
    return (
      <>
        <div className="login-page">
          <h3 className='Eventify-logo'>Admin</h3>
          <div className="login-page-inner">
  
  
            <div className="login-container">
              <h2>Login</h2>
              <input type="email" name="email" id="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
              <input type="password" name='password' id='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
              <button onClick={handleLogin}>Login</button>
            </div>
            
          </div>
        </div>
      </>
    )
}

export default AdminLogin
