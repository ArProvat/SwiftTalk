import jsonwebtoken from 'jsonwebtoken';
const {verify} =jsonwebtoken
import UsersModel from '../../Models/UsersModel/UsersModel.js';

const getUserByToken=async(token)=>{
if(!token){
    return {
        message:"session out",
        logout: true
    }
}
const info = await verify(token,process.env.SECRET_KEY);

const user = await UsersModel.findById(info.id).select('-password')
return user;
}
export default getUserByToken;