var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get(
  '/info',
  function(req, res) {
    var infoObj = {}; // $infoObj = array();
    infoObj.cuenta = "0801198412349";
    infoObj.nombre = "Orlando J Betancourth";
    infoObj.email = "obetancourthunicah@gmail.com";
    res.json(infoObj);
  }
); // get Info

router.get(
  '/hook',
  function(req, res){
    res.render("hook", {});
  }
);// get hook

router.post(
  '/hook',
  function(req, res){
    var body = req.body;
    console.log(body);
    res.render("hook", body);
  }
  
);//post hook

module.exports = router;
