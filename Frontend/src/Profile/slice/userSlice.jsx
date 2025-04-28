import {createSlice} from '@reduxjs/toolkit'
const authSlice=createSlice({
    name:'auth',
    initialState:{
        loading:false,
        isAuthenticated:false,
        users: [],
        isUserUpdated: false,
        isUserDeleted: false
    },
    reducers:{
        registerRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        registerSuccess(state, action){
            return {
                ...state,
                loading: false,
                isAuthenticated:true,
                user: action.payload.user
                
            }
        },
        registerFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        loginRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccess(state, action){
            return {
                ...state,
                loading: false,
                isAuthenticated:true,
                user: action.payload.user
                
            }
        },
        loginFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearError(state,action){
            return {
                ...state,
                error:null
            }
        },
        logoutSuccess(state, action){
            return {
                ...state,
                loading: false,
                isAuthenticated:false,
                user:null,
                
            }
        },
        logoutFail(state, action){
            return {
                ...state,
                error:  action.payload
            }
        },
        supplierRegisterRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        supplierRegisterSuccess(state, action){
            return {
                ...state,
                loading: false,
                isAuthenticated:true,
                user: action.payload.user
                
            }
        },
        supplierRegisterFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        loadUserRequest(state, action){
            return {
                ...state,
                isAuthenticated:false,
                loading: true,
            }
        },
        loadUserSuccess(state, action){
            return {
                ...state,
                loading: false,
                isAuthenticated:true,
                user: action.payload.user
                
            }
        },
        loadUserFail(state, action){
            return {
                ...state,
                loading: false,
                
            }
        },
        updateProfileRequest(state, action){
            return {
                ...state,
                loading: true,
                isUpdated:false
            }
        },
        updateProfileSuccess(state, action){
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated:true
                
            }
        },
        updateProfileFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },clearUpdateProfile(state,action){
            return{
                ...state,
                isUpdated:false,
            }
        },
        updatePasswordRequest(state, action){
            return {
                ...state,
                loading: true,
                isUpdated:false
            }
        },
        updatePasswordSuccess(state, action){
            return {
                ...state,
                loading: false,
                isUpdated:true
                
            }
        },
        updatePasswordFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        forgotPasswordRequest(state, action){
            return {
                ...state,
                loading: true,
                message:null
               
            }
        },
        forgotPasswordSuccess(state, action){
            return {
                ...state,
                loading: false,
                message:action.payload.message
                
            }
        },
        forgotPasswordFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        resetPasswordRequest(state, action){
            return {
                ...state,
                loading: true
               
            }
        },
        resetPasswordSuccess(state, action){
            return {
                ...state,
                loading: false,
                isAuthenticated:true,
                user:action.payload.user
                
            }
        },
        resetPasswordFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        usersRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        usersSuccess(state, action){
            return {
                ...state,
                loading: false,
                users: action.payload.users,
            }
        },
        usersFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        deleteUserRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteUserSuccess(state, action){
            return {
                ...state,
                loading: false,
                isUserDeleted : true
            }
        },
        deleteUserFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        updateUserRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        updateUserSuccess(state, action){
            return {
                ...state,
                loading: false,
                isUserUpdated : true
            }
        },
        updateUserFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearUserDeleted(state, action){
            return {
                ...state,
                isUserDeleted : false
            }
        },
        clearUserUpdated(state, action){
            return {
                ...state,
                isUserUpdated : false
            }
        },
        
    }
})
const {actions,reducer}=authSlice;
export const{
    registerRequest,
    registerSuccess,
    registerFail,
    loginFail,
    loginRequest,
    loginSuccess,
    clearError,
    logoutFail,
    logoutSuccess,
    supplierRegisterFail,
    supplierRegisterRequest,
    supplierRegisterSuccess,
    loadUserFail,
    loadUserRequest,
    loadUserSuccess,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    clearUpdateProfile,
    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    forgotPasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    usersFail,
    usersRequest,
    usersSuccess,
    clearUserDeleted,
    clearUserUpdated,
    updateUserFail,
    updateUserRequest,
    updateUserSuccess,
    deleteUserFail,
    deleteUserRequest,
    deleteUserSuccess,

}=actions;
export default reducer;