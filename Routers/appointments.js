const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const express = require("express");
const uuidv4 = require('uuid/v4');
const router = express.Router();
const constants = require('./constants');

const filePath = path.join(__dirname, "../Data/appointments.json");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const prepareData = async (req, res, next) => {
  let appointments = await readFileAsync(filePath, "utf8");
  appointments = JSON.parse(appointments);
  req.appointments = appointments;
  console.log("Prepare data : OK");
  next();
};

router.get("/:doctorId", prepareData, async (request, response) => {
  try {
    const appoint = request.appointments.find(a => a.doctorId === request.params.doctorId);
    return response.send(appoint.appointments);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});
router.post("/:doctorId/:userId", prepareData, async (request, response) => {
  try {
    const appoint = request.appointments.find(a => a.doctorId === request.params.doctorId && a.userId === request.params.userId);
    const params = request.body;
    const newAppointment = {
      ...params,
      id: uuidv4(),
      status: constants.PENDING,
    };
    if (appoint) {
      appoint.appointments.push(newAppointment);
    } else {
      const newApp = {
        userId: request.params.userId,
        doctorId: request.params.doctorId,
        appointments: [newAppointment],
      };
      request.appointments.push(newApp);
    }
    await writeFileAsync(filePath, JSON.stringify(request.appointments));
    return response.send(newAppointment);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}
);
router.delete("/:doctorId/:userId/:id", prepareData, async (request, response) => {
  try {
    const appoint = request.appointments.find(a => a.doctorId === request.params.doctorId && a.userId === request.params.userId);
    
    if (!appoint) {
      return response.send({ error: "No appointment found" });
    }
    const idToDelete = request.params.id;
    const toDelete = appoint.appointments.find(ap => ap.id === idToDelete);
    const index = appoint.appointments.indexOf(toDelete);
   
    if(index === -1) {
      return response.send({ error: "No appointment found" });
     
    }     
    
    appoint.appointments.splice(index,1);
    await writeFileAsync(filePath, JSON.stringify(request.appointments));

    return response.send({ message: `Deleted appointment: ${idToDelete}` });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }

}

);

module.exports = router;
