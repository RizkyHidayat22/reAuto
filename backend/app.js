require("dotenv").config();

const cors = require('cors');
const express = require("express");
const app = express();
const router = require("./router");

// localhost:3000/
// app.set("view engine", "ejs");
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);


module.exports = app