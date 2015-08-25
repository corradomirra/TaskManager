var crypto = require('crypto');
var projects = require('./projects');
var tasks = require('./tasks');
console.log(projects);


var mongoose = require('../libs/mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;

var schema = new Schema();
schema.add({
    username: {
        type: String,
        require: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    projects:[projects]
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password){
        this._plainPassword = password;
        this.salt=Math.random()+'';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function(){return this._plainPassword});

schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};
schema.plugin(autoIncrement.plugin, 'Developers');

module.exports = mongoose.model('Developers', schema);
