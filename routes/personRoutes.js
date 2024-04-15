const express = require("express");

const router = express.Router();

const { jwtAuthMiddleware, generateToken } = require("./../jwt");

// Importing models
const Person = require("./../models/person");

// Post route to add the people
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    console.log(data);

    //Create the new person document using Mongoose model
    const newPerson = new Person(data);

    //Save the new Person to database
    const response = await newPerson.save();
    console.log("Data saved");

    const payLoad = {
      id: response.id,
      name: response.name,
    };

    const token = generateToken(payLoad);
    console.log("token is:", token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Login Route

router.post("/login", async (req, res) => {
  //Extract username or password from the request body

  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username and password" });
    }

    //generate token

    const payLoad = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payLoad);

    //return token as response

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get method to get the person

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Profile route

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);

    const userId = userData.id;
    console.log(userId);

    const user = await Person.findById(userId);
    console.log(user);

    res.status(200).json({ user });
  } catch (err) {
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
