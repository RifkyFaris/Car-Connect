
const mongoose = require("mongoose");


const bookingSchema =  mongoose.Schema({
    service: { type: String, required: true },
    vendor:{type: String, required: true},
    price: { type: Number, required: true },
    customer: { type: String, required: true },
    contact:{type:Number, required: true},
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    email:{type:String, required:true},

},{
    timestamps: true,
});



let Booking = mongoose.model("Booking", bookingSchema);
module.exports=Booking;