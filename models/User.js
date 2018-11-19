const mongoose = require("mongoose");
const uuid = require("uuid");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
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
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    minlength: 6,
    maxlength: 20
  },
  website: {
    type: String,
    maxlength: 1024
  },
  primaryAddress: String,
  secondaryAddress: String,
  verificationToken: String,
  isVerified: {
    type: Boolean,
    required: true
  },
  passResetToken: String,
  status: {
    type: Number,
    required: true
  },
  userLevel: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.statics.genVerificationToken = () => {
  return uuid();
};
UserSchema.statics.unVerified = () => {
  return false;
};
UserSchema.statics.defaultStatus = () => {
  return 0;
};
UserSchema.statics.defaultUserLevel = () => {
  return 0;
};

module.exports = User = mongoose.model("users", UserSchema);
