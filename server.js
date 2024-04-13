const express = require("express");
const app = express();

const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to node js learning");
});

//Import router fies

const personRoutes = require("./routes/personRoutes");
const menuListRoutes = require("./routes/menuListRoutes");

//Use router files
app.use("/person", personRoutes);
app.use("/menu", menuListRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
