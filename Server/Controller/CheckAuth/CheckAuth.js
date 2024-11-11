const users = require('../../Models/UsersModel/UsersModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const CheckAuth = async (req, res) => {
    try {
        const { email, password } = req.body;

        const User = await users.findOne({ email })
        if (!User) {
            return res.status(404).json({
                message: "User not found please sign up",
                error: true
            })
        }
        const verifiedPassword = await bcrypt.compare(password, User.password);
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
        const token = await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: '7d'})
       
        const cookieOptions ={
            http :true,
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

module.exports = CheckAuth;