import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './NavBar.css'
const NavBar = ({ user }) => {
    const Navigate = useNavigate()
    const handleLogin = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue)
            if (e.target.value === '/CollegeLogin')
                localStorage.setItem('userType', "college")
            else
                localStorage.setItem('userType', "student")
        console.log(localStorage.getItem('userType'))
        Navigate(selectedValue)
    }

    const handleMenuOption = async ()=>{
        localStorage.clear()
        Navigate('/')
    }


    return (
        <>
            {user === "User" &&
                <div className="NavBar_Container">
                    <NavLink to="/"><h3 className='logo'>Eventify</h3></NavLink>
                    <ul>
                        <NavLink to={'/About'}><li>About</li></NavLink>
                        <select name="loginSelect" id="loginSelect" onChange={handleLogin} className='login-select'>
                            <option disabled selected>Login</option>
                            <option value="/StudentLogin">Student</option>
                            <option value="/CollegeLogin">College</option>
                        </select>
                    </ul>
                </div>
            }
            {user === "College" &&
                <div className='NavBar_Container'>
                    <NavLink to="/"><h3 className='logo'>Eventify</h3></NavLink>
                    <ul>
                        <NavLink to={'/'}><li>Schedule Event</li></NavLink>
                        <NavLink to={'/About'}><li>Verify Students</li></NavLink>
                        <select name="optionSelect" id="optionSelect" onChange={handleMenuOption} className='login-select' >
                            <option disabled selected>Options</option>
                            <option value="/">Profile</option>
                            <option value="logout">Logout</option>
                        </select>
                    </ul>
                </div>
            }
            {user === "Student" &&
                <div className='NavBar_Container'>
                    <NavLink to="/"><h3 className='logo'>Eventify</h3></NavLink>
                    <ul>
                        <NavLink to={'/EventPage'}><li>Events</li></NavLink>
                        <NavLink to={'/About'}><li>Registered Events</li></NavLink>
                        <select name="optionSelect" id="optionSelect" onChange={handleMenuOption} className='login-select' >
                            <option disabled selected>Options</option>
                            <option value="/">Profile</option>
                            <option value="logout">Logout</option>
                        </select>
                    </ul>
                </div>
            }
        </>
    )
}

export default NavBar
