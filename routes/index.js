var express = require('express');
var router = express.Router();

fakeAPI = ()=>{
  return [
    {
      name: 'Katarina',
      lane: 'midlaner'
    },
    {
      name: 'Jayce',
      lane: 'toplaner'
    },
    {
      name: 'Heimerdinger',
      lane: 'toplaner'
    },
    {
      name: 'Zed',
      lane: 'midlaner'
    },
    {
      name: 'Azir',
      lane: 'midlaner'
    }
  ];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express', hero: fakeAPI(), listExists : true, layout: null});
});

module.exports = router;
