var express = require('express');
var router = express.Router();

var userModel = require('../models/user');

router.get('/',(req,res)=>{
  userModel.find({}).exec().then(function(data){
    res.json(data);
  })
});

router.get('/:id',(req,res)=>{
  const userId = req.params.id;
  userModel.find({_id: userId}).exec().then(function(data){
    res.json(data);
  })
});

router.post('/',(req,res)=>{
    const user = req.body.username;
    const pass = req.body.password;

    const newUser = new userModel({username: user, password: pass});
    newUser.save();
    res.json("create new user success!");
});

router.delete('/:id',(req,res)=>{
  const userId = req.params.userId;
  userModel.remove({_id: userId}).exec().then(()=>{
    res.json("Delete user success!");
  })
});

router.put('/:id',(req,res)=>{
  const userId = req.params.id;
  const newUser = req.body.username;
  const newPass = req.body.password;
  userModel.findOneAndUpdate({_id: userId}, {$set:{username: newUser, password: newPass}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    res.json("update success!")
  });
});

module.exports = router;
