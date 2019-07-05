const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const express = require("express");
const uuidv4 = require('uuid/v4');
const router = express.Router();
const constants = require('./constants');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const filePath = path.join(__dirname, "../Data/userdata.json");


const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const prepareData = async (req, res, next) => {
    let users = await readFileAsync(filePath, "utf8");
    users = JSON.parse(users);
    req.users = users;
    console.log("Prepare data : OK");
    next();
};


router.post("/register", prepareData, async (request, response) => {
    try {
        const params = request.body;
        if (params) {
            const newUser = {
                ...params,
                id: uuidv4()
            };
            if(newUser.password!=newUser.confirmpassword)
            return response.status(401).send("Passwords do not match");
            bcrypt.hash(newUser.password, saltRounds, async function (err, hash) {
                newUser.password = hash;
                request.users.push(newUser);
                await writeFileAsync(filePath, JSON.stringify(request.users));

                return response.send(newUser);
            });


        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
});

router.post("/login", prepareData, async (request, response) => {
    try {
        const params = request.body;
        if (params) {
            const user= request.users.find(u=> u.email === params.email);
            if(!user)
                {
                    return response.status(404).send("User not found");
                }
                bcrypt.compare(params.password, user.password, function(err, res) {
                    if(!res)
                    {
                        return response.status(401).send("Unauthorised");
                    }
                   const  {email,firstname,lastname,id}=user;
                    return response.send({email,firstname,lastname,id});
                });   
            


        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
});

/*router.put("/changepass", prepareData, async (request, response) => {
    try {
      const params = request.body;
      if (!params) {
        return response.send({ error: "Missing product param" });
      }
      const modifyUser= request.users.find(u=> u.id === params.id);

      bcrypt.hash(params.password, saltRounds, async function (err, hash) {
        modifyUser.password = hash;
        
    await writeFileAsync(filePath, JSON.stringify(response.users));
    return response.send(modifyUser);
    })
    
    }
    catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  });*/


module.exports = router;