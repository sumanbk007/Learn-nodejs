const express = require("express");

const router = express.Router();

const menuList = require("./../models/menuList");

// Post method to save the menuList
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const menuData = new menuList(data);

    const response = await menuData.save();

    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await menuList.find();
    res.status(200).json(data);
    console.log("Here is the list of menu itmes");
  } catch (err) {
    res.status(500).json({ Error: "Internal server error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    console.log(tasteType);
    if (tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy") {
      const response = await menuList.find({ taste: tasteType });
      console.log("Data fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ Error: "Taste type not found" });
    }
  } catch (err) {
    res.status(500).json({ Error: "Internal server error" });
  }
});

module.exports = router;
