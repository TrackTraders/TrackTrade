const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    googleId: {
        type: String,
        require: true,
        index:true,
        unique:true,
        sparse:true
   
      },
    facebookId: String
})

userSchema.plugin(PLM);
userSchema.plugin(findOrCreate);

module.exports = model('User', userSchema);
