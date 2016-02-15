var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("getting todos");
  Todo.find({}, function(err, todos){
    if(err) return res.status(400).send(err); 
    console.log("Found them,", todos);
    res.send(todos); 
  });
});

router.post('/', function(req, res, next) {
  console.log("post todo", req.body);
  Todo.add(req.body, function(err, todo){
    res.send(err || todo);
  });
});

module.exports = router;
