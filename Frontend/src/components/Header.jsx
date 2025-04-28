import React, { useState }  from 'react'
{/*https://react-icons.github.io/react-icons/search/#q=close */}
import { IoMenu  } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../Profile/actions/userActions'
import './header.css'
const Header = () => {
  const {isAuthenticated,user}=useSelector(state=>state.authState)
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        dispatch(logout);
    }
  const [menu,setMenu]=useState(false)
  const toggle=()=>{
      if(!menu){
          setMenu(true)
      }else{
          setMenu(false)
      }
  }

  return (
    <div className='container'>
      <div className="nav">
            
            <Link to="/"><img  className="logo" src="/MarketImages/carconnect.png" alt="logo"/></Link>
            {menu?<IoClose  
            color={'#f8f8f6'}
            size="2.2em"
            style={{marginRight:"20px",cursor:"pointer"}}
            onClick={toggle}
            
        />
            : <IoMenu 
            color={'#f8f8f6'}
            size="2.2em"
            
            style={{marginRight:"20px",cursor:"pointer"}}
            onClick={toggle}
            
        />}
        </div>
        {
            menu?<div id="navmenu" className="navmenu">
            <ul>
             <Link to="/" className="navmenus" onClick={toggle}><li>Home</li></Link>
             
             <Link to="/about/us" className="navmenus" onClick={toggle}><li>About Us</li></Link>
             <Link to="/contact/us" className="navmenus" onClick={toggle}><li>Contact Us</li></Link>
             {isAuthenticated?(
                <>
                
                <Link to="/myprofile" className="navmenus" onClick={toggle}><li onClick={toggle}>My Profile</li></Link>
                <Link to="/orders" className="navmenus" onClick={toggle}><li >My Orders</li></Link>
                {user.role==='admin'?<Link className="navmenus" to="/admin/dashboard" onClick={toggle}><li >Dashboard</li></Link>:<></>}
                {user.role==='supplier'?<Link className="navmenus" to="/supplier/dashboard" onClick={toggle}><li >Dashboard</li></Link>:<></>}
                {user.role==='mechanic'?<Link className="navmenus" to="/mech/dash" onClick={toggle}><li >Dashboard</li></Link>:<></>}
                <Link to="/" className="navmenus" id="logoutButton"  onClick={toggle}><li onClick={logoutHandler} >Logout</li></Link>
                </>
                
  ):(
             <>
             <Link to="/login" className="navmenus" onClick={toggle}><li>Login</li></Link>
             <Link to="/user/register" className="navmenus" onClick={toggle}><li>Register</li></Link>
             </>
             
             
             )}
             
             
   
            </ul>
           </div>:<></>
        }
        </div>
  )
}

export default Header
