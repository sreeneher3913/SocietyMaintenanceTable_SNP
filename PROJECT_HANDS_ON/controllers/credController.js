const express = require("express");

const Cred = require("../models/CredModel");

var router = express.Router();

router.post("/signup", async (req, res) => {
  const user = new Cred({
    Name: req.body.Name,
    Email: req.body.Email,
    Password: req.body.Password,
    Phone: req.body.Phone,
  });
  try {
    const a1 = await user.save();
    res.json(a1);
  } catch (err) {
    res.send("Error:" + err);
  }
});

router.post("/validate", async (req, res) => {
  try {
    console.log("This is validate");
    const user = new Cred({
      Email: req.body.Email,
      Password: req.body.Password,
    });

    console.log(user.Email);
    console.log(user.Password);
    const query = { Email: user.Email, Password: user.Password };
    const data = await Cred.find(query);
    console.log(data.length);
    if (data.length == 0) {
      res.json({ status: "ERROR" });
    } else {
      data.push({ status: "OK" });
      console.log(data);
      console.log(data[1].status);
      res.json(data);
    }
  } catch (err) {
    res.send("Error:" + err);
  }
});

module.exports = router;
