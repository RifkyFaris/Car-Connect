import React, { Fragment,useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {clearProductCreated} from './slice/productSlice.jsx'
import {createNewProduct} from './actions/productActions.jsx'
import { clearError } from './slice/productsSlice.jsx'
import '../Profile/Login.css'

import {toast} from 'react-toastify'
const NewProduct = () => {
    const [name,setName]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[stock,setStock]=useState("");
    const[images,setImages]=useState([]);
    const[imagesPreview,setImagesPreview]=useState([]);
    const {isProductCreated,error}=useSelector(state=>state.productState)
    const { user } = useSelector(state => state.authState); 
    const categories=[
        'Tyre',
        'Head Light',
        'Engine Oil',
        'Break Oil',
        'Radiator Coolant',
        'Break Pads',
        'Wiper Blades',
        'Fan Belt',
        'Clutch Plate',
        'Rim',
        'Indicator Light',
        'Break Light',
        'Gear Oil',
        'Horn'
    ];
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState == 2 ) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, file])
                }
            }

            reader.readAsDataURL(file)


        })

    }
    const submitHandler=(e)=>{
        e.preventDefault();
        const formData=new FormData()
        formData.append('name',name);
        formData.append('price',price);
        formData.append('category',category);
        formData.append('stock',stock);
        formData.append('user',user?._id);
        images.forEach(image=>{
            formData.append('images',image);
            
        })
        
        dispatch(createNewProduct(formData))
        
    }
    useEffect(()=>{
        if(isProductCreated){
          toast.success('Product Created Succesfully!',{
                  
            onOpen: () => dispatch(clearProductCreated())
        })
        navigate('/')
        return;
        }
        if(error)  {
          toast.error(error, {
              onOpen: ()=> { dispatch(clearError()) }
          })
          return
      }
      },[isProductCreated, error, dispatch])

  return (
    <div className='container1'>
      
<div className="register">
    <p className="login-title">New Product</p>
    
    <div className="form-div">
<Fragment>
      <form onSubmit={submitHandler}>
          <label className="label" htmlFor="name">Name</label><br/>
        <input type="text" onChange={e => setName(e.target.value)} value={name} id='name' required placeholder="Name"/><br/><br/>
        
        <label className="label" htmlFor="price">Price</label><br/>
        <input type="number" id='price' onChange={e => setPrice(e.target.value)} value={price} required placeholder="Price"/><br/><br/>
        <label className="label"  htmlFor="stock">Stock</label><br/>
        <input type="number" id="stock" onChange={e => setStock(e.target.value)} value={stock} required placeholder="Stock"/><br/><br/>
        <label className="label"  htmlFor="category">Select category</label><br/>
        
        <select onChange={e => setCategory(e.target.value)}  className="category-select" name="select" id="category">
        <option value="">Select</option>
            {categories.map( category => (
                <option key={category} value={category}>{category}</option>
            ))}
        </select>

        
        <br/><br/>

        <label className="label"  htmlFor="image">Image</label><br/>
        <input type="file" multiple onChange={onImagesChange} id="image" required placeholder="Upload Image"/>
        
        <br/><br/>
            {imagesPreview.map(image => (
                <img
                    className="mt-3 mr-2"
                    key={image}
                    src={image}
                    alt={`Image Preview`}
                    width="55"
                    height="52"
                />
            ))}
            <br /><br />
        <input type="submit" className="submit" value="Create Product"/>
        
    
      </form>
      </Fragment>
    </div>
    
  </div>

      
    </div>
  )
}

export default NewProduct
