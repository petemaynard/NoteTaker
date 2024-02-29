const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  priority: {
    type: Integer
  }
},{
  timestamps: true
})

const User = mongoose.model('Note', userSchema);
module.exports = Note;