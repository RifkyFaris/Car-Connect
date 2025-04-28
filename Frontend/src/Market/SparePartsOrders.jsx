import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import '../Profile/Login.css'
import { IoTrashBin } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom"
import { deleteOrder, adminOrders as adminOrdersAction } from "./actions/orderActions"
import { clearError, clearOrderDeleted } from "./slice/orderSlice"
const SparePartsOrders = () => {
    const { adminOrders = [], loading = true, error, isOrderDeleted }  = useSelector(state => state.orderState)

    const dispatch = useDispatch();

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'noOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
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

        adminOrders.forEach( order => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount : `$${order.totalPrice}`,
                status: <p style={{color: order.orderStatus.includes('Processing') ? 'red' : 'green'}}>{order.orderStatus}</p> ,
                actions: (
                    <Fragment >
                        <div className="tablefrag">
                        <Link className='edit' to={`/admin/update/order/${order._id}`} ><FaPen size="1.3em"/> </Link>
                        <p className="deleteProduct" onClick={e => deleteHandler(e, order._id)} >
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
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if(error) {
            toast.error(error, {
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isOrderDeleted) {
            toast.success('Order Deleted Succesfully!',{
                
                onOpen: () => dispatch(clearOrderDeleted())
            })
            return;
        }

        dispatch(adminOrdersAction)
    },[dispatch, error, isOrderDeleted])
  return (
    <div className='container1'>
        <div className="register">
        <Fragment>
                {loading ? <></> : 
                    <MDBDataTable
                        data={setOrders()}
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

export default SparePartsOrders
