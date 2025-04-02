const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const router = require('./routes/centralizedRoute')
const initializeApp = require('./config/firebase')
const applyMiddleware = require('./middleware/applyMiddleware')

dotenv.config();
const app = express();

//* Apply middleware for all the api calls
applyMiddleware(app)

//* initialize firebase admin SDK
initializeApp()

//* connect to MongoDB
connectDB()

//* Routes
app.use('/',router)

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is listening at post :${process.env.PORT}`);
});
