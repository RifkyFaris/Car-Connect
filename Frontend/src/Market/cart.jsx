import { IoTrashBin } from "react-icons/io5";
import { Fragment } from "react"
import {useSelector,useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import '../Profile/Login.css'

import { decreaseCartItemQty,increaseCartItemQty,removeItemFromCart } from "./slice/cartSlice.jsx"

export default function cart(){
  const {items}=useSelector(state=>state.cartState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const increaseQty = (item) => {
        const count=item.quantity
        if(item.stock==0 || count>=item.stock)return
        dispatch(increaseCartItemQty(item.product))
    };
    
    const decreaseQty = (item) => {
        const count=item.quantity
        if(count==1)return
        dispatch(decreaseCartItemQty(item.product))
    };
    const checkOutHandler=()=>{
        navigate('/login?redirect=shipping')
    }


  return (
    <div className='container1'>
      
<div className="cartItem">
    <div className="cartitems">
        <p className="yourcart" >Your Cart: <b>{items.length==0?<>Your Cart is empty</>:<>{items.length} items</>}</b></p>
        <div className="carthr">
        {items.map(item=>(
                    <Fragment key={item.name}>
                        <hr />

        <div className="cartdisplayitem">
            
            <img src={item.image} alt="" className="cartitemimage"/>
            <p className="cartdisplayname">{item.name}</p>
            <p className="cartdisplayprice">Rs.{item.price}</p>
            <div className="icons">
              <div className="addtocartitem">
                <p className="minus" onClick={()=>dispatch(decreaseQty(item))}>-</p>
                <input className="qty" type="number" value={item.quantity} readOnly/>
                <p className="plus" onClick={()=>increaseQty(item)}>+</p>
              </div>
              
              <p className="delete" onClick={()=>dispatch(removeItemFromCart(item.product))}><IoTrashBin 
              size="0.6em"/></p>
            </div>
        </div>
        </Fragment>
    
  
        ))}
        </div>

   
    </div>
    <div className="ordersummary">
        <p className="orderSummarytitle">Order Summary</p>
        <hr/>
        <p className="noofitems">No of Items: <b>{items.length}</b></p>
        
        <p className="noofitems">Total: <b>Rs.{items.reduce((acc,item)=>(acc+item.quantity*item.price),0)}</b></p>
        <a href="#"><p className="cartbutton" onClick={checkOutHandler}>Checkout</p></a>
    </div>
    
  
</div>
    

    </div>
  )
}

