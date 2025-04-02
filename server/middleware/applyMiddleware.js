const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const applyMiddleware = (app)=>
{

    app.use(bodyParser.json({limit:'10mb'}))
    app.use(express.json());
    app.use(cors());
}

module.exports = applyMiddleware