'use strict';

var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  description: { type: String}, 
  date: { type: Date, default: Date.now() },
  iscomplete: { type: Boolean }
});

var Todo = mongoose.model('Todo', todoSchema); 

module.exports = Todo; 