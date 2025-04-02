const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const cors = require("cors");
const Student = require("./Schema/Student");
const College = require("./Schema/College")
const bodyParser = require('body-parser')
const verifyTokenStudent = require("./middleware/verifyTokenStudent");
const verifyTokenCollege = require("./middleware/verifyTokenCollege");

dotenv.config();
const app = express();
app.use(bodyParser.json({limit:'10mb'}))
app.use(express.json());
app.use(cors());

//* initialize firebase admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//* connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.error(e));

//! Register Route fot Student
app.post("/user/student/register", verifyTokenStudent, async (req, res) => {
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
});

//!Login Route for Student
app.post("/user/student/login", verifyTokenStudent, async (req, res) => {
  try {
    const { uid } = req.student;
    const student = await Student.findOne({ uid });

    if (!student) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({ msg: "Login Successful" });
  } catch (e) {
    console.error("Login Error: ", e);
    res.status(500).json({ error: e.message });
  }
});

//! Register Route for College
app.post("/user/college/register", verifyTokenCollege, async (req, res) => {
  try {
    console.log(req.college)
    const { uid, email, name } = req.college;

    let college = await College.findOne({ $or: [{ uid: uid }, { name: name }] });
    if (college) {
      try {
        await admin.auth().deleteUser(req.college.uid);
        console.log("Firebase user deleted due to registration error.");
      } catch (firebaseError) {
        console.error("Error deleting user from Firebase Auth:", firebaseError);
      }
      return res.status(400).json({ message: "College already exists" });

    }

    college = new College({ uid, email, name });
    await college.save(); // Ensure save is awaited

    res.status(201).json({ msg: "College Registered Successfully" ,uid:uid});
  } catch (e) {
    console.error("Registration Error: ", e); // Log the actual error
    return res.status(500).json({ error: e.message }); // Send error message
  }
});

//! Login Route for College
app.post("/user/college/login", verifyTokenCollege, async (req, res) => {
  try {
    const { uid } = req.college;
    const college = await College.findOne({ uid });

    if (!college) return res.status(404).json({ msg: "College not found" });

    res.status(200).json({ msg: "Login Successful" ,uid:uid});
  } catch (e) {
    console.error("Login Error: ", e);
    res.status(500).json({ error: e.message });
  }
});


//! State data route
app.get("/api/states", async (req, res) => {
  try {
    const response = await fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch States" });
  }
});


//! district data route
app.get('/api/districts/:stateId', async (req, res) => {
  try {
    const { stateId } = req.params
    const response = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`)
    const data = await response.json()
    res.json(data)
  }
  catch (e) {
    res.status(500).json({ error: "Failed to fetch district" })
  }
})


//! Route for college Details
app.post("/user/college/details", async (req, res) => {
  const {
    uid, name, collegeEmail, collegeCode, address, state, district, city,collegeLogo,
    pincode, adminName, adminEmail, adminContact, website, affiliation, accreditation
  } = req.body;
  try {
    const updatedCollege = await College.findOneAndUpdate(
      { uid },
      {
        name, collegeEmail, collegeCode, address, state, district, city,
        pincode, adminName, adminEmail, adminContact, website, affiliation, accreditation,collegeLogo
      },
      { new: true, upsert: false } // `new: true` returns the updated document
    );

    if (!updatedCollege) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json({ message: "College details updated", college: updatedCollege });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


//! Route to verify is college verified

app.get('/api/verify/:collegeUid', async (req, res) => {
  const { collegeUid } = req.params;
  console.log("Verifying College UID:", collegeUid);

  try {
      const college = await College.findOne({ uid: collegeUid });
      if(college.verified)
        return res.status(200).json({message:"College is verifies",status:"Ok"})
      else
        return res.status(400).json({message:"College is not verified",status:"NotOK"})
  } catch (error) {
      res.status(500).json({ error: "Internal server error"});
  }
});


app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is listening at post :${process.env.PORT}`);
});
