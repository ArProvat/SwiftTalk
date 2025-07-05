import { Schema, model } from 'mongoose';


const UsersSchema = new Schema({
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

const userModel = model('User', UsersSchema)

export default userModel;