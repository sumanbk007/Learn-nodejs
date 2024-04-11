const express = require("express");

const router = express.Router();

// Importing models
const Person = require("./../models/person");

// Post route to add the people
router.post("/", async (req, res) => {
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

//Get method to get the person

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get method with paramaterized url

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;

    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });

      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ Error: "Invalid work type" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Put method to update the person data

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ Error: "Person with the id not found!!" });
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete operation route

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ Error: "Person with the id not found!!" });
    }

    console.log("Data deleted");
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
