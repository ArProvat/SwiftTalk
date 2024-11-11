const logout = (req,res)=>{
    const option = {
        http:true,
        secure:true
    }
    res.cookie('token','',option).status(200).json({
        message:'logout successful'
    })
}
module.exports= logout