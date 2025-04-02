const mongoose = require('mongoose')
const dotenv = require('dotenv')

const connectDB = async ()=>{
    try{
        await mongoose
          .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          console.log("MongoDB Connected")
        
    }
    catch(e)
    {
        console.log("Connection Failure: ",e)
        process.exit(1)
    }
}

module.exports = connectDB