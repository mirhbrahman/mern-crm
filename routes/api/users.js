const express = require("express");
const router = express.Router();
const validateRegisterInput = require("../../validation/register");
const User = require("../../models/User");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

// @route  POST /api/users/register
// @des    Register user
// @access Public
router.post("/register", (req, res) => {
  // Check for validation
  const { errors } = validateRegisterInput(req.body);
  if (errors) return res.status(400).json(errors);

  // Check user already exist or not
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exits" });
    } else {
      // Create user
      const newUser = new User(_.pick(req.body, ["name", "email", "password"]));
      // Generate password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          // Set default value
          newUser.verificationToken = User.genVerificationToken();
          newUser.isVerified = User.unVerified();
          newUser.status = User.defaultStatus();
          newUser.userLevel = User.defaultUserLevel();
          newUser
            .save()
            .then(user => res.status(201).json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
