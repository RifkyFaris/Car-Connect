import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
const Home = () => {
  return (
    <div className='container1'>
      
      <div className="hero" id="hero">
        <div className="text">
          <p className="we">
            Drive with <br /> <span className="ai">Confidence, </span> 
            Shine with <br /> <span className="ai">Excellence.</span> 
          </p>
          <br />
          <p className="collaborate">
            Unmatched care for peak performance and lasting shine.
          </p>
          <br />

          <Link to="/user/register"><p className="schedule">Register Now</p></Link>
        </div>
        <img
          className="video"
          src="/MarketImages/car.avif"
          
        />
      </div>
      
      <br/>
      <div className="hero" id="hero">
        <div className="car_logo">
          <img className="carLogo" src="/MarketImages/tesla.png" alt=""/>
          <img className="audilogo" src="/MarketImages/audi.png" alt=""/>
          <img className="carLogo" src="/MarketImages/toyota.png" alt=""/>
          <img className="carLogo" src="/MarketImages/suzuki.png" alt=""/>
          <img className="isuzulogo" src="/MarketImages/isuzu.png" alt=""/>
          <img className="carLogo" src="/MarketImages/benz.png" alt=""/>
          <img className="carLogo" src="/MarketImages/mahindra.png" alt=""/>
          <img className="kialogo" src="/MarketImages/kia.png" alt=""/>
        </div>
        
      </div>
      
      <br/>
      <div className="hero1" >
        <h1 className="what" id="services">Our Services</h1>
        <div className="row">
          <div className="col1_service"> 
            <Link className="service_list" to="/shop">
            <span className="no">01</span><br/>
            Spare Parts<br/>
            <p className="quote">
              
              Your Digital Bridge to Quality Spare Parts.
            </p></Link>
          </div>
          <div className="col1_service">
            <Link className="service_list" to="/">
            <span className="no">02</span> <br/>
            Car Wash <br/>
            <p className="quote">
              
              Where Every Wash Feels Like New.
              </p></Link>
            
          </div>
          <div className="col1_service">
            <Link className="service_list" to="/user/dash">
            <span className="no">03</span> <br/>
            Car Repair <br/>
            <p className="quote">
              
              Precision Repairs for Peak Performance.
          
              </p></Link>
            </div>
        </div>
        <div className="row1">
          <div className="col1_service"> 
            <Link className="service_list" to="/home">
            <span className="no">04</span><br/>
            Towing <br/>
            <p className="quote">
              
              Your Roadside Rescue Team.
            </p></Link>
           
          </div>
          <div className="col1_service">
            <Link className="service_list" to="/user/dash">
            <span className="no">05</span> <br/>
           Engine Repair <br/>
           <p className="quote">
              
            Engine Trouble? We’ve Got the Fix.
          </p></Link>
           
          </div>
          <div className="col1_service">
            <Link className="service_list" to="/user/dash">
            <span className="no">06</span> <br/>
            Electrical Repair <br/>
            <p className="quote">
              
              Keeping Currents Flowing, Miles Going.
            </p></Link>
            
          </div>
        </div>
        
      </div>
      <br/>
      <div className="hero">
        
      <div class="hero1" style={{display:"flex",width:"100%",paddingLeft:"200px"}}>
        <img src="/MarketImages/spare.jpg" alt="" style={{width:"400px",borderRadius:"6px"}}/>
        <div className="regseller" style={{marginLeft:"70px",marginTop:"20px"}}>
        <p style={{textAlign:"center",marginTop:"20px",fontSize:"18px"}}>Are you a spare parts seller looking to expand your reach? Partner with CarConnect and 
          get your products in front of thousands of potential customers! Our platform makes it easy to list and 
          manage your products while offering support to help you succeed.</p>
        
        <Link to="/supplier/register"><p class="schedule1">Become a seller.</p></Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home
