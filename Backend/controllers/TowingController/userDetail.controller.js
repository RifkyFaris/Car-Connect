const UserDetail =require( '../../models/TowingModel/userDetail.model.js');


exports.getUserDetail = async (req,res) =>{
    try{
        const userDetails = await UserDetail.find();
        res.status(200).json({success:true , data:userDetails});
    } catch (error) {
        console.log("error in fetching products:" ,error.message);
        res.status(500).json({success:false , message : "Server Error"});
    }
}

exports.createUserDetail = async (req,res) => {
    const userDetail = req.body;

    if (!userDetail.name ||!userDetail.contactNumber || !userDetail.vehicleModel || !userDetail.vehicleYear || !userDetail.pickupLocation || !userDetail.dropLocation){
        return res.status(400).json ({message: "Please fill all fields"});
    }

    const newUserDetail = new UserDetail(userDetail);

    try{
        await newUserDetail.save();
        res.status(201).json({success:true , data : newUserDetail})
    } catch (error) {
        console.error("Error in create user detail",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }

}