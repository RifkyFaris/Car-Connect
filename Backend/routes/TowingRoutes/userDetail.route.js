const express =require('express');
const { createUserDetail, getUserDetail } =require('../../controllers/TowingController/userDetail.controller');


const router = express.Router();

router.get("/api/getuserdetail" ,getUserDetail);
router.post ("/api/createuserdetail" ,createUserDetail );

module.exports=router