
import '../Profile/Login.css'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import {getSupplierProducts} from './actions/productActions'

const SupplierDashboard = () => {
  const { products = [] } = useSelector( state => state.productState);
  const dispatch = useDispatch();
  
 useEffect( () => {
  dispatch(getSupplierProducts);
 
}, [])
  return (
    <div className='container1'>
      <div className="hero1" >
        <h1 className="what" id="services">Dashboard</h1>
        <div className="row">
          <div className="col1_service"> 
            <Link className="service_list" to="/new/product">
            <span className="no">New Product</span><br/>
            
            <p className="quote">
              
             Add New product.
            </p></Link>
          </div>
          <div className="col1_service">
            <Link className="service_list" to="/supplier/products">
            <span className="no"> Products </span> <br/>
           
            <p className="quote">
              
              {products.length} Products
              </p></Link>
            
          </div>
          <div className="col1_service">
            <Link className="service_list" to="/supplier/spareparts/orders">
            <span className="no">Orders</span> <br/>
             
            <p className="quote">
              
              10 orders
          
              </p></Link>
            </div>
        </div>
        
          
          
        
        
      </div>
    </div>
  )
}

export default SupplierDashboard
