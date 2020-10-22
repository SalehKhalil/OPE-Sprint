const mongoose = require('mongoose')

const ReviewBacklog = new mongoose.Schema({
  groupId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  cards: [],
  sprintNumber: {
    type: Number,
    required: true
  }
})

module.exports = {
  ReviewBacklog: mongoose.model('ReviewBacklog', ReviewBacklog)
}
