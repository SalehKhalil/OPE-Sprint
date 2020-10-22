const mongoose = require('mongoose')

const Card = new mongoose.Schema({
  groupId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  responsible: {
    name: { type: String, required: true },
    avatar: { type: String, required: false }
  },
  priority: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  storyPoints: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  sprintNumber: {
    type: Number,
    required: true,
    default: 0
  },
  historic: [],
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: false
  }
})

module.exports = {
  Card: mongoose.model('Card', Card)
}
