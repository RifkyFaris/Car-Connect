import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './Login.css'
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from "react-toastify"
import{clearAuthError,resetPassword} from './actions/userActions'


const ResetPassword = () => {
  const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const dispatch=useDispatch()
    const {isAuthenticated,error}=useSelector(state=>state.authState)
    const navigate=useNavigate()
    const {token}=useParams()
    const submitHandler=(e)=>{
            e.preventDefault()
            const formData=new FormData()
            formData.append('password',password)
            formData.append('confirmPassword',confirmPassword)
            
            dispatch(resetPassword(formData,token))
        }
        useEffect(()=>{
            if(isAuthenticated){
                
              toast.success("Password reset success")
                            
                        
              navigate('/')
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
    <div className="container1">
        
        <div className="login">
          <p className="login-title">Reset Password</p>
          
          <div className="form-div">

            <form onSubmit={submitHandler}>
              <label className="label" for="password">Password</label><br/>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} id='password' required placeholder="Enter Password"/><br/><br/>
              <label className="label"  for="cpassword">Confirm Password</label><br/>
              <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} id="cpassword" required placeholder="Confirm Password"/>
              <br/><br/>
              <input type="submit" className="submit" value="Reset Password"/> 
          
            </form>
            
          </div>
        </div>
      
    </div>
  )
}

export default ResetPassword
