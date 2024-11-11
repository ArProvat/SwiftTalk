const jwt = require('jsonwebtoken')
const users = require('../../Models/UsersModel/UsersModel')

const getUserByToken=async(token)=>{
if(!token){
    return {
        message:"session out",
        logout: true
    }
}
const info = await jwt.verify(token,process.env.SECRET_KEY);

const user = await users.findById(info.id).select('-password')
return user;
}
module.exports =getUserByToken;