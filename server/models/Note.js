const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  priority: {
    type: Number
  }
},{
  timestamps: true
})

const Note = mongoose.model('Note', userSchema);
module.exports = Note;