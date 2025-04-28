import axios from 'axios'
import { newProductFail,
    newProductRequest,
    newProductSuccess,
    productFail,
    productRequest,
    productSuccess,
    adminProductFail,
    adminProductRequest,
    adminProductSuccess,
    deleteProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    updateProductFail,
    updateProductRequest,
    updateProductSuccess,
    supplierProductRequest,
    supplierProductSuccess,
    supplierProductFail

} from "../slice/productSlice.jsx";
import {
    productsRequest,
    productsSuccess,
    productsFail
} from '../slice/productsSlice.jsx'
import { BiLink } from 'react-icons/bi';

//create product
export const createNewProduct=productData=>async(dispatch)=>{
    try {
        dispatch(newProductRequest())
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data }  =  await axios.post(`/api/supplier/product/new`,productData,config);
        dispatch(newProductSuccess(data))
    } catch (error) {
        dispatch(newProductFail(error.response.data.message))
    }
}
//get all products and search
export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) => {

    try {  
        dispatch(productsRequest()) 
        let link = `/api/products?page=${currentPage}`;
        
        if(keyword) {
            link += `&keyword=${keyword}`
        }
        if(price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category) {
            link += `&category=${category}`
        }
        if(rating) {
            link += `&ratings=${rating}`
        }
        
        const { data }  =  await axios.get(link);
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productsFail(error.response.data.message))
    }
    
}
//get product by id
export const getProduct=id=>async(dispatch)=>{
    try {
        dispatch(productRequest())
        const {data} =await axios.get(`/api/product/${id}`)
        dispatch(productSuccess(data))
    } catch (error) {
        dispatch(productFail(error.response?.data?.message || error.message))
    }
}



//admin get all products
export const getAdminProducts  =  async (dispatch) => {

    try {  
        dispatch(adminProductRequest()) 
        const { data }  =  await axios.get(`/api/admin/products`);
        dispatch(adminProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(adminProductFail(error.response.data.message))
    }
    
}


//delete product
export const deleteProduct  = id =>  async (dispatch) => {

    try {  
        dispatch(deleteProductRequest()) 
        await axios.delete(`/api/supplier/product/${id}`);
        dispatch(deleteProductSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteProductFail(error.response.data.message))
    }
    
}


//update product
export const updateProduct  = (id,productData) =>  async (dispatch) => {

    try {  
        dispatch(updateProductRequest()) 
        const { data }  =  await axios.put(`/api/supplier/update/${id}`,productData);
        dispatch(updateProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(updateProductFail(error.response.data.message))
    }
    
}


export const getSupplierProducts  =  async (dispatch) => {

    try {  
        dispatch(supplierProductRequest()) 
        const { data }  =  await axios.get(`/api/supplier/products`);
        dispatch(supplierProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(supplierProductFail(error.response.data.message))
    }
    
}