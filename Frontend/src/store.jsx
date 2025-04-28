import {configureStore,combineReducers} from '@reduxjs/toolkit';
import authReducer from './Profile/slice/userSlice'
import productReducer from './Market/slice/productSlice.jsx'
import productsReducer from './Market/slice/productsSlice.jsx'
import cartReducer from './Market/slice/cartSlice.jsx'
import orderReducer from './Market/slice/orderSlice.jsx'

const reducer=combineReducers({
    authState:authReducer,
    productState:productReducer,
    productsState:productsReducer,
    cartState:cartReducer,
    orderState:orderReducer
})
const store=configureStore({
    reducer,
})
export default store;