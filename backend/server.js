const express = require("express");
const cors = require ("cors");
const mongoose = require ("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express ()
const port = process.env.PORT || 5000;

//to exclude all the .env files when uploading to github

require ("dotenv").config();

app.use(cors());
app.use(express.json());

//using ejs to be able to access files in the views folder

app.set('view engine', 'ejs');

//using bodyparser to parse data from the app

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.static("public"));

const uri = process.env.ATLAS_URI;

//connect to monggose

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology:true});

//connect to different routes

const composeRouter = require("./routes/compose");
const libraryRouter = require("./routes/library");

app.use("/compose", composeRouter);
app.use("/library", libraryRouter);

// app to listen on port 5000 for local view

app.listen(port, function() {
  console.log("Server has started successfully.");
});

