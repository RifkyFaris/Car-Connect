import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { useBookingStore } from '../store/booking';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../components/Navbar'

const UpdateBooking = () => {

  const handleUpdate = async()=>{
    try {
      await UpdateBooking(newBooking._id, newBooking);
      toast.success("Booking updated successfully! 🎉"); 
      navigate('/manage/booking')
    } catch (error) {
      toast.error("Failed to update booking. Try again! ❌");
      console.error("Failed to update booking", error);
    }
    
  }


  const handleChange = (e) => {
    setNewBooking({...newBooking, [e.target.name]: e.target.value});
   };

   const {UpdateBooking} =useBookingStore();
     
   const location = useLocation();
   const navigate = useNavigate();

   const [newBooking, setNewBooking] = useState(location.state?.booking || {});
  

   const formatDateForInput = (date) => {
    if (!date || isNaN(Date.parse(date))) {
      return ''; 
    }
    return new Date(date).toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'
  };
  
  

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
      <h1 style={style.heading}>Update Booking</h1>
      <div style={style.formContainer}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
          <input style={style.inputField} placeholder='Service Name' name='name' value={newBooking.service} onChange={handleChange} readOnly  />
          <input style={style.inputField} placeholder='Shop Name' name='vendor' value={newBooking.vendor} onChange={handleChange} readOnly />
          <input style={style.inputField} placeholder='Location' name='location' value={newBooking.location} onChange={handleChange} />
          <input style={style.inputField} placeholder='Date' name='date' value={formatDateForInput(newBooking.date)} onChange={handleChange} type='date' />
          <input style={style.inputField} placeholder='Time' name='time' value={newBooking.time} onChange={handleChange} type='time' />

          <input style={style.inputField} placeholder='Service Cost' name='price' value={newBooking.price} onChange={handleChange} type='number' readOnly />
          <button style={style.button} onClick={handleUpdate}>UPDATE</button>
        </div>
      </div>
    </div></div>
  );
  
}

export default UpdateBooking