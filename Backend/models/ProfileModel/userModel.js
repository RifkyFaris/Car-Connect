const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const crypto=require("crypto");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phoneNo:{
        type: String,
        required: true,
        unique: true,
        validate: [validator.isMobilePhone, 'Please enter valid mobile number']
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    email:{
        type: String,
        required: [true, 'Please enter email'],
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    role:{
        type:String,
        default:'user',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
})


userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);  // Hash the password before saving
})

userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_TIME})
}

userSchema.methods.isValidPassword=async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}
userSchema.methods.getResetToken= function (){
    const token=crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex');
    this.resetPasswordTokenExpire=Date.now()+30*60*1000;
    return token
}

let model=mongoose.model('User',userSchema);
module.exports=model;