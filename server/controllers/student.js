const Student = require('../Schema/Student')
const admin = require('firebase-admin')


const loginStudent = async (req, res) => {
    try {
      const { uid } = req.student;
      const student = await Student.findOne({ uid });
  
      if (!student) return res.status(404).json({ msg: "User not found" });
  
      res.status(200).json({ msg: "Login Successful",uid:uid});
    } catch (e) {
      console.error("Login Error: ", e);
      res.status(500).json({ error: e.message });
    }
  }

  const registerStudent =async (req, res) => {
    try {
      const { uid, email, name } = req.student;
  
      let student = await Student.findOne({ uid });
      if (student) {
        try {
          await admin.auth().deleteUser(req.student.uid);
          console.log("Firebase user deleted due to registration error.");
        } catch (firebaseError) {
          console.error("Error deleting user from Firebase Auth:", firebaseError);
        }
        return res.status(400).json({ message: "User already exists" });
      } 
  
  
      student = new Student({ uid, email, name });
      await student.save(); // Ensure save is awaited
  
      res.status(201).json({ msg: "User Registered Successfully" ,uid:uid});
    } catch (e) {
      console.error("Registration Error: ", e); // Log the actual error
      return res.status(500).json({ error: e.message }); // Send error message
    }
  }

  const getStudentDetails=async(req,res)=>{
    try{
      const studentUid = req.params.studentUid
      console.log("Fetching Details of Student :"+studentUid)
      const student = await Student.findOne({uid:studentUid})
      if(!student)
        return res.status(404).json({success:false,message:"Student not found"})
      
      res.status(200).json({success:true,student:student})
    }
    catch(e)
    {
        return res.status(500).json({success:false,message:"Internal Server Error:"+e})
    }

  }


  const updateStudent=async(req,res)=>{
    try{
      const {name,idCard,profilePicture,collegeName,mobileNo} = req.body
      const uid = req.params.studentUid
      const student = await Student.findOneAndUpdate({uid},
        {name,idCard,profilePicture,collegeName,mobileNo}
      )

      if(!student)
        return res.status(404).json({success:false,message:"Student not found"})

      res.status(200).json({success:true,student:student})
    }catch(e)
    {
      console.log("Error updating student:",e)
      return res.status(500).json({success:false,message:"Internal server error:",e})
    }
  }

  const fetch = require('node-fetch'); // Import node-fetch
  const stream = require('stream'); // Import stream module
  
  const getProfilePictureBlob = async (req, res) => {
    try {
      const student = await Student.findOne({ uid: req.params.studentUid });
      if (!student)
        return res.status(404).json({ success: false, message: 'Student Not Found' });
  
      const imageUrl = student.profilePicture;  // Assuming the profile picture URL is stored here
      const imageResponse = await fetch(imageUrl);
      
      if (!imageResponse.ok) {
        return res.status(404).json({ success: false, message: 'Image not found' });
      }
  
      // Set the appropriate content type based on the image format (JPEG, PNG, etc.)
      const contentType = imageResponse.headers.get('Content-Type');
      res.set('Content-Type', contentType);
  
      // Use a PassThrough stream to pipe the response
      const passthrough = new stream.PassThrough();
      imageResponse.body.pipe(passthrough);
      passthrough.pipe(res);  // Pipe it to the response object
    } catch (error) {
      console.log("Error fetching and piping image:", error);
      return res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
  };
  

  module.exports = {loginStudent,registerStudent,getStudentDetails,updateStudent,getProfilePictureBlob}