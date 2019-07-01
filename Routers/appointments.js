const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const express = require("express");
const uuidv4 = require('uuid/v4');
const router = express.Router();

const filePath = path.join(__dirname, "../Data/doctors.json");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const prepareData = async (req, res, next) => {
  let doctors = await readFileAsync(filePath, "utf8");
  doctors = JSON.parse(doctors);
  req.doctors = doctors;
  console.log("Prepare data : OK");
  next();
};

router.get("/", prepareData, async (request, response) => {
    try {
      return response.send("Ok");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  });
  



module.exports = router;
