import React,{Fragment,useEffect,useState} from 'react'
import './Login.css'
import '../components/header.css'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {register,clearAuthError} from './actions/userActions.jsx'
import {toast} from 'react-toastify'
import MetaData from '../components/MetaData'

const UserRegister = () => {
  const [userData,setUserData]=useState({
    name:"",
    phoneNo:"",
    password:"",
    email:""

  })
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {error,isAuthenticated}=useSelector(state=>state.authState)
  const onChange=(e)=>{
    
    setUserData({...userData,[e.target.name]:e.target.value})
  }
  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^07\d{8}$/;
    return phonePattern.test(phoneNumber);
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    if (!validatePhoneNumber(userData.phoneNo)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (userData.password.length < 10  ) {
          toast.error('Password must be at least 10 characters long.');
          return;
        }
    if (userData.password !== userData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    const data = {
      name: userData.name,
      phoneNo: userData.phoneNo,
      password: userData.password,
      email:userData.email
    };
  
    dispatch(register(data));
  }
  useEffect(()=>{
    if(isAuthenticated){
      navigate("/")
      return
    }
    if(error){
      toast(error,{
        type:'error',
        onOpen:()=>{dispatch(clearAuthError)}
      })
      return
    }
    
  },[error,isAuthenticated,dispatch,navigate])

  return (
    <Fragment>
      <MetaData title={'User Register'}/>
    <div className='container1'>
      
      <div className="register">
        <p className="login-title">Register</p>
        
        <div className="form-div">

          <form onSubmit={submitHandler} encType='multipart/form-data'>
              <label className="label" htmlFor="name">Name</label><br/>
            <input type="text" id='name' name='name' onChange={onChange} required placeholder="Enter Name"/><br/><br/>
            
            <label className="label" htmlFor="phone">Phone</label><br/>
            <input type="tel" id='phone' name='phoneNo' onChange={onChange} required placeholder="077 111 2255"/><br/><br/>
            <label className="label"  htmlFor="email">Email</label><br/>
            <input type="email" name='email' onChange={onChange} id="email" required placeholder="hello@gmail.com"/>
            <br/><br/>
            <label className="label"  htmlFor="password">Password</label><br/>
            <input type="password" name='password' onChange={onChange} id="password" required placeholder="Enter Password"/><br/><br/>
            <label className="label"  htmlFor="confirmPassword">Confirm Password</label><br/>
            <input type="password" name='confirmPassword' onChange={onChange} id="confirmPassword" required placeholder="Confirm Password"/>
            <br/><br/>
            
            <input type="submit" className="submit"  value="Register"/>
            
        <Link to="/login"><p className="forgot">Have an account ?</p></Link>
        
          </form>
          
        </div>
      </div>
    
    </div>
    </Fragment>
  )
}

export default UserRegister
