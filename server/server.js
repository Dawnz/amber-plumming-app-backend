require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = require("./lib/app");

mongoose
  .connect(process.env.MONGODB_URL)
  .then((x) => {
    console.log(
      `Connected to MongoDB Successfully! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongodb", err.reason);
  });

const port = process.env.PORT;

const server = app.listen(port, "0.0.0.0" );