import '../Profile/Login.css'
import React,{ Fragment, useEffect, useState } from "react"
import { getProduct } from './actions/productActions'
import { useDispatch,useSelector } from "react-redux";
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from "react-toastify";
import { addCartItem } from './actions/cartActions';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom'

export default function ProductDetail(){
    const {product,loading}=useSelector((state)=>state.productState)
      const {items:cartItems}=useSelector(state=>state.cartState)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const {id}=useParams()
    const [quantity,setQuantity]=useState(1)
    const increaseQty = () => {
        if (product.stock === 0 || quantity >= product.stock) return;
        setQuantity((prevQty) => prevQty + 1);
    };
    
    const decreaseQty = () => {
        if (quantity <= 1) return;
    setQuantity((prevQty) => prevQty - 1);

    };
    useEffect(()=>{
        dispatch(getProduct(id))
    },[id,dispatch])


  return (
    <Fragment>
        {loading ? <></> :<Fragment>
    <div className='container1'>
      <div className="productdetail">
            <div className="image">
              <img src={product?.images?.[0]?.image } className="productDetailImg"/>
            </div>
            <div className="productdetails">
              <p className="pname">{product.name}</p>
             
              <p className="price">{product.price}</p>
              <p className="pricedis">{product.price}</p>
              <div className="addtocart">
                <p className="productminus" onClick={decreaseQty}>-</p>
                <input className="productqty" type="number" onChange={e=>setQuantity(e.target.value)} value={quantity} readOnly/>
                <p className="productplus" onClick={increaseQty}>+</p>
              </div>
              <p disabled={product.stock==0?true:false}  onClick={()=>{dispatch(addCartItem(product._id,quantity))
                    toast.success(`${product.name} added to cart`)
                    navigate('/shop')
                 }} className="cartbutton">Add to Cart</p>
            </div>
          
        </div>
        <Link to="/cart"><div className="cart-button" >
                <FaShoppingCart />
                <span className="cart-count">{cartItems.length}</span>
              </div></Link>
      
    </div> </Fragment>}
    </Fragment>
  )
}
