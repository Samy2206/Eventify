const Request = require('../Schema/Request')
const Event = require('../Schema/Event')

const sendRequest = async (req,res)=>{
    try{
        const {studentUid,collegeUid,eventId,recommendationLetter,profilePicture,idCard,mobileNo} = req.body

        const requestDuplicate = await Request.findOne({studentUid:studentUid,eventId:eventId})
        if(requestDuplicate)
            return res.status(409).json({success:false,message:"Request exists for the same event"})

        const request =new Request({studentUid,collegeUid,eventId,recommendationLetter,idCard,profilePicture,mobileNo})
        await request.save()

        return res.status(200).json({success:true,request:request})
    }catch(e)
    {
        console.log("Error sending request:",e.message)
        return res.status(500).json({success:false,message:"Internal server error: ",e})
    }
}

const getRequests=async(req,res)=>{
    try{
        const eventId = req.params.eventId

        const requests = await Request.find({eventId})

        const sortedRequests = [
            ...requests.filter(r => r.request === 'pending').sort((a, b) => b.timestamp - a.timestamp),
            ...requests.filter(r => r.request === 'approved').sort((a, b) => b.timestamp - a.timestamp),
            ...requests.filter(r => r.request === 'rejected').sort((a, b) => b.timestamp - a.timestamp),
          ];
        //   console.log(requests)
        //   console.log(sortedRequests)
        
        if(!requests)
            return res.status(404).json({success:false,message:"Event Not Found: "})

        res.status(200).json({success:true,requests:sortedRequests})

    }catch(e)
    {
        console.log("Error fetching requests",e)
        return res.status(500).json({success:false,message:"Internal Server Error: ",e})
    }
}

const approveRequest = async(req,res)=>{
    try{
        const requestId = req.params.requestId
        
        const request = await Request.findById(requestId)

        if(!request)
            return res.status(404).json({success:false,message:'Request do not exists'})

        const eventId = request.eventId
        // console.log(eventId)
        const event = await Event.findById(eventId)
        try{
        if(request.request==='rejected'){
                await event.updateOne({$inc:{approved:1,rejected:-1,seatLimit:-1}})
                await event.save()
            }
        else{
                await event.updateOne({$inc:{approved:1,seatLimit:-1}})
                await event.save()
        }
        }
        catch(e)
        {
            return res.status(500).json({success:false,message:'Internal Server Error: ',e})
        }


        await request.updateOne({request:'approved'})
        await request.save()

        res.status(200).json({success:true,request:request})

    }   
    catch(e)
    {
        console.log("Error Approving Request:",e)
        return res.status(500).json({success:false,message:'Internal Server Error: ',e})
    }
}

const rejectRequest = async(req,res)=>{
    try{
        const requestId = req.params.requestId
        const request = await Request.findById(requestId)

        if(!request)
            return res.status(404).json({success:false,message:'Request do not exists'})

        const eventId = request.eventId
        console.log(request)
        console.log(eventId)
        const event = await Event.findById(eventId)
        try{
        if(request.request==='approved'){
                await event.updateOne({$inc:{approved:-1,rejected:1,seatLimit:+1}})
                await event.save()
            }
        else{
                await event.updateOne({$inc:{rejected:1}})
                await event.save()
        }
        }
        catch(e)
        {
            console.log("Error Rejection Request:",e)
            return res.status(500).json({success:false,message:'Internal Server Error: ',e})
        }

        await request.updateOne({request:'rejected'})
        await request.save()


        res.status(200).json({success:true,request:request})

    }   
    catch(e)
    {
        console.log("Error Rejection Request:",e)
        return res.status(500).json({success:false,message:'Internal Server Error: ',e})
    }
}

const getStudentRequests = async(req,res)=>{
    try{
        const studentUid = req.params.studentUid
        const requests = await Request.find({studentUid:studentUid}).sort({ createdAt: -1 });

        if(!requests)
            return res.status(404).json({success:false,message:'No request found for student'})
        res.status(200).json({success:true,requests:requests})


    }
    catch(e){
        console.log("Error fetching student request: ",e)
        return res.status(500).json({success:false,message:'Internal server error',e})
    }
}

const updatePaymentStatus = async(req,res)=>{
    try{
        const requestId = req.params.requestId
        const request = await Request.findOneAndUpdate({_id:requestId},{$set:{payment:true}},{new:true})
        if(!request)
            return res.status(404).json({success:false,message:'Request Not Found'})
        const payStatus = request.updatePaymentStatus

        res.status(200).json({success:true,message:'payment status updated'+payStatus})
    }catch(e)
    {
        console.log('Error updating payment status: ',e)
        return res.status(500).json({success:false,message:'Internal server error: ',e})
    }
}

const checkRegistered = async(req,res)=>{
    try{
        const {studentUid,eventId} = req.body


        const  request = await Request.findOne({studentUid,eventId})

        if(!request)
            return res.status(404).json({success:false,message:'No Registration found'})

        res.status(200).json({success:true,request:request})

    }catch(e)
    {
        console.log("Error checking event: ",e)
        return res.status(500).json({success:false,message:'Internal Server Error: ',e})
    }
}

module.exports = {sendRequest,getRequests,approveRequest,rejectRequest,getStudentRequests,updatePaymentStatus,checkRegistered}