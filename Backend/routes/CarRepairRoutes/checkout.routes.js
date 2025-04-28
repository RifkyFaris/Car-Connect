// checkout.routes.js
const express =require('express');
const { createCheckoutSession, getSessionStatus } =require('../../controllers/CarRepairController/checkout.controller');


const router = express.Router();



router.route('/api/create/checkout/session').post(createCheckoutSession);
router.route('/api/checkout/session/status').get(getSessionStatus); 

module.exports=router