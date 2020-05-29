var mongoose = require('mongoose');
mongoose.set('debug',true);
mongoose.connect('mongodb://localhost/todo-api',{useNewUrlParser: true,useFindAndModify: false,useUnifiedTopology: true});

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');