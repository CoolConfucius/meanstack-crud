'use strict';

var mongoose = require('mongoose');
var Todo; 

var todoSchema = mongoose.Schema({
  description: { type: String}, 
  date: { type: Date, default: Date.now() },
  iscomplete: { type: Boolean }
});

todoSchema.statics.add = function (todo, cb) {
  console.log("carete todo", todo);
  Todo.create({
    description: todo.description,
    date: Date.now(), 
    iscomplete: false
  }, cb);
};

Todo = mongoose.model('Todo', todoSchema); 

module.exports = Todo; 