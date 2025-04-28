import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import {updateProfile,clearAuthError} from '../Profile/actions/userActions'
import { clearUpdateProfile } from "./slice/userSlice"
import { useNavigate } from "react-router-dom"

import './Login.css'

const UpdateProfile = () => {
  const {error,user,isUpdated}=useSelector(state=>state.authState)
    const [name,setName]=useState("")
    const [phoneNo,setPhoneNo]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const submitHandler=(e)=>{
      e.preventDefault()
      const profileData = {};
      profileData.name = name;
      dispatch(updateProfile(profileData))
      
  }
  useEffect(()=>{
    if(user){
        setName(user.name)
        setPhoneNo(user.phoneNo)
        
    }
    
    
    if(isUpdated){
      
        toast.success("Profile updated Successfully",{
            onOpen:()=>dispatch(clearUpdateProfile())
            
            
    })
      navigate('/myprofile')
        return
    }
    if(error){
            toast(error,{
                            type:'error',
                            onOpen:()=>{dispatch(clearAuthError())}
                        })
                        
                        return
        }
},[user,isUpdated,error,dispatch])
  return (
    <div className='container1'>
    <div className="register">
    <p className="login-title">Update Profile</p>
    
    <div className="form-div">

      <form onSubmit={submitHandler}>
          <label className="label" for="name">Name</label><br/>
        <input type="text" 
        id='name' 
        value={name}
        name='name'
        onChange={e=>setName(e.target.value)}
        required 
        /><br/><br/>
        
        <label className="label" for="phone">Phone</label><br/>
        <input type="tel"
        name='phoneNo'
        value={phoneNo}
        onChange={e=>setPhoneNo(e.target.value)} id='phone' readOnly />
        <br/><br/>
        <input type="submit" className="submit" value="Update Profile"/>
        
    
      </form>
      
    </div>
  </div>
  </div>
  )
}

export default UpdateProfile
