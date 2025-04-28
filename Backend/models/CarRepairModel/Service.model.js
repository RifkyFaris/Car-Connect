
const mongoose=require("mongoose");




const servicesSchema =  mongoose.Schema({
    name: { type: String, required: true },
    vendor:{type: String, required: true},
    location: { type: String, required: true },
    distance: { type: Number, required: true },
    price: { type: Number, required: true },
    type:{ type: String, required: true },
    rating:{ type: Number, required: true },

},{
    timestamps: true,
});

let Service = mongoose.model("Service", servicesSchema);
module.exports=Service;