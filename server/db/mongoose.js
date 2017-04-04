const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://rohitdrake:mLab003#@ds031193.mlab.com:31193/todoapp" || 'mongodb://localhost:27017/Users');

module.exports = {mongoose};
