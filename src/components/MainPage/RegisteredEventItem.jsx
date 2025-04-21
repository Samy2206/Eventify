import React, { cache, useEffect, useState } from 'react'
import './RegisteredEventItem.css'
import { useNavigate } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import QRCode from "qrcode";

const RegisteredEventItem = ({ request }) => {
    const [college, setCollege] = useState('')
    const [event, setEvent] = useState('')
    const [student, setStudent] = useState('')
    const [payment, setPayment] = useState('')
    const [paymentStatus, setPaymentStatus] = useState(false)
    const Navigate = useNavigate()


    useEffect(() => {
        getDetails()
        console.log('Payment status', request.payment)
    }, [paymentStatus])

    const getDetails = async () => {
        try {

            //* Getting College Data
            const collegeRes = await fetch(`http://localhost:5000/user/college/details/${request.collegeUid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const collegeData = await collegeRes.json()

            if (!collegeRes.ok)
                return console.log("Error fetching college data: ", collegeData.error)

            //* Getting Event Data
            const eventRes = await fetch(`http://localhost:5000/event/loadevent/${request.eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const eventData = await eventRes.json()

            if (!eventRes.ok)
                return console.log('Error fetching event data: ', eventData.message)



            //* Getting Student Data
            const studentRes = await fetch(`http://localhost:5000/user/student/getDetails/${request.studentUid}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const studentData = await studentRes.json()
            if (!studentRes.ok)
                return console.log("Error Getting Student Data: ", studentData.message)


            //* Getting Payment Data
            const paymentRes = await fetch(`http://localhost:5000/pay/getDetails/${request.paymentId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setCollege(collegeData)
            setEvent(eventData.event)
            setStudent(studentData.student)

            const paymentData = await paymentRes.json()
            if (!paymentRes.ok)
                return res.status('Error Getting Payment Details, Cannot Generate Payment Receipt', paymentData.message)

            setPayment(paymentData.payment)


        } catch (e) {
            return console.log("Error fetching details: ", e)
        }
    }

    const handlePayClick = async () => {
        const amount = event.registrationFees
        const currency = 'INR'
        const receipt = request._id

        console.log(amount, "--", currency, "--", receipt)

        const responseOrder = await fetch('http://localhost:5000/pay/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount * 100,
                currency: currency,
                receipt: receipt
            })
        })

        const data = await responseOrder.json()
        const order = data.order

        if (!responseOrder.ok)
            return console.log('Error creating order:', data.message)

        console.log('Order Creation Successful: ', order)


        //!Invoking Payment
        var options = {
            "key": "rzp_test_lnxseCLLmZBsFf", // Enter the Key ID generated from the Dashboard
            "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": 'Eventify',
            "description": event.eventName,
            "image": '',
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "prefill": {
                "name": student.name,
                "email": student.email,
                "contact": student.mobileNo,
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            },
            handler: async function (response) {
                // ✅ Send this response to your backend for verification

                const verifyRes = await fetch('http://localhost:5000/pay/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        order_id: order.id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        receipt: receipt,
                    }),
                });

                const verifyData = await verifyRes.json();
                if (verifyData.success) {
                    const status = await fetch(`http://localhost:5000/register/updatepaymentstatus/${request._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    const data = await status.json()
                    if (!status.ok)
                        return console.log("Error updating payment status", data.message)
                    console.log(data)

                    await addPayment(order, response)

                    setPaymentStatus(true)
                } else {
                    alert('Payment verification failed!');
                }

            },
        };


        const rzp = new window.Razorpay(options);
        await rzp.open();

    }



    const generateReceipt = () => {
        const doc = new jsPDF();

        // Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.text('Event Registration Receipt', 20, 20);

        // Divider
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.line(20, 25, 190, 25);

        // Body Content
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        let y = 40;
        const gap = 10;

        doc.text(`Name: ${student.name}`, 20, y);
        doc.text(`Email: ${student.email}`, 20, y += gap);

        const dateObj = new Date(payment.createdAt);
        const formattedDate = dateObj.toLocaleDateString(); // e.g. 4/19/2025
        const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // e.g. 10:10 PM

        doc.text(`Date: ${formattedDate}`, 20, y += gap);
        doc.text(`Time: ${formattedTime}`, 20, y += gap);

        doc.text(`Event: ${event.eventName}`, 20, y += gap);
        doc.text(`Request ID: ${payment.requestId || 'N/A'}`, 20, y += gap);
        doc.text(`Payment ID: ${payment.paymentId}`, 20, y += gap);
        doc.text(`Order ID: ${payment.orderId}`, 20, y += gap);

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Thank you for registering! Please keep this receipt for future reference.', 20, y + 2 * gap);

        // Save PDF
        doc.save(`${student.name}_receipt.pdf`);
    };





    const generateIdCard = async () => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: [105, 74], // A7 size
        });

        const centerX = 76 / 2;


        doc.setFillColor(0, 0, 0); // black
        doc.rect(0, 0, 76, 105, "F");    // Full page
        // Step 1: White base
        doc.setFillColor(255, 255, 255); // White
        doc.rect(3, 3, 67, 96, "F");    // Full page

        // Step 2: Inner black rectangle (leaving 5mm border)
        doc.setFillColor(0, 0, 0);       // Black
        doc.rect(4, 4, 65, 94, "F");     // 5mm inset on all sides



        // Set white text
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text(event.eventName.toUpperCase(), centerX, 12, { align: "center" });

        // Profile Picture
        const imgSize = 25;
        const imgX = centerX - imgSize / 2;
        const imgY = 16;

        // Fetch the profile image
        try {
            const response = await fetch(`http://localhost:5000/user/student/getprofilepicture/${student.uid}`);
            if (!response.ok) throw new Error("Failed to fetch profile picture");

            const imgBlob = await response.blob();
            const imgDataUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(imgBlob);
            });

            const mimeType = imgBlob.type.split("/")[1].toUpperCase(); // e.g. "JPEG" or "PNG"
            doc.addImage(imgDataUrl, mimeType, imgX, imgY, imgSize, imgSize);
        } catch (err) {
            console.error(err.message);
        }

        // Event Details
        const yStart = imgY + imgSize + 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Name: ${student.name}`, centerX, yStart, { align: "center" });
        doc.text(`Date: ${event.date}`, centerX, yStart+5, { align: "center" });
        doc.text(`Time: ${event.time}`, centerX, yStart + 10, { align: "center" });
        doc.text(`Venue: ${event.venue}`, centerX, yStart + 15, { align: "center" });

        // Generate white-on-transparent QR Code
        try {
            const qrDataUrl = await QRCode.toDataURL(request._id, {
                color: {
                    dark: "#FFFFFF",      // White QR modules
                    light: "#00000000",   // Transparent background
                },
            });

            const qrSize = 24;
            const qrY = yStart + 18;

            // Always add the QR code
            doc.addImage(qrDataUrl, "PNG", centerX - qrSize / 2, qrY, qrSize, qrSize);
            console.log("QR Code added at Y:", qrY);
        } catch (err) {
            console.error("Failed to generate QR Code:", err.message);
        }

        // Save the final PDF
        doc.save(`${student.name}_ID_Card.pdf`);
    };




    const addPayment = async (orderResponse, paymentResponse) => {
        try {
            const payment = await fetch(`http://localhost:5000/pay/addPayment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    paymentId: paymentResponse.razorpay_payment_id,
                    amount: Number(orderResponse.amount) / 100,
                    orderId: orderResponse.id,
                    eventId: request.eventId,
                    requestId: request._id

                })
            })

            const data = await payment.json()

            if (!payment.ok)
                return console.log('Error Adding payment: ', data.message)

            console.log("Payment Added Successfully", data.payment)
        }
        catch (e) {
            return console.log("Error adding payment details: ", e)
        }
    }


    return (
        <div className='reg-event-item common-inner-blur'>
            <div className="event-details">
                <div>

                    <img src={event.poster} alt="Event Poster" />
                </div>
                <div className="details-event">
                    <h3>{event.eventName}</h3>
                    <h4>College: {college.name}</h4>
                    <h4>Date: {event.date}</h4>
                    <h4>Deadline: {event.deadline}</h4>
                    <button onClick={() => Navigate('/EventPage/ViewEvent', { state: { eventId: request.eventId, collegeName: college.name } })}>View Event</button>
                </div>
            </div>
            <hr />
            <div className={request.request === "pending" ? ('approval blur-pending') : request.request === 'approved' ? ('approval blur-approved') : ('approval blur-rejected')}>
                <h4>Remaining Seats: {event.seatLimit}</h4>
                <h4>Status: {request.request}</h4>

                {request.payment || paymentStatus ? <>
                    <button onClick={generateReceipt}>Receipt</button>
                    <button onClick={generateIdCard}>ID Card</button>
                </> :

                    (request.request === 'approved' && <>
                        <button onClick={handlePayClick}><h3>Pay</h3></button>
                    </>)}
            </div>
        </div>
    )
}

export default RegisteredEventItem  
