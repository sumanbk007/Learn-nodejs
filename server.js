const express = require("express");
const app = express();

const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to node js learning");
});

//Import router fies

const personRoutes = require("./routes/personRoutes");
const menuListRoutes = require("./routes/menuListRoutes");

//Use router files
app.use("/person", personRoutes);
app.use("/menu", menuListRoutes);

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
