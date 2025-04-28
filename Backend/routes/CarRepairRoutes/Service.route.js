const express=require('express');
const router = express.Router();
const { createService, deleteService, getServices, updateService } =require('../../controllers/CarRepairController/serviceController.js');




router.route('/api/service').get(getServices);  
router.route('/api/create/service').post(createService);
router.route('/api/delete/service/:id').delete(deleteService); 
router.route('/api/update/service/:id').put(updateService);



module.exports=router