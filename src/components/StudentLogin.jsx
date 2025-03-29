import React from 'react'
import './StudentLogin.css'

const StudentLogin = () => {

    const handleLogin = ()=>{

    }
    const handleRegister = ()=>{
      
    }
  return (
    <>
      <div className="login-page">
      <h3 className='Eventify-logo'>Student</h3>
      <div className="login-page-inner">
      
      
        <div className="login-container">
            <h2>Login</h2>
            <input type="email" name="email" id="email" placeholder='Email'/>
            <input type="password" name='password' id='password' placeholder='Password'/>
            <button onClick={handleLogin}>Login</button>
        </div>
        <div className="gap"></div>
        <div className="register-container">
        <h2>Registration</h2>
        <input type="text" name="name" id="name" placeholder='Name'/>
        <input type="email" name="email" id="email" placeholder='email' />
        <input type="password" name="password" id="password" placeholder='password' />
        <button onClick={handleRegister}>Register</button>
      </div>
      </div>
      </div>
    </>
  )
}

export default StudentLogin
