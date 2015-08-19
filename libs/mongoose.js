var mongoose = require('mongoose');
var config = require('../config');
var autoIncrement = require('mongoose-auto-increment');

mongoose.connect(config.get('mongoose:uri'),config.get('mongoose:options'));
autoIncrement.initialize(mongoose.connection);

module.exports = mongoose;
