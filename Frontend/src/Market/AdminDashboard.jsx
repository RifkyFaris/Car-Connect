
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import {getAdminProducts} from './actions/productActions'
import { adminOrders as adminOrdersAction } from './actions/orderActions';
import {getUsers} from '../Profile/actions/userActions'
const AdminDAshboard = () => {
  const { products = [] } = useSelector( state => state.productState);
  const { adminOrders = [] } = useSelector( state => state.orderState);
  const { users = [] } = useSelector( state => state.authState);
  const dispatch = useDispatch();
    
  useEffect( () => {
    dispatch(getAdminProducts);
    dispatch(adminOrdersAction);
    dispatch(getUsers);
   
  }, [])
  return (
    <div className='container1'>
      <div className="hero1" >
        <h1 className="what" id="services">Dashboard</h1>
        <div className="row">
          <div className="col1_service"> 
            <Link className="service_list" to="/admin/products">
            <span className="no">Market Place Products</span><br/>
            
            <p className="quote">
              
              {products.length} Products
            </p></Link>
          </div>
          <div className="col1_service">
            <Link className="service_list" to="/admin/user/list">
            <span className="no">Users </span> <br/>
           
            <p className="quote">
              
              {users.length} Users              </p></Link> 
            
          </div>
          <div className="col1_service">
            <Link className="service_list" to="/admin/supplier/list">
            <span className="no">Supplier</span> <br/>
             
            <p className="quote">
              
              10 supplier
          
              </p></Link>
            </div>
        </div>



        <div className="row">
          <div className="col1_service"> 
            <Link className="service_list" to="/spareparts/orders">
            <span className="no">Spareparts Orders</span><br/>
            
            <p className="quote">
              
              {adminOrders.length} Order
            </p></Link>
          </div>
          <div className="col1_service">
            <a className="service_list" href="a.hml">
            <span className="no"> Products </span> <br/>
           
            <p className="quote">
              
              10 products
              </p></a>
            
          </div>
          <div className="col1_service">
            <a className="service_list" href="a.hml">
            <span className="no">Orders</span> <br/>
             
            <p className="quote">
              
              10 orders
          
              </p></a>
            </div>
        </div>
        
          
          
        
        
      </div>
    </div>
  )
}

export default AdminDAshboard
