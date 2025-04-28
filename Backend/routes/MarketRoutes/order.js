const express=require('express');
const router=express.Router();
const {newOrder,
    getSingleOrder,
    getSupplierOrders,
    myOrders,
    orders,
    updateOrder,
    deleteOrder
}=require("../../controllers/MarketController/orderController.js")
const {isAuthenticatedUser,authorizeRoles}=require('../../middlewares/ProfileMiddlewares/authenticate.js')

router.route('/api/order/new').post(isAuthenticatedUser,newOrder);
router.route('/api/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/api/myorder').get(isAuthenticatedUser,myOrders);

router.route('/api/admin/orders').get(isAuthenticatedUser,authorizeRoles('admin'),orders);
router.route('/api/admin/order/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder);

router.route('/api/admin/delete/order/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder);

router.route('/api/supplier/order').get(isAuthenticatedUser,authorizeRoles('supplier'),getSupplierOrders);








module.exports=router