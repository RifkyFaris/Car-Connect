import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { updatePassword,clearAuthError } from "./actions/userActions"
import './Login.css'

const UpdatePassword = () => {
    const [password,setPassword]=useState("")
    const [oldPassword,setOldPassword]=useState("")
    const dispatch=useDispatch()
    const {isUpdated,error}=useSelector(state=>state.authState)
    const submitHandler=(e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append('oldPassword',oldPassword)
        formData.append('password',password)
        dispatch(updatePassword(formData))

    }
    useEffect(()=>{
        if(isUpdated){
                    toast.success("Password updated Successfully")
                    setOldPassword("")
                setPassword("")
                return
                }
                
        if(error){
            toast(error,{
                type:'error',
                onOpen:()=>{dispatch(clearAuthError)}
            })
                                    
            return
        }
    },[isUpdated,error,dispatch])
  return (
    <div className="container1">
      <div className="login">
          <p className="login-title">Update Password</p>
          
          <div className="form-div">

            <form onSubmit={submitHandler}>
              <label className="label" for="oldpassword">Old Password</label><br/>
              <input 
              type="password" 
              id='oldpassword'
              value={oldPassword}
              onChange={e=>setOldPassword(e.target.value)}
              required
              placeholder="Enter Old Password"/>

                <br/><br/>
              <label className="label"  for="newpassword">New Password</label><br/>
              <input 
              type="password" 
              id="newpassword" 
              required placeholder="Enter New Password"
              value={password}
              onChange={e=>setPassword(e.target.value)}/>
              <br/><br/>
              <input type="submit" className="submit" value="Update Password"/> 
          
            </form>
            
          </div>
        </div>
    </div>
  )
}

export default UpdatePassword
