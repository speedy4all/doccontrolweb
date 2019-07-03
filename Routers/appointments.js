const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const express = require("express");
const uuidv4 = require('uuid/v4');
const router = express.Router();

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
router.post("/:doctorId/:userId",prepareData,async(request,response)=>
{
    try{
      const appoint = request.appointments.find(a => a.doctorId === request.params.doctorId && a.userId === request.params.userId);
      const params=request.body.appointments;
      if(params)
      {
        const newAppointment={ 
          ...params,
          id:uuidv4()
        };
        request.appointments.push(newAppointment);
        await writeFileAsync(filePath,JSON.stringify(request.appointments));
        return response.send(newAppointment); 
      }
    }catch(error){
      console.log(error);
      return res.status(500).send(error.message);
    }
}
);
router.delete("/:doctorId/:userId/:id",prepareData,async(request,response)=>
{
    try{
      const appoint = request.appointments.find(a=>a.doctorId === request.params.doctorId && a.userId ===request params.userId);
      if(!appoint)
        return response.send({error :"No appointment found"});
      const idToDelete = request.params.id;
      const appointDelete=request.appoint.appointments.find(a=>a.appointment.id===idToDelete);
      if(!appointDelete){
        return response.send({error:"No appointment found"});
      }
      request.appointments.splice(1,request.appoint.appointments.indexOf(appointDelete));
      await writeFileAsync(filePath,JSON.stringify(request.appointments));

      return response.send({ message: `Deleted appointment: ${appoint.appointmentId}` });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
  }

    }

);




module.exports = router;
