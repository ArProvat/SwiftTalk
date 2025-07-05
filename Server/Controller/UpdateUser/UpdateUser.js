import getUserByToken from "../../helper/getUserByToken/getUserByToken.js";
import UsersModel from "../../Models/UsersModel/UsersModel.js";

const UpdateUse=async(req,res)=>{
    const token = req.cookies.token;

    const user = await getUserByToken(token)

    const {name,photoUrl}= req.body;
    const Update= await UsersModel.updateOne({_id:user._id},{
        name,
        photoUrl
    })

    const UpdatedUser = await UsersModel.findOne(Update._id);
    res.status(201).json({
        message: 'Updated user',
        data: UpdatedUser
    })
}
export default UpdateUse