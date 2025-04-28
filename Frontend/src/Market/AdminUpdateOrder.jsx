import { Fragment, useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams,useNavigate } from 'react-router-dom';
import {orderDetail as orderDetailAction,updateOrder} from './actions/orderActions'
import { toast } from 'react-toastify';
import { clearOrderUpdated,clearError } from './slice/orderSlice';
import { Link } from 'react-router-dom';

const AdminUpdateOrder = () => {

    const { loading, isOrderUpdated, error, orderDetail } = useSelector( state => state.orderState)
    const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {}} = orderDetail;
    const isPaid = paymentInfo.status === 'succeeded'? true: false;
    const [orderStatus, setOrderStatus] = useState("Processing");
    const { id:orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        const orderData = {};
        orderData.orderStatus = orderStatus;
        dispatch(updateOrder(orderId, orderData))
    }
    useEffect(() => {
        if(isOrderUpdated) {
            toast.success('Order Updated Succesfully!',{
                
                onOpen: () => dispatch(clearOrderUpdated())
            })
           
            return;
        }

        if(error)  {
            toast.error(error, {
                
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }

        dispatch(orderDetailAction(orderId))
    }, [isOrderUpdated, error, dispatch])
    useEffect(() => {
        if(orderDetail._id) {
            setOrderStatus(orderDetail.orderStatus);
        }
    },[orderDetail])
  return (
    <div>
        {loading?<></>:
        <Fragment>
            <div className='container1'>
            
      
      <div className="cartItem">
      
            <div className="cartitems">
            <p className="yourcart" style={{ fontSize:"30px" }} >Order # {orderDetail._id} </p>
                
                <p className="yourcart" >Shipping Info </p>
                
                <p className="shippingdetails" style={{ color: '#f8f8f6',fontSize:"20px" }}>Name: <b>{user.name}</b></p>
                
                <p className="shippingdetails" style={{ color: '#f8f8f6', margin: '10px 0',fontSize:"20px" }}>Address: <b>{shippingInfo.address}, {shippingInfo.city}</b></p>
                
                <p className="shippingdetails" style={{ color: '#f8f8f6' ,fontSize:"20px"}}>Phone Number: <b>{shippingInfo.phoneNo}</b></p><br/>
                <p className="shippingdetails" style={{ color: '#f8f8f6',fontSize:"20px" }}>Amount: <b>Rs. {totalPrice}</b></p><br/>

                <p className="shippingdetails" style={{ color: '#f8f8f6',fontSize:"20px" }}>Payment: <b>{isPaid ? 'PAID' : 'NOT PAID' }</b></p><br/>
                <p className="shippingdetails" style={{ color: '#f8f8f6',fontSize:"20px" }}>Order Status: <b>{orderStatus}</b></p><br/>

                <p className="yourcart" >Order Items: </p>
                {orderItems.map(item=>(
                <div className="carthr">
                    <hr/>

                <div className="cartdisplayitem">
                    
                    <img src={item.image} className="cartitemimage"/>
                    <p className="cartdisplayname">{item.name}</p>
                    <p className="cartdisplayprice">{item.quantity} Pieces  x Rs. {item.price} = <b>Rs. {item.quantity*item.price}</b></p>
                    
                    
                </div>
            </div>
                ))}
           
            </div>
            <div className="ordersummary">
                <p className="orderSummarytitle">Update order</p>
                
                <hr/><br />
                <select 
                                className="input"
                                onChange={e => setOrderStatus(e.target.value)}
                                value={orderStatus}
                                name="status"
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                <p className="cartbutton" onClick={submitHandler}>Update status</p>
            </div>
            
            
          
        </div>
        
      
    </div>
    
        </Fragment>
        }
      
    </div>
  )
}

export default AdminUpdateOrder
