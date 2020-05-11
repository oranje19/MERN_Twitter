const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require('./config/keys_prod').mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

if (process.env.NODE_ENV === "production") {
  applicationCache.use(express.static("frontend/build"));
  applicationCache.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
    .connect(db, { userNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB Successfully"))
    .catch(err => console.log(err));

// app.get("/", (req, res) => res.send("Back to Hello World"));
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/tweets", tweets);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));