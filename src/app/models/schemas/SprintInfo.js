const mongoose = require('mongoose')

const SprintInfo = new mongoose.Schema({
  pcstaId: {
    type: String,
    required: true
  },
  activities: [],
  sprintNumber: {
    type: Number,
    required: true
  },
  isFinished: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = {
  SprintInfo: mongoose.model('SprintInfo', SprintInfo)
}
