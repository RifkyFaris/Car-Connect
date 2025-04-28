import React,{Fragment,useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import MetaData from '../components/MetaData.jsx'
import './Login.css'
import '../components/header.css'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import {login,clearAuthError} from './actions/userActions.jsx'

const Login = () => {
  const [phoneNo,setPhoneNo]=useState("");
  const [password,setPassword]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();
  const redirect=location.search?'/'+location.search.split('=')[1]:'/';
  const {loading,error,isAuthenticated}=useSelector(state=>state.authState)
  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(login(phoneNo,password))
  }
  useEffect(()=>{
    if(isAuthenticated){
      navigate(redirect)
    }
    if(error){
      toast.error(error,{
        onOpen:()=>{dispatch(clearAuthError)}
    })
    return
    }
  },[error,isAuthenticated,dispatch,navigate])

  return (
    <Fragment>
      <MetaData title={'Login'}/>
    <div className='container1'>
      
      <div className="login">
            <p className="login-title">Login</p>
            
            <div className="form-div">
  
              <form onSubmit={submitHandler}>
                <label className="label" htmlFor="phone">Phone</label><br/>
                <input type="tel" id='phone' required placeholder="077 111 2255" onChange={e=>setPhoneNo(e.target.value)} value={phoneNo}/><br/><br/>
                <label className="label"  htmlFor="password">Password</label><br/>
                <input type="password" id="password" required placeholder="Enter Password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <br/><br/>
                <input type="submit" className="submit" value="Login"/>
                
            <Link to="/forgot/password"><p className="forgot">Forgot Password ?</p></Link>
            <Link  to="/user/register"><p className="dont">Don't have an account ?</p></Link>
            
              </form>
              
            </div>
          </div>
      
    </div>
    </Fragment>
  )
}

export default Login
