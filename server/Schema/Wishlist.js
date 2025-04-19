const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
  studentUid: {
    type: String,
    required: true,
  },
  eventIds: {
    type: [String], // Array of event IDs
    default: [],
  },
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist
