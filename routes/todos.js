var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Todo.find({}, function(err, todos){
    if(err) return res.status(400).send(err); 
    res.send(todos); 
  });
});

router.post('/', function(req, res, next) {
  Todo.add(req.body, function(err, todo){
    res.send(err || todo);
  });
});

module.exports = router;
