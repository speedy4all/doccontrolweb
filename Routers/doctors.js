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

const checkForValidId = (req, res, next) => {
  if (!req.params.id) {
    return res.status(500).send({ error: "Invalid id param" });
  }
  console.log("First validation : OK");
  next();
};

const checkForValidSpec = (req, res, next) => {
  if (!req.params.spec) {
    return res.status(500).send({ error: "Invalid spec param" });
  }
  console.log("First validation : OK");
  next();
};






router.get("/", prepareData, async (request, response) => {
  try {
    let res = request.doctors;
    if (request.query.search) {
      res = request.doctors.filter(
        p =>
          p.name.toLowerCase().search(request.query.search.toLowerCase()) !== -1
      );
    }

    return response.send(res);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});


router.get(
  "/:id",
  checkForValidId,
  prepareData,
  async (request, response) => {
    console.log("Response function : OK");
    try {
      const doctor = request.doctors.find(el => el.id == request.params.id);

      if (doctor) {
        response.send(doctor);
      }

      return response.status(404).send({ message: "No doctor found" });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }
);


function getDocBySpec(doc,arr)
{if(doc.specialty==arr.spec)
  {return doc;}
};



router.get("/specialty/:spec",checkForValidSpec, prepareData, async (request, response) => {
  console.log("Response function : OK");
  try {
    const doctor = request.doctors.map(elem=>getDocBySpec(elem,request.params));
    if(!doctor)
    return response.status(404).send({ message: "No doctor found" });
    return response.send(doctor);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});


router.post("/", prepareData, async (request, response) => {
  try {
    const params = request.body.doctor;
    if (params) {
      const newDdoctor = {
        ...params,
        id: uuidv4()
      };

      request.doctors.push(newDdoctor);
      await writeFileAsync(filePath, JSON.stringify(request.doctors));

      return response.send(newDdoctor);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/**
 * Modificare produs existent
 */
router.put("/", prepareData, async (request, response) => {
  try {
    const params = request.body.doctor;
    if (!params) {
      return response.send({ error: "Missing product param" });
    }

    const modifiedDoctors = request.doctors.map(p => {
      return p.id === params.id ? params : p;
    });
    await writeFileAsync(filePath, JSON.stringify(modifiedDoctors));

    return response.send(params);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/**
 * Stergere produs existent
 */
router.delete("/:id", prepareData, async (request, response) => {
  try {
    const idToDelete = request.params.id;

    const doctorToDelete = request.doctors.find(p => p.id === idToDelete);
    if (!doctorToDelete) {
      return response.send({ error: "No product found" });
    }
    request.doctors.splice(request.doctors.indexOf(doctorToDelete),1);

    await writeFileAsync(filePath, JSON.stringify(request.doctors));

    return response.send({ message: `Deleted doctor: ${idToDelete}` });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;
