const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../Data/doctors.json");

module.exports = {
  determineStartingId: () => {
    let MAX = -Infinity;
    let doctors = fs.readFileSync(filePath, "utf8");
    doctors = JSON.parse(doctors);

    if (!doctors.length) {
      return 1;
    }

    doctors.forEach(p => {
      if (p.id >= MAX) {
        MAX = p.id;
      }
    });

    return MAX + 1;
  }
};
