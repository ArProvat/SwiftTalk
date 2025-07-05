import UsersModel from '../../Models/UsersModel/UsersModel.js';
import pkg from 'bcryptjs';
const { compare } = pkg;
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

const CheckAuth = async (req, res) => {
    try {
        const { email, password } = req.body;

        const User = await UsersModel.findOne({ email })
        if (!User) {
            return res.status(404).json({
                message: "User not found please sign up",
                error: true
            })
        }
        const verifiedPassword = await compare(password, User.password);
        if (!verifiedPassword) {
            return res.status(404).json({
                message: " check your password ",
                error: true
            })
        }
        const payload ={
            id: User._id,
            email: User.email
        }
        const token = await sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
       
        const cookieOptions ={
            httpOnly :true,
            secure:true,
        }
        return res.cookie("token",token,cookieOptions).status(200).json({
            message: 'Login successful',
            token: token,
            success: true
        })
    } catch (error) {
        res.status(403).json({
            message: error || error.message,
            error: true
        })
    }
}

export default CheckAuth;