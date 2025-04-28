const Towing_service = require("../../models/TowingModel/towing_service.model.js");
const mongoose =require("mongoose");

exports.getTowing_services = async (req,res) => {
    try{
        const towing_service = await Towing_service.find({});
        res.status(200).json({success:true,data:towing_service})
    } catch (error){
        console.log("error in fetching products:",error.message);
        res.status(500).json({ success : false, message: "Server Error" });
    }
}

exports.createTowing_service = async (req,res) => {
    const towing_service = req.body ; //user will send this data

    if(!towing_service.name||!towing_service.description||!towing_service.price){
        return res.status(400).json({success:false,message :"Please provide all fields"});
    }

    const newTowing_service = new Towing_service(towing_service)

    try{
        await newTowing_service.save();
        res.status(201).json({success:true,data:newTowing_service})
    }catch(error){
        console.error("Error in create product:",error.message);
        res.status(500).json({success:false,message:"Server error"}); //Internal server error
    }

}

exports.updateTowing_service =  async (req,res) => {
    const {id} = req.params;

    const towing_service = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid Product ID"});
    }

    try{
        const UpdatedTowing_service = await Towing_service.findByIdAndUpdate(id, towing_service,{ new:true });
        res.status(200).json({success:true,data:UpdatedTowing_service});
    } catch (error){
        res.status(500).json({success:false,message:"Server Error"});
    }
}

exports.deleteTowing_service = async (req,res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid Product ID"});
    }

    try{
        await Towing_service.findByIdAndDelete(id);
        res.status(200).json({success : true , message : "product deleted"});
    }catch (error) {
        res.status(500).json({success: false, message:"Server Error"});
    }
}