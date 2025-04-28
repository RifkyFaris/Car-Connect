import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import Home from './components/Home.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Login from './Profile/Login.jsx'
import UserRegister from './Profile/UserRegister.jsx'
import SupplierRegister from './Profile/SupplierRegister.jsx'
import './App.css'
import { ToastContainer } from 'react-toastify'



import Shop from './Market/Shop.jsx'
import { loadUser } from './Profile/actions/userActions.jsx'
import React,{useEffect,useState} from 'react'
import store from './store.jsx'
import AddProduct from './Market/NewProduct.jsx'
import ProtectedRoute from './route/protectedRoute.jsx'
import ProductDetail from './Market/ProductDetail.jsx'
import Cart from './Market/cart.jsx'
import Shipping from './Market/Shipping.jsx'
import ConfirmOrder from './Market/ConfirmOrder.jsx'
import Payment from './Market/payment.jsx'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderSuccess from './Market/OrderSuccess.jsx'
import SupplierDashboard from './Market/SupplierDashboard.jsx'
import AdminDAshboard from './Market/AdminDashboard.jsx'
import AdminProductList from './Market/AdminProductList.jsx'
import UpdateProduct from './Market/UpdateProduct.jsx'
import ProducSearch from './Market/ProducSearch.jsx'
import SupplierProductList from './Market/SupplierProductList.jsx'
import SparePartsOrders from './Market/SparePartsOrders.jsx'
import SupplierSparePartsOrders from './Market/SupplierSparePartsOrders.jsx'
import OrderDetail from './Market/OrderDetail.jsx'
import UserOrders from './Market/UserOrders.jsx'
import AdminUpdateOrder from './Market/AdminUpdateOrder.jsx'
import Profile from './Profile/Profile.jsx'
import UpdateProfile from './Profile/UpdateProfile.jsx'
import UpdatePassword from './Profile/UpdatePassword.jsx'
import ForgotPassword from './Profile/ForgotPassword.jsx'
import ResetPassword from './Profile/ResetPassword.jsx'
import UserList from './Profile/UserList.jsx'


import ViewServices from './CarRepair/pages/viewServices.jsx'
import ContactUs from './CarRepair/pages/ContactUs.jsx'
import ManageBookings from './CarRepair/pages/ManageBookings.jsx'
import CreatePage from './CarRepair/pages/CreatePage.jsx'
import AboutUs from './CarRepair/pages/AboutUs.jsx'
import MechanicDash from './CarRepair/pages/MechanicDash'
import UserDash from './CarRepair/pages/UserDash'
import Operations from './CarRepair/components/Operations'
import UpdateService from './CarRepair/pages/UpdateService'
import Booking from './CarRepair/pages/booking'
import UpdateBooking from './CarRepair/pages/UpdateBooking'
import CheckoutForm from './CarRepair/pages/CheckoutForm.jsx'
import Return from './CarRepair/pages/Return'
import SuccessPAge from './CarRepair/pages/Success'


import HomePage from './Towing/pages/HomePage.jsx'
import CreateTowing from './Towing/pages/CreatePage.jsx'
import UserTowingHome from './Towing/pages/UserTowingHome.jsx'
import UserTowingForm from './Towing/pages/UserTowingForm.jsx'

import axios from 'axios'

function App() {
  const [stripeApiKey,setStripeApiKey]=useState("")
  useEffect(()=>{
    
    store.dispatch(loadUser)
    async function getStripeApiKey(){
      const {data}=await axios.get(`/api/stripeapi`)
      
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])

  return (
    <Router>
      <HelmetProvider>
        <Header/>
        <ToastContainer />
        
        
        <Routes>
          {/* CarRepair routes */}
          
          <Route path="/view/service" element={<ProtectedRoute ><ViewServices/></ProtectedRoute>}/>
          <Route path="/manage/booking" element={<ProtectedRoute><ManageBookings/></ProtectedRoute>} />
        <Route path="/update/service" element={<ProtectedRoute><UpdateService /></ProtectedRoute>} />
        <Route path="/user/dash" element={<ProtectedRoute><UserDash /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
        <Route path='/about/us' element={<AboutUs/>} />
        <Route path='/operations' element={<ProtectedRoute><Operations/></ProtectedRoute>} />
        <Route path="/create/page" element={<ProtectedRoute><CreatePage/></ProtectedRoute>} />
        <Route path="/contact/us" element={<ContactUs/>} />
        <Route path="/mech/dash" element={<ProtectedRoute><MechanicDash /></ProtectedRoute>} />
        <Route path="/update/booking" element={<ProtectedRoute><UpdateBooking /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutForm /></ProtectedRoute>} />
         <Route path="/return" element={<ProtectedRoute><CheckoutForm /><Return /></ProtectedRoute>} />
         <Route path="/success" element={<ProtectedRoute><CheckoutForm /><SuccessPAge /></ProtectedRoute>} />

        
          
        </Routes>
        

        <Routes>
          {/* CarWash routes */}
        </Routes>

        <Routes>
          {/* Market routes */}
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/order/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
          <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
          <Route path="/new/product" element={<ProtectedRoute isSupplier={true}><AddProduct/></ProtectedRoute>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/shipping" element={<ProtectedRoute ><Shipping/></ProtectedRoute>}/>
          {stripeApiKey &&<Route path="/payment" element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute>}/>}
          <Route path="/supplier/dashboard" element={<ProtectedRoute><SupplierDashboard/></ProtectedRoute>}/>
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDAshboard/></ProtectedRoute>}/>
          <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><AdminProductList/></ProtectedRoute> } />
          <Route path='/supplier/product/:id' element={<ProtectedRoute isSupplier={true}><UpdateProduct/></ProtectedRoute> } />
          <Route path="/search/:keyword" element={<ProducSearch/>}/>
          <Route path='/supplier/products' element={<ProtectedRoute isSupplier={true}><SupplierProductList/></ProtectedRoute> } />
          <Route path='/spareparts/orders' element={<ProtectedRoute isAdmin={true}><SparePartsOrders/></ProtectedRoute> } />
          <Route path='/supplier/spareparts/orders' element={<ProtectedRoute isSupplier={true}><SupplierSparePartsOrders/></ProtectedRoute> } />
          
          <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute> } />
          <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute> } />
          <Route path='/admin/update/order/:id' element={<ProtectedRoute isAdmin={true}><AdminUpdateOrder/></ProtectedRoute> } />
          

        </Routes>

        <Routes>
          {/* Profile routes */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/update/profile" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
          <Route path="/myprofile" element={<Profile/>}/>
          <Route path="/user/register" element={<UserRegister/>}/>
          <Route path="/supplier/register" element={<SupplierRegister/>}/>
          <Route path="/update/password" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
          <Route path="/forgot/password" element={<ForgotPassword/>}/>
          <Route path="/password/reset/:token" element={<ResetPassword/>}/>
          <Route path='/admin/user/list' element={<ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } />
        </Routes>

        <Routes>
          {/* Towing routes */}
          <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
          <Route path="/ct" element={<ProtectedRoute><CreateTowing/></ProtectedRoute>}/>
          <Route path="/utf/:id" element={<ProtectedRoute><UserTowingForm/></ProtectedRoute>}/>
          <Route path="/uth" element={<ProtectedRoute><UserTowingHome/></ProtectedRoute>}/>
        </Routes>
        <Footer />
      </HelmetProvider>
    </Router>
  )
}

export default App
