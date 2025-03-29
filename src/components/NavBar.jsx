import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import './NavBar.css'
const NavBar = () => {
    const Navigate = useNavigate()
    const handleLogin =(e)=>{
        const selectedValue = e.target.value;
        if(selectedValue)
            Navigate(selectedValue)
    }

    return (
        <>
        <div className="NavBar_Container">
            <NavLink to="/"><h3 className='logo'>Eventify</h3></NavLink>
            <ul>
                <NavLink to={'/About'}><li>About</li></NavLink>
                <select name="loginSelect" id="loginSelect" onChange={handleLogin}>
                    <option disabled selected>Login</option>
                    <option value="/StudentLogin">Student</option>
                    <option value="/CollegeLogin">College</option>
                </select>
            </ul>
        </div>
        </>
    )
}

export default NavBar
