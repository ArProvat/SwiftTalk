import getUserByToken from "../../helper/getUserByToken/getUserByToken.js";
import Group_model from "../../Models/GroupModel/GroupMode.js";
import UsersModel from "../../Models/UsersModel/UsersModel.js";


const Create_Group = async (req, res) => {

    const token = req.cookies.token;
  try {
    const { Group_name, members, Group_photo } = req.body;
    if (!members || !Group_name) {
        res.status(403).json({
            message: "Invalid fields for create group"
        })
    }
    const validMembers = await UsersModel.findById({ _id: { $in: members } });

    if (validMembers.length != members.length) {
        res.status(403).json({ message: "members are invalid" });
    }

    const user = await getUserByToken(token);
    if (!user) {
        res.status(404).json({ message: "User not found" });
    }
    const group = new Group_model({
        Group_name: Group_name,
        members: members,
        admin: user._id,
        Group_photo: group.photo
    })
 const result = await group.save();
res.status(200).json({
    message:" grouped crate successfully",
    data: result,
    success: true,
})
  } catch (error) {
res.status(404).json({message: error.message, data: error.data});
  }
}
export default Create_Group;