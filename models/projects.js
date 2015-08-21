var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

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
    tasks:{
        type:Array,
        required:true,
        default:[]
    },
    developers:{
        type:Array,
        required:true,
        default:[]
    }
});



schema.plugin(autoIncrement.plugin, 'Projects');

module.exports = mongoose.model('Projects', schema);
