const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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

// Load routes
const users = require("./routes/api/users");
// Use routes
app.use("/api/users/", users);

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at port ${port}`));
