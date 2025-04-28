import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {deleteProduct,getAdminProducts} from './actions/productActions'
import {clearError} from './slice/productsSlice'
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import { clearProductDeleted } from './slice/productSlice'
import '../Profile/Login.css'
import { IoTrashBin } from "react-icons/io5";

export default function AdminProductList() {
    const { products = [], loading = true, error }  = useSelector(state => state.productState)
    const { isProductDeleted, error:productError }  = useSelector(state => state.productState)
    const dispatch = useDispatch();
    
    const setProducts = () => {
        const data = {
            columns : [
                
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }
        products.forEach( product => {
            data.rows.push({
                
                name: product.name,
                price : `Rs. ${product.price}`,
                stock: product.stock,
                user:product.user,
                actions: (
                    <Fragment >
                        <div className="tablefrag">
                        
                        <p className="deleteProduct" onClick={e => deleteHandler(e, product._id)} >
                           <IoTrashBin size="1.3em"/>
                        </p>
                        </div>
                        
                    </Fragment>
                )
            })
        })

        return data;
    }
    
    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if(error || productError) {
            toast.error(error || productError, {
                
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isProductDeleted) {
            toast.success('Product Deleted Succesfully!',{
                
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }

        dispatch(getAdminProducts)
    },[dispatch, error, isProductDeleted])


  return (
    <div className='container1'>
        <div className="register">
        <Fragment>
                {loading ? <></> : 
                    <MDBDataTable
                        data={setProducts()}
                        bordered
                        striped
                        hover
                        className='table'
                        
                        
                        
                    />
                }
            </Fragment>
        </div>
       
      
    </div>
  )
}
