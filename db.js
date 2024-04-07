const mongoose = require("mongoose");

//mongoDB url

const mongoUrl = "mongodb://127.0.0.1:27017/mydatabase"; //You can replace mydatabase with your database name.

//set up mongoDB Connections

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//get a default mongoose connections
//mongoose maintain default connections object  to represent  mongoDB connection.

const db = mongoose.connection;

//Define event listner for database connections

db.on("connected", () => {
  console.log("Connected sucessfully to mongoDB server");
});

db.on("error", () => {
  console.log("Error during mongoDB connections");
});

db.on("disconnected", () => {
  console.log("Disconnected to mongoDB server");
});

//Exports the database connection

module.exports = db;
