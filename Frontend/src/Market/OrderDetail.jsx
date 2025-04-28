import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import {orderDetail as orderDetailAction} from './actions/orderActions'

const OrderDetail = () => {

    const { orderDetail, loading } = useSelector(state => state.orderState)
    const { shippingInfo={}, user={}, orderStatus="Processing", orderItems=[], totalPrice=0, paymentInfo={} } = orderDetail;
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true: false;
    const dispatch = useDispatch();
    const {id } = useParams();

    useEffect(() => {
        dispatch(orderDetailAction(id))
    },[id])
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
            
            
          
        </div>
      
    </div>
        </Fragment>
        }
      
    </div>
  )
}

export default OrderDetail
