const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var env = process.env.NODE_ENV || 'development';
console.log(env);
if(env==='development')
mongoose.connect("mongodb://localhost:27017/TodoApp");
else
mongoose.connect("mongodb://rohitdrake:mLab003#@ds031193.mlab.com:31193/todoapp");


module.exports = {mongoose};
