const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const router = require('./routes/centralizedRoute')
const bodyParser = require('body-parser')
const initializeApp = require('./config/firebase')
const applyMiddleware = require('./middleware/applyMiddleware');

dotenv.config();
const app = express();


//* initialize firebase admin SDK
initializeApp()

//* Apply middleware for all the api calls
applyMiddleware(app)

//* connect to MongoDB
connectDB()


//* Routes
app.use('/', router)


app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is listening at post :${process.env.PORT}`);
});
