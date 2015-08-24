var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    tasks = require('./tasks'),
    developers = require('./developers');

var schema = new Schema();
schema.add({
    name: {
        type: String,
        unique: true,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    tasks:[tasks.schema],
    developers:[developers.schema]
});


schema.plugin(autoIncrement.plugin, 'Projects');

module.exports = mongoose.model('Projects', schema);
