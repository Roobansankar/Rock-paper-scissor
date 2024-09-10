const mongoose = require('mongoose')
const infoSchema = mongoose.Schema({
  
  User1Name: {
    type: String,
    required: true,
    trim: true,
  },
  User2Name: {
    type: String,
    required: true,
    trim: true,
  },
  User1Result: {
    type: String,
    enum: ['Win', 'Lose', 'Tie'],
  },
  User2Result: {
    type: String,
    enum: ['Win', 'Lose', 'Tie'],
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('player', infoSchema);
