const Request = require('../Schema/Request')

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

module.exports = {sendRequest}