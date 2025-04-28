import React, { useState } from 'react';
import { useServiceStore } from '../store/service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { color } from 'framer-motion';



const CreatePage = () => {

  const navigate = useNavigate();

  const [newService, setNewService] = useState({
    name: '',
    vendor: '',   
    location: '', 
    distance: '',
    type: '',     
    rating: '',
    price: ''
  });

  const handleChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const { createService } = useServiceStore();

  const addService = async () => {   
    const { success, message } = await createService(newService);
    if(success){
        toast.success("Service created successfully! 🎉"); 
        navigate('/Operations')
    }else{
      toast.error("Failed to update booking. Try again! ❌");
            console.error("Failed to update booking", error);
    }

    setNewService({ name: '', vendor: '', location: '', distance: '', type: '', rating: '', price: '' });
  };

  // Defining styles using the const style = {}
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
      <h1 style={style.heading}>Create New Service</h1>
      <div style={style.formContainer}>
        <div style={style.inputGroup}>
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            value={newService.name}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="text"
            name="vendor"
            placeholder="Shop Name"
            value={newService.vendor}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newService.location}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="number"
            name="distance"
            placeholder="Distance"
            value={newService.distance}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="text"
            name="type"
            placeholder="Service-Type"
            value={newService.type}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="number"
            name="rating"
            placeholder="Service Rating"
            value={newService.rating}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <div style={style.inputGroup}>
          <input
            type="number"
            name="price"
            placeholder="Service Cost"
            value={newService.price}
            onChange={handleChange}
            style={style.inputField}
          />
        </div>

        <button style={style.button} onClick={addService}>ADD SERVICE</button>
      </div>
    </div></div>
  );
};

export default CreatePage;