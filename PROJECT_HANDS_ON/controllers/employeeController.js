const express = require('express');

//const mongoose = require('mongoose');
const Employee = require('../models/employee.model');

var router = express.Router();

router.get('/',async (req,res)=>{    
    try{
        const emps = await Employee.find();
        res.json(emps);
    }catch(err){
        res.send('Error '+err);
    }
});

router.post('/',async(req,res)=>{
    console.log(req.body);
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile
    });

    try{
        const a1= await employee.save();
        res.json(a1);

        }catch(error){
            res.send('Error');
        }

        // employee.save((err,doc)=>{
        //     if(!err)
        //     res.redirect('employee/list');
        //     else
        //     console.log('error during insert: '+err);
        // });
    
});


router.get('/:id',async (req,res)=>{    
    try{
        const emp = await Employee.findById(req.params.id);
        res.json(emp);
    }catch(err){
        res.send('Error '+err);
    }
});

router.patch('/:id',(req,res)=>{
    
        var updateObject = req.body; // {last_name : "smith", age: 44}
        var id = req.params.id;
        //{name:req.body.name}
        Employee.findByIdAndUpdate(id,updateObject,(err,docs)=>
        {
            if(!err)
            res.redirect('/employee')
            else
            res.send('Error '+err);
        })
       // db.users.update({_id  : ObjectId(id)},Employee.findByIdAndUpdate()

    
    
})

router.delete('/:id', (req,res)=>{
     Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/employee')
        }
        else{
            console.log('Error '+err)
        }
    });
    // Employee.save();
    

         //Employee.findByIdAndRemove(req.params.id);
 
         
        //res.json(a1)
    
});

// router.get('/list',async (req,res)=>{
//     res.json("from list");
// });

module.exports = router;








// var http = require('http');  
// var MongoClient = require('mongodb').MongoClient;  
// var url = "mongodb://localhost:27017/MongoDatabase";  
// MongoClient.connect(url, function(err, db) {  
// if (err) throw err;  
// var query = { address: "Delhi" };  
// db.collection("employees").find(query).toArray(function(err, result) {  
// if (err) throw err;  
// console.log(result);  
// db.close();  
// });  
// }); 