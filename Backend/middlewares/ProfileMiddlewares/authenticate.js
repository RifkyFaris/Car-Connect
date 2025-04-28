const jwt=require("jsonwebtoken");
const User=require("../../models/ProfileModel/userModel.js");
exports.isAuthenticatedUser=async(req,res,next)=>{
    const {token}= req.cookies;
    if(!token){
       return res.status(401).json({
            success:false,
            message:"Login"
        })
    }
   const decoded=jwt.verify(token,process.env.JWT_SECRET);
   req.user=await User.findById(decoded.id);
   next();
}

exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                success:false,
                message:`Not authorized`
            })
            
        }
        next()
    }
}

