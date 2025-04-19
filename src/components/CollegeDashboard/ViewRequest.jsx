import React from 'react'
import './ViewRequest.css'
import '../common.css'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const ViewRequest = () => {
    const Navigate = useNavigate()
    const location = useLocation()
    const { request, student } = location.state

    useEffect(() => {
        console.log(location.state)
    }, [])

    const handleOpenInNewTab = (url) => {
        const newWindow = window.open(url, '_blank')
        if (newWindow) newWindow.focus()
    }

    const handleApproveClick = async () => {
        try {
            const response = await fetch(`http://localhost:5000/register/approve/${request._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()
            if (!response.ok) return console.log('Error Approving Request:', data.message)

            console.log('Request Approved: ', data.request)
            Navigate('/CollegeDashboard/VerifyStudentList', {
                state: { eventId: request.eventId },
                replace: true,
            })
        } catch (e) {
            console.log('Error Approving Request: ', e)
        }
    }

    const handleRejectClick = async () => {
        try {
            const response = await fetch(`http://localhost:5000/register/reject/${request._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()
            if (!response.ok) return console.log('Error Rejecting Request:', data.message)

            console.log('Request Rejected: ', data.request)
            Navigate('/CollegeDashboard/VerifyStudentList', {
                state: { eventId: request.eventId },
                replace: true,
            })
        } catch (e) {
            console.log('Error Rejecting Request: ', e)
        }
    }

    return (
        <div className='view-request common-blurbg'>
            <div className="inner common-inner-blur">
                <div className="student-details common-inner-blur">
                    <img src={request.profilePicture} alt="Profile" />
                    <div className="inner-details">
                        <div><h3>Name:</h3> {student.name}</div>
                        <div><h3>College:</h3> {student.collegeName}</div>
                        <div><h3>Contact:</h3> {student.mobileNo}</div>
                        <div><h3>Email:</h3> {student.email}</div>
                    </div>
                </div>

                <div className="document">
                    {request.recommendationLetter &&
                        <div className='common-inner-blur'>
                            <h3>Recommendation Letter</h3>
                            {
                                request.recommendationLetter.includes('.pdf') ? (
                                    <embed
                                        src={request.recommendationLetter}
                                        type="application/pdf"
                                        style={{ cursor: 'pointer', maxHeight: '400px' }}
                                    />
                                ) : (
                                    <img
                                        src={request.recommendationLetter}
                                        alt="Recommendation Letter"
                                        style={{ cursor: 'pointer', maxHeight: '400px' }}
                                    />
                                )
                            }
                            <br />
                            <button onClick={() => handleOpenInNewTab(request.recommendationLetter)}>Open</button>
                        </div>
                    }

                    {request.idCard &&
                        <div className='common-inner-blur'>
                            <h3>ID Card:</h3>
                                    <embed
                                        src={request.idCard}
                                        type="application/pdf"
                                        style={{ cursor: 'pointer', maxHeight: '400px' }}
                                    />
                                
                            <br />
                            <button onClick={() => handleOpenInNewTab(request.idCard)}>Open</button>
                        </div>
                    }
                </div>
            </div>

            <div className="button">
                {
                    request.request === 'pending' ? (
                        <>
                            <button onClick={handleApproveClick} className='common-button-style'>Approve</button>
                            <button onClick={handleRejectClick} className='common-button-style'>Reject</button>
                        </>
                    ) : request.request === 'approved' ? (
                        !request.payment && 
                        <button onClick={handleRejectClick} className='common-button-style'>Reject</button>
                    ) : (
                        <button onClick={handleApproveClick} className='common-button-style'>Approve</button>
                    )
                }
            </div>
        </div>
    )
}

export default ViewRequest
