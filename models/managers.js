var crypto = require('crypto');

var mongoose = require('../libs/mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
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
schema.plugin(autoIncrement.plugin, 'Managers');

module.exports = mongoose.model('Managers', schema);
