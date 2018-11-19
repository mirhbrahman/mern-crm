const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const OrganizationSchema = Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "users"
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
  created_at: {
    type: Date,
    default: Date.now()
  }
});

const Organization = mongoose.model("organizations", OrganizationSchema);

module.exports = Organization;
