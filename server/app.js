const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const admin = require('firebase-admin')
const cors = require('cors')
const Student = require('./Student')
const verifyToken = require('./middleware/verifyToken')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

//* initialize firebase admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

//* connect to MongoDB
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,
    useUnifiedTopology: true,})
.then(()=>console.log("MongoDB Connected"))
.catch((e)=>console.error(e))

//! Register Route
app.post('/user/register', verifyToken, async (req, res) => {
    try {
        const { uid, email, name } = req.student;

        let student = await Student.findOne({ uid });
        if (student)
            return res.status(400).json({ message: "User already exists" });

        student = new Student({ uid, email, name });
        await student.save();  // Ensure save is awaited

        res.status(201).json({ msg: "User Registered Successfully" });
    } catch (e) {
        console.error("Registration Error: ", e); // Log the actual error
        return res.status(500).json({ error: e.message }); // Send error message
    }
});


//!Login Route
app.post('/user/login',verifyToken,async(req,res)=>{
    try{
        const {uid} = req.student
        const student = await Student.findOne({uid})

        if(!student)
            return res.status(404).json({msg:"User not found"})

        res.status(200).json({msg:"Login Successful"})
    }
    catch(e)
    {
        console.error("Login Error: ",e)
        res.status(500).json({error:e.message})
    }
})

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is listening at post :${process.env.PORT}`)
})