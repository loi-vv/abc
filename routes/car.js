var express = require('express');
var router = express.Router();

var carModel = require('../models/car');
var userModel = require('../models/user');

// router.get('/',(req,res)=>{
//     carModel.find({}).exec().then(function(data){
//     res.json(data);
//   })
// });

router.get('/:id/cars',(req,res)=>{
  const userId = req.params.id;
  carModel.find({owner: userId}).populate('owner', '_id').exec().then(function(data){
    res.json(data);
  })
});

router.get('/cars/:id',(req,res)=>{
    const carID = req.params.id;
    carModel.findOne({_id : carID}).populate('owner').exec().then(function(data){
      res.json(data);
    })
});

module.exports = router;
