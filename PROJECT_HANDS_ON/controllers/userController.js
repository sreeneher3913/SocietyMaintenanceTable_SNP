const express = require("express");

const User = require("../models/UserModel");

var router = express.Router();

router.get("/userTable/:uname", async (req, res) => {
  try {
    const uname = req.params.uname;
    const pipeline = [
      { $match: { Name: uname } },
      {
        $group: {
          _id: "$Month",
          sumAmt: { $sum: "$Amount" },
          sumDue: { $sum: "$Due" },
        },
      },
      //{ $project: { _id: 1, sumAmt: 1, sumDue: 1, Name: 1 } },
    ];
    const aggCursor = User.aggregate(pipeline);
    var a1 = [];
    //a1.push(uname);
    for await (const doc of aggCursor) {
      a1.push(doc);
    }
    res.json(a1);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/societyTable", async (req, res) => {
  try {
    const uname = req.params.uname;
    const pipeline = [
      //{ $match:{Name: "pqr"} }
      {
        $group: {
          _id: { Month: "$Month", PaidTo: "$PaidTo" },
          sumAmt: { $sum: "$Amount" },
          sumDue: { $sum: "$Due" },
        },
      },
    ];
    const aggCursor = await User.aggregate(pipeline);
    var a1 = [];
    for await (const doc of aggCursor) {
      a1.push(doc);
    }
    res.json(a1);
  } catch (err) {
    res.send("Error" + err);
  }
});

// [
//     {
//       '$group': {
//         '_id': {
//           'Month': '$Month',
//           'PaidTo': '$PaidTo'
//         },
//         'sumAmount': {
//           '$sum': '$Amount'
//         },
//         'sumDue': {
//           '$sum': '$Due'
//         }
//       }
//     }, {
//       '$project': {
//         '_id': 1
//       }
//     }
//   ]

router.get("/defaulterList", async (req, res) => {
  try {
    const pipeline = [
      { $match: { Due: { $gt: 0 } } },
      {
        $group: {
          _id: { Month: "$Month", Name: "$Name" },
          //sumAmt: { $sum: "$Amount" },
          sumDue: { $sum: "$Due" },
        },
      },
    ];
    const aggCursor = await User.aggregate(pipeline);
    var a1 = [];
    for await (const doc of aggCursor) {
      a1.push(doc);
    }
    res.json(a1);
    // console.log(a1);
    // console.log(a1[0]._id.Month);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/approveExpense", async (req, res) => {
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
    // console.log(user);
    // res.json(user);
  } catch (error) {
    res.send("Error");
  }
});

// router.get('/:id',async (req,res)=>{
//     try{
//         const emp = await Employee.findById(req.params.id);
//         res.json(emp);
//     }catch(err){
//         res.send('Error '+err);
//     }
// });

// router.patch('/:id',(req,res)=>{

//         var updateObject = req.body; // {last_name : "smith", age: 44}
//         var id = req.params.id;
//         //{name:req.body.name}
//         Employee.findByIdAndUpdate(id,updateObject,(err,docs)=>
//         {
//             if(!err)
//             res.redirect('/employee')
//             else
//             res.send('Error '+err);
//         })
//        // db.users.update({_id  : ObjectId(id)},Employee.findByIdAndUpdate()

// })

// router.delete('/:id', (req,res)=>{
//      Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
//         if(!err){
//             res.redirect('/employee')
//         }
//         else{
//             console.log('Error '+err)
//         }
//     });
//     // Employee.save();

//          //Employee.findByIdAndRemove(req.params.id);

//         //res.json(a1)

// });

// router.get('/list',async (req,res)=>{
//     res.json("from list");
// });

module.exports = router;
