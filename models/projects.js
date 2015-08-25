var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    tasks = require('./tasks'),
    developers = require('./developers');

var schema = new Schema();
schema.add({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    developers:[developers.schema],
    tasks:[tasks.schema]
});


schema.plugin(autoIncrement.plugin, 'Projects');

module.exports = mongoose.model('Projects', schema);
