const mongoose = require('mongoose')


const UsersSchema = new mongoose.Schema({
   name: {
      type: 'string',
      required: true,
   },
   email: {
      type: 'string',
      required: true,
      unique: true
   },
   password: {
      type: 'string',
      required: true,
   },
   photoUrl: {
      type: 'string',
      default: ''
   }

}, {
   timestamps: true
});

const userModel = mongoose.model('User', UsersSchema)

module.exports = userModel;