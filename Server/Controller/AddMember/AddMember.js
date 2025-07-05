import getUserByToken from "../../helper/getUserByToken/getUserByToken.js";
import group_model from "../../Models/GroupModel/GroupMode.js";
import usermodel from "../../Models/UsersModel/UsersModel.js";


const Add_Member = async(req, res) =>{

    const token = req.cookies.token;
    try {
        const {Group_id,member} = req.body
        if(member.length < 0 || !Group_id){
            res.status(402).json({
                message:"Invalid request"
            })
        }
        const user = await getUserByToken(token)
        const validMembers = await usermodel.find({_id: member}).select('-password')
        if(!validMembers){
            res.status(403).json({
                message:"Invalid member"
            });
        }
        const Add_Member_in_Group = await group_model.findByIdAndUpdate({_id:Group_id},{$push: {member: member}},{$set: {lastUpdate:user._id }}
            ,{new: true});
       res.status(200).json({message:"new member added successfully", data: Add_Member_in_Group});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
export default Add_Member;