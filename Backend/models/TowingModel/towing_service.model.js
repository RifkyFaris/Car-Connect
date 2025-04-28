const mongoose =require('mongoose');

const towing_serviceSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
}, {
    timestamps:true //createdat, Updateat
});

let Towing_service = mongoose.model('Towing_service',towing_serviceSchema);

module.exports=Towing_service;