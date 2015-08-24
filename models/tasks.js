var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    comments = require('./comments');

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
    status:{
        type: Boolean,
        required:true,
        default:false
    },
    comments:[comments.schema ]
});


schema.plugin(autoIncrement.plugin, 'Tasks');

module.exports = mongoose.model('Tasks', schema);

