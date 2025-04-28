import React from 'react'
import './header.css'
import { FaFacebook,FaWhatsapp,FaLocationDot  } from "react-icons/fa6";
import { IoMail,IoCall,IoLocate  } from "react-icons/io5";
const Footer = () => {
  return (
    <div className="footerContainer">
    <div className="footer">
      <div className="col1">
        <img src="/MarketImages/carconnect.png" className="footerLogo"/>
        <p className="meezan">Car Connect offers top-notch vehicle service solutions, ensuring your car stays in peak condition. From routine maintenance to advanced diagnostics, Car Connect delivers reliable, efficient, and affordable services. Trust Car Connect for expert care, quality parts, and exceptional customer support every time.</p>
           <div className="socials">
            <FaFacebook  
                        color={'#f8f8f6'}
                        size="1.4em"
                        style={{marginRight:"10px",cursor:"pointer",marginTop:"20px",padding:"6px",borderRadius:"50px"}}
                        
                        
                    />
                    <FaWhatsapp  
                        color={'#f8f8f6'}
                        size="1.4em"
                        style={{marginRight:"10px",cursor:"pointer",marginTop:"20px",padding:"6px",borderRadius:"50px"}}
                        
                        
                    />
                    <IoMail  
                        color={'#f8f8f6'}
                        size="1.4em"
                        style={{marginRight:"10px",cursor:"pointer",marginTop:"20px",padding:"6px",borderRadius:"50px"}}
                        
                        
                    />
                    <IoCall   
                        color={'#f8f8f6'}
                        size="1.4em"
                        style={{marginRight:"10px",cursor:"pointer",marginTop:"20px",padding:"6px",borderRadius:"50px"}}
                        
                        
                    />
                    <FaLocationDot  
                        color={'#f8f8f6'}
                        size="1.4em"
                        style={{marginRight:"10px",cursor:"pointer",marginTop:"20px",padding:"6px",borderRadius:"50px"}}
                        
                        
                    />
            <ion-icon className="footerSocial" name="logo-facebook"></ion-icon>
           <ion-icon className="footerSocial" name="logo-whatsapp"></ion-icon>
           <ion-icon className="footerSocial" name="mail"></ion-icon>
           <ion-icon className="footerSocial" name="call"></ion-icon>
           <ion-icon className="footerSocial" name="location"></ion-icon>
           </div>
           
      </div>
      <div className="col2">
        <div className="col21">
          <a className="footer_text" href="index.html"><p className="footerLink">Home</p></a>
          <a className="footer_text" href="#"><p className="footerLink">Shop</p></a>
          <a className="footer_text" href="#"><p className="footerLink">Products</p></a>
          <a className="footer_text" href="#"><p className="footerLink">Delivery Areas</p></a>
          <a className="footer_text" href="#"><p className="footerLink">FAQ</p></a>
        </div>
        <div className="col22">
          <a className="footer_text" href="#"><p className="footerLink">Help</p></a>
          <a className="footer_text" href="#"><p className="footerLink">Support</p></a>
          <a className="footer_text" href="#"><p className="footerLink">Privacy Policy</p></a>
          <a className="footer_text" href="#"><p className="footerLink">Refud Policy</p></a>
          <a className="footer_text" href="#"><p className="footerLink">Terms & Conditions</p></a>
        </div>
      </div>
      <div className="col3">
        <h3 className="accepted">ACCEPTED PAYMENT METHODS</h3>
        <div className="paymentImages">
          <img src="/MarketImages/american.png" className="paymentlogo"/>
          
          <img src="/MarketImages/visa.png" className="paymentlogo"/>
          
          <img src="/MarketImages/mastercard.png" className="paymentlogo"/>
          
          <img src="/MarketImages/cod.png" className="paymentlogo"/>
          
          <img src="/MarketImages/transfer.png" className="paymentlogo"/>
        </div>
        <p className="meezan">We ensure secure online payments through trusted gateways. 
          All transactions are encrypted, ensuring your payment details are safe and secure.</p>
      </div>
    </div>
    
    <p className="copyright">© Copyright 2024, All Rights Reserved by CarConnect.lk</p>
  </div>
  
    
  

  )
}

export default Footer
