const getUserByToken = require("../../helper/getUserByToken/getUserByToken");
const User = require("../../Models/UsersModel/UsersModel");

const UpdateUse=async(req,res)=>{
    const token = req.cookies.token;

    const user = await getUserByToken(token)

    const {name,photoUrl}= req.body;
    const Update= await User.updateOne({_id:user._id},{
        name,
        photoUrl
    })

    const UpdatedUser = await User.findOne(Update._id);
    res.status(201).json({
        message: 'Updated user',
        data: UpdatedUser
    })
}
module.exports =UpdateUse