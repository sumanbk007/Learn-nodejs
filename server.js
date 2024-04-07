const express = require("express");

const app = express();

const db = require("./db");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
// app.use(express.json());
const Person = require("./models/person");

const menuList = require("./models/menuList");

// const { AsyncResource } = require("async_hooks");

app.get("/", (req, res) => {
  res.send("Welcome to node js tutorial");
});

app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/person", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    console.log(data);

    //Create the new person document using Mongoose model
    const newPerson = new Person(data);

    //Save the new Person to database
    const response = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
