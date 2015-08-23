var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    tasks = require('./tasks'),
    developers = require('./developers');

var schema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    tasks:[tasks],
    developers:[developers]
});


schema.plugin(autoIncrement.plugin, 'Projects');

module.exports = mongoose.model('Projects', schema);
