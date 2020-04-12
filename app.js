const express = require("express");
const expresshb = require("express-handlebars");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes")
const mongoose = require("mongoose");

// const axios = require("axios");
// const cheerio = require("cheerio");

// var db = require("./models");

const PORT = 3000;
const app = express();

// middleware setup
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use("/",htmlRoutes) //home page routing
app.use("/api",apiRoutes) //home page routing

// render engine setup
app.engine('handlebars', expresshb());
app.set('view engine', 'handlebars');

// runinng server
app.listen(PORT, function() {
    console.log("App is running on port " + PORT + "...");
});