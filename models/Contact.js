const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const ContactSchema = Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "organizations"
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 355,
    unique: true
  },

  title: String,
  department: String,
  phone: {
    type: String,
    minlength: 6,
    maxlength: 20,
    required: true
  },
  website: {
    type: String,
    maxlength: 1024
  },
  primaryAddress: {
    type: String,
    required: true
  },
  secondaryAddress: String,
  status: {
    type: Boolean,
    default: 0,
    required: true
  },
  role: {
    type: Boolean,
    default: 0,
    required: true
  },
  leadStatus: Number,
  created_at: {
    type: Date,
    default: Date.now()
  }
});

const Contact = mongoose.model("contacts", ContactSchema);

module.exports = Contact;
