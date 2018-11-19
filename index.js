const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// DB config
const db = require("./config/keys").mongoURI;
// DB connection
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

// Load body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Load routes
const users = require("./routes/api/users");
const organizations = require("./routes/api/organizations");
// Use routes
app.use("/api/users/", users);
app.use("/api/organizations/", organizations);

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at port ${port}`));
