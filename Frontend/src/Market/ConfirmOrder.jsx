import '../Profile/Login.css'
import {  useEffect } from "react"
import {  useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {validateShipping} from './Shipping.jsx'
const ConfirmOrder = () => {
    const navigate=useNavigate()
    const {shippingInfo,items:cartItems}=useSelector(state=>state.cartState)
    const {user}=useSelector(state=>state.authState)
    const itemsPrice=cartItems.reduce((acc,item)=>(acc+item.price*item.quantity),0)
    const shippingPrice=itemsPrice>200?0:25
    const totalPrice=itemsPrice+shippingPrice
    const processPayment=()=>{
        const data={
            itemsPrice,
            shippingPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data))
        navigate('/payment')
    }
    useEffect(()=>{
        validateShipping(shippingInfo, navigate)
    },[shippingInfo,navigate])

  return (
    <div className='container1'>
      
      <div className="cartItem">
            <div className="cartitems">
                
                <p className="yourcart" >Shipping Info </p>
                
                <p className="shippingdetails" style={{ color: '#f8f8f6' }}>Name: <b>{user.name}</b></p>
                
                <p className="shippingdetails" style={{ color: '#f8f8f6', margin: '10px 0' }}>Address: <b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.district}</b></p>
                
                <p className="shippingdetails" style={{ color: '#f8f8f6' }}>Phone Number: <b>{shippingInfo.phoneNo}</b></p><br/>

                <p className="yourcart" >Your Cart: </p>
                {cartItems.map(item=>(
                <div className="carthr">
                    <hr/>

                <div className="cartdisplayitem">
                    
                    <img src={item.image} className="cartitemimage"/>
                    <p className="cartdisplayname">{item.name}</p>
                    <p className="cartdisplayprice">{item.quantity} x Rs. {item.price} = <b>Rs. {item.quantity*item.price}</b></p>
                    
                    
                </div>
            </div>
                ))}
           
            </div>
            <div className="ordersummary">
                <p className="orderSummarytitle">Order Summary</p>
                <hr/>
                <p className="noofitems">Subtotal: <b>Rs. {itemsPrice}</b></p>
                
                <p className="noofitems">Shipping: <b>Rs. {shippingPrice}</b></p>
                <br/>
                <hr/>
                <p className="noofitems">Total: <b>Rs. {shippingPrice+itemsPrice}</b></p>
                <p className="cartbutton" onClick={processPayment}>Proceed to pay</p>
            </div>
            
          
        </div>
      
    </div>
  )
}

export default ConfirmOrder
