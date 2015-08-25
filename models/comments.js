var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var schema = new Schema({
    date:{
        type: String,
        require: true
    },
    text:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    }
});



schema.plugin(autoIncrement.plugin, 'Comments');

module.exports = mongoose.model('Comments', schema);

