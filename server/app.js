const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const router = require('./routes/centralizedRoute')
const bodyParser = require('body-parser')
const cors = require('cors')
const initializeApp = require('./config/firebase')
const states = require('./routes/states')
const student = require('./routes/student')
const college = require('./routes/college')
const Event = require('./Schema/Event')

const applyMiddleware = require('./middleware/applyMiddleware')

dotenv.config();
const app = express();

//git

//* initialize firebase admin SDK
initializeApp()

app.post('/event/addevent',async (req,res)=>{
  try{
  const event = new Event(req.body)
  console.log(req.body)
  await event.save()
  res.status(201).json({message:"Event Added Succesfully "+event})
  }
  catch(e)
  {
    res.status(401).json({message:"Error while adding event:"+e.message})
  }
})

//* Apply middleware for all the api calls
applyMiddleware(app)

//* connect to MongoDB
connectDB()


//* Routes
app.use('/',router)

// app.use('/user/college', college)
// app.use('/api', states)
// app.use('/user/student', student)





app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is listening at post :${process.env.PORT}`);
});
