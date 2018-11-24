const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const ContactSchema = Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: "contacts"
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  amount: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  closeDate: Date,

  probability: {
    type: Number,
    required: true,
    max: 100
  },
  status: {
    type: Number,
    default: 0,
    required: true
  },
  stage: {
    type: Number,
    default: 0,
    required: true
  },
  description: String,
  created_at: {
    type: Date,
    default: Date.now()
  }
});

const Contact = mongoose.model("opportunities", ContactSchema);

module.exports = Contact;
