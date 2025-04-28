import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { useServiceStore } from '../store/service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { color } from 'framer-motion';
import Nav from '../components/Navbar'

const UpdateService = () => {

  const handleUpdate = async()=>{
     try {
          await UpdateService(newService._id, newService);
          toast.success("Service updated successfully! 🎉"); 
          navigate('/manage/booking')
        } catch (error) {
          toast.error("Failed to update Service. Try again! ❌");
          console.error("Failed to update booking", error);
        }
  }
    
  const handleChange = (e) => {
    setNewService({...newService, [e.target.name]: e.target.value});
   };

   const {UpdateService} =useServiceStore();
     
   const location = useLocation();
   const navigate = useNavigate();

   const [newService, setNewService] = useState(location.state?.service || {});
  
   const style = {
    container: {
      maxWidth: '480px',
      margin: '0 auto',
      padding: '20px',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: '20px',
    },
    formContainer: {
      padding: '20px',
      backgroundColor:'#27272a',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
      marginBottom: '12px',
    },
    inputField: {
      width: '418px',
      padding: '10px',
      margin: '5px 0',
      borderRadius: '4px',
      backgroundColor:'#27272a',
      color:'white'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'white',
      color: 'black',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
    },
  };

  
  return (
    <div className="">
    <div style={style.container}>
      <h1 style={style.heading}>Update Service</h1>
      <div style={style.formContainer}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input style={style.inputField} placeholder='Service Name' name='name' value={newService.name} onChange={handleChange} />
          <input style={style.inputField} placeholder='Shop Name' name='vendor' value={newService.vendor} onChange={handleChange} />
          <input style={style.inputField} placeholder='Location' name='location' value={newService.location} onChange={handleChange} />
          <input style={style.inputField} placeholder='Distance' name='distance' value={newService.distance} onChange={handleChange} type='number' />
          <input style={style.inputField} placeholder='Service-Type' name='type' value={newService.type} onChange={handleChange} />
          <input style={style.inputField} placeholder='Service Rating' name='rating' value={newService.rating} onChange={handleChange} type='number' />
          <input style={style.inputField} placeholder='Service Cost' name='price' value={newService.price} onChange={handleChange} type='number' />
          <button style={style.button} onClick={handleUpdate}>UPDATE</button>
        </div>
      </div>
    </div></div>
  );
  
}

export default UpdateService