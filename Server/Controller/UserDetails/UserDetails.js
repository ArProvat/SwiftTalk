import getUserByToken from '../../helper/getUserByToken/getUserByToken.js';
import UsersModel from '../../Models/UsersModel/UsersModel.js';

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
export default UserDetails;