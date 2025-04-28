import React from 'react'
import '../Profile/Login.css'
import {Link} from 'react-router-dom'
const OrderSuccess = () => {
  return (
    <div className='container1'>
        <div className="register">
        <h2 style={{color:"white",padding:"20px"}}>Your Order has been placed successfully.</h2>
        <Link to="/"><button style={{color:"black",padding:"10px",marginLeft:"20px",cursor:"pointer",borderRadius:"6px"}}>Return to Home</button></Link>
        </div>
      
    </div>
  )
}

export default OrderSuccess
