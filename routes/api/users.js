const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const settings = require("../../config/settings");

// Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Model
const User = require("../../models/User");
// Middleware
const auth = require("../../middleware/auth");

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

// @route  POST /api/users/login
// @des    User login
// @access Public
router.post("/login", (req, res) => {
  // Check for validation
  const { errors } = validateLoginInput(req.body);
  if (errors) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Jwt payload
        const payload = {
          id: user.id,
          name: user.email,
          email: user.email,
          status: user.status,
          userLevel: user.userLevel
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: settings.tokenExpireIn },
          (err, token) => {
            if (token) {
              // Return token
              return res.json({
                success: true,
                token: "Bearer " + token
              });
            } else {
              return res.json("Somethind error");
            }
          }
        );
      } else {
        return res.status(404).json({ email: "Email or password incorrect" });
      }
    });
  });
});

// @route  GET /api/users/current
// @des    Current user info
// @access Private
router.get("/current", auth, (req, res) => {
  return res.json(
    _.pick(req.user, ["id", "name", "email", "status", "userLevel"])
  );
});

module.exports = router;
