const express =require("express");
const { createTowing_service, deleteTowing_service, getTowing_services, updateTowing_service } =require("../../controllers/TowingController/towing_service.controller");

const router = express.Router();

router.get("/api/gettowing", getTowing_services);
router.post("/api/createtowing", createTowing_service);
router.put("/api/updatetowing/:id",updateTowing_service);
router.delete ("/api/deletetowing/:id", deleteTowing_service); 

module.exports=router