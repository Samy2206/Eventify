const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
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
  schedule: {
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: false
    },
    venue: {
      type: String,
      required: true
    },
    mapLink: {
      type: String,
      required: false
    }
  },
  participation: {
    criteria: {
      type: String,
      required: false
    },
    type: {
      type: String,
      enum: ['Solo', 'Team'],
      default: 'Solo'
    },
    teamSize: {
      type: Number,
      required: function () {
        return this.participation.type === 'Team';
      }
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
    }
  },
  organizer: {
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
    }
  },
  additionalDetails: {
    type: String,
    required: false
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
