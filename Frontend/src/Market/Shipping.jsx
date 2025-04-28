import React from 'react'
import '../Profile/Login.css'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingInfo } from "./slice/cartSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const validateShipping = (shippingInfo, navigate) => {
   
  if(!shippingInfo.address) {
          toast.error('Please fill the shipping information')
          navigate('/shipping')
  }
} 

export default function Shipping(){
  const { shippingInfo = { address: "", city: "", phoneNo: ""} } = useSelector(state => state.cartState);
  const [address,setAddress] =useState(shippingInfo.address)
    const [city,setCity] =useState(shippingInfo.city)
    const [phoneNo,setPhoneNo] =useState(shippingInfo.phoneNo)
    const [postalCode,setPostalCode] =useState(shippingInfo.postalCode)
    const [country,setCountry] =useState(shippingInfo.country)
    const [district,setDistrict] =useState(shippingInfo.state)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingInfo({address,city,phoneNo,postalCode,country,district}))
        navigate('/order/confirm')
    }
  
    return (
    <div className="container1">
       <div className='register'>
      
      <p className="login-title">Shipping Info</p>
            
            <div className="form-div">
  
              <form onSubmit={submitHandler}>
                <label className="label" htmlFor="address">Address</label><br/>
                <input type="text" id='address' value={address} required onChange={(e)=>setAddress(e.target.value)} placeholder="Enter Address"/><br/><br/>
                
                <label className="label" htmlFor="city">City</label><br/>
                <input type="tel" id='city' value={city} onChange={(e)=>setCity(e.target.value)} required placeholder="Enter City"/><br/><br/>

                <label className="label" htmlFor="city">Postal Code</label><br/>
                <input type="number" id='postalcode' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required placeholder="Enter Postal code"/><br/><br/>

                <label className="label"  htmlFor="phone">District</label><br/>
                <input type="text" id="district" value={district}  onChange={(e)=>setDistrict(e.target.value)} required placeholder="Enter District"/>
                
                <br/><br/>

                <label className="label"  htmlFor="phone">Country</label><br/>
                <input type="text" id="country" value={country}  onChange={(e)=>setCountry(e.target.value)} required placeholder="Enter Country"/>
                
                <br/><br/>
                <label className="label"  htmlFor="phone">Phone</label><br/>
                <input type="tel" id="district" value={phoneNo}  onChange={(e)=>setPhoneNo(e.target.value)} required placeholder="Enter Phone Number"/>
                
                <br/><br/>
                <input type="submit" id="pay_btn" className="submit" value="Continue"/>
                
            
              </form>
              
            </div>
    </div>
    </div>
   
  )
}

