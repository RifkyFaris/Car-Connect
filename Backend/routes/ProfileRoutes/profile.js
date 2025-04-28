const express=require('express');
const {registerUser,
    loginUser,
    logoutUser,
    registerSupplier,
    getUserProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword
    ,deleteUser,
    updateUser,
    getUser,
    getAllUsers
    
}=require('../../controllers/ProfileController/profileController.js')
const router=express.Router();
const {isAuthenticatedUser,authorizeRoles}=require('../../middlewares/ProfileMiddlewares/authenticate.js')

router.route('/api/register').post(registerUser);
router.route('/api/register/supplier').post(registerSupplier);
router.route('/api/login').post(loginUser);
router.route('/api/logout').get(logoutUser);
router.route('/api/myprofile').get(isAuthenticatedUser,getUserProfile);
router.route('/api/update').put(isAuthenticatedUser,updateProfile);
router.route('/api/password/change').put(isAuthenticatedUser,changePassword);
router.route('/api/password/forgot').post(forgotPassword);
router.route('/api/password/reset/:token').post(resetPassword);

router.route('/api/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);
router.route('/api/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUser);
router.route('/api/admin/user/update/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateUser);
router.route('/api/admin/user/delete/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser);

module.exports=router;