
const mongoose=require('mongoose');

const userDetailSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
    contactNumber:{
        type:Number,
        required:true
    },
     vehicleModel:{
        type:String,
        required:true
    }, 
    vehicleYear:{
        type:String,
        required:true
    }, 
    pickupLocation:{
        type:String,
        required:true
    }, 
    dropLocation:{
        type:String,
        required:true
    }, 
},{
    timestamps:true
});

let UserDetail = mongoose.model ('UserDetail',userDetailSchema);

module.exports=UserDetail;
