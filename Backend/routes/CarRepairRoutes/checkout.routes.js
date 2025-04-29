// checkout.routes.js
const express =require('express');
const { createCheckoutSession, getSessionStatus } =require('../../controllers/CarRepairController/checkout.controller');


const router = express.Router();



router.post('/create/checkout/session', createCheckoutSession);
router.get('/checkout/session/status', getSessionStatus);


module.exports=router