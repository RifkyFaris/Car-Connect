import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

export default function ProtectedRoute({children,isAdmin,isSupplier}){
    const {isAuthenticated,loading,user}=useSelector(state=>state.authState)
    if(!isAuthenticated && !loading){
        return <Navigate to="/login" />
    }
    if(isAuthenticated){
        if(isAdmin===true && user.role!=='admin'){
            return <Navigate to="/" />
        }
        if (isSupplier === true && user.role !== 'supplier') {
            return <Navigate to="/" />;
        }
        return children;
    }
    
  
    

}