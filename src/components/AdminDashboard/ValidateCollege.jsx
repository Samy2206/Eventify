import React, { useEffect, useState } from 'react'
import CollegeItem from './CollegeItem'
import './ValidateCollege.css'

const ValidateCollege = () => {
    const [colleges, setColleges] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        getCollegeList()
    }, [])

    const getCollegeList = async () => {
        try {
            const response = await fetch('http://localhost:5000/user/college/getlist', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (!response.ok)
                return console.log("Error fetching college list:", data.message)
            setColleges(data.college)
        } catch (e) {
            console.log("Error loading college: ", e)
        }
    }

    const filteredColleges = colleges.filter((college) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className='validate-college common-blurbg'>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for college by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
            </div>
            {
                filteredColleges.map((college) => (
                    <CollegeItem key={college._id} college={college} />
                ))
            }
        </div>
    )
}

export default ValidateCollege
