const Student = require('../Schema/Student')
const admin = require('firebase-admin')


const loginStudent = async (req, res) => {
    try {
      const { uid } = req.student;
      const student = await Student.findOne({ uid });
  
      if (!student) return res.status(404).json({ msg: "User not found" });
  
      res.status(200).json({ msg: "Login Successful" });
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
  
      res.status(201).json({ msg: "User Registered Successfully" });
    } catch (e) {
      console.error("Registration Error: ", e); // Log the actual error
      return res.status(500).json({ error: e.message }); // Send error message
    }
  }

  module.exports = {loginStudent,registerStudent}