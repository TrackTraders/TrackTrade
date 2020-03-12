const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, required: false}
})

userSchema.plugin(PLM);
userSchema.plugin(findOrCreate);

module.exports = model('User', userSchema);
