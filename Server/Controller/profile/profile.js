import getUserByToken from "../../helper/getUserByToken/getUserByToken.js"

const profile = async(req,res)=>{
        const token = req.cookies.token

        const user = getUserByToken(token)
}