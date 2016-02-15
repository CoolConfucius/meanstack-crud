'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var Todo; 

var todoSchema = mongoose.Schema({
  description: { type: String}, 
  date: { type: Date, default: Date.now() },
  long: { type: String, default: moment().format('MM/DD/YYYY, h:mm a') }, 
  short: { type: String, default: moment().format('MM/DD/YYYY') }, 
  iscomplete: { type: Boolean, default: false }
});

todoSchema.statics.add = function (todo, cb) {
  console.log("carete todo", todo);
  Todo.create({
    description: todo.description
    // ,
    // date: Date.now(), 
    // iscomplete: false
  }, cb);
};

Todo = mongoose.model('Todo', todoSchema); 

module.exports = Todo; 