const express = require('express');
const {processPayment,sendStripeApi,otp,
    verifyyotp}=require('../../controllers/MarketController/paymentController.js')
const {isAuthenticatedUser}=require('../../middlewares/ProfileMiddlewares/authenticate.js')
const router = express.Router();

router.route('/api/payment/process').post(isAuthenticatedUser,processPayment);
router.route('/api/stripeapi').get(isAuthenticatedUser,sendStripeApi);
router.route('/api/send/otp').get(isAuthenticatedUser,otp);
router.route('/api/verify/otp').post(isAuthenticatedUser,verifyyotp);

module.exports = router;