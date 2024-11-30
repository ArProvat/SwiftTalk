const getUserByToken = require('../../helper/getUserByToken/getUserByToken');
const users = require('../../Models/UsersModel/UsersModel')

const UserDetails=async(req,res)=>{
  try {
    const token = req.cookies.token;
   
     const result = await getUserByToken(token);

     res.json({
        result: result
     })
    
  } catch (error) {
    res.status(404).json({message: error.message,error:true});
  }  

    
}
module.exports = UserDetails;