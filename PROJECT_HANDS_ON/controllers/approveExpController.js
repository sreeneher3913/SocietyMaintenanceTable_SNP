const express = require("express");

const User = require("../models/ApproveExpModel");

var router = express.Router();

router.post("/addExpense", async (req, res) => {
  //console.log(req.body);
  const user = new User({
    Month: req.body.Month,
    PaidTo: req.body.PaidTo,
    Amount: req.body.Amount,
    Due: req.body.Due,
    Name: req.body.Name,
  });
  try {
    const a1 = await user.save();
    res.json(a1);
  } catch (error) {
    res.send("Error");
  }
});

router.get("/getExpenses", async (req, res) => {
  try {
    const expenses = await User.find();
    res.json(expenses);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/addExp/getExpenses");
    } else {
      console.log("Error " + err);
    }
  });
  // Employee.save();

  //Employee.findByIdAndRemove(req.params.id);

  //res.json(a1)
});

// router.delete("delete/:id", (req, res) => {
//   try {
//     const a1 = User.findByIdAndDelete(req.params.id);
//     User.save();
//     res.json(a1);
//   } catch (err) {
//     res.send("Err:" + err);
//   }
// });

// router.delete("/:id", (req, res) => {
//   var myquery = { _id: req.params.id };
//   User.remove(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log(obj.result.n + " document(s) deleted");
//     db.close();
//   });

//   //   User.findByIdAndRemove(req.params.id, (err, doc) => {
//   //     if (!err) {
//   //       res.redirect("/");
//   //     } else {
//   //       console.log("Error " + err);
//   //     }
//   //   });
//   // Employee.save();

//   //Employee.findByIdAndRemove(req.params.id);

//   //res.json(a1)
// });

module.exports = router;
