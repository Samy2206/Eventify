const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  collegeUid:{
    type:String,
    require:true,
  },
  description: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    enum: ['seminar', 'workshop', 'hackathon', 'conference', 'webinar', 'competition', 'fest', 'sports', 'cultural', 'technical', 'guest_lecture', 'meetup', 'career_fair', 'other'],
    required: true
  },
  category: {
    type: String,
    enum: ['technical', 'non_technical', 'cultural', 'sports', 'academic', 'entrepreneurship', 'social', 'career', 'health', 'arts', 'management', 'robotics', 'coding', 'business', 'literature', 'fashion', 'other'],
    required: true
  },
  poster: {
    type: String, // URL or path to the uploaded image
    required: false
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: false
  },
  venue: {
    type: String,
    required: true
  },
  mapLink: {
    type: String,
    required: false
  },
    criteria: {
      type: String,
      required: false
    },
    teamType: {
      type: String,
      enum: ['Solo', 'Team'],
      default: 'Solo'
    },
    teamSize: {
      type: Number,
    },
    registrationFees: {
      type: Number,
      required: false
    },
    idCardRequired: {
      type: String,
      enum: ['Necessary', 'Not Necessary'],
      default: 'Not Necessary'
    },
    seatLimit: {
      type: Number,
      required: false
    },
    departmentName: {
      type: String,
      required: true
    },
    coordinator: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
  additionalDetails: {
    type: String,
    required: false
  },
  approved:{
    type:Number,
    default:0,
  },
  rejected:{
    type:Number,
    default:0,
  }
},{timestamps:true});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
