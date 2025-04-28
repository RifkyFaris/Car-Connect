import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { MDBDataTable} from 'mdbreact';
import { FaEye } from "react-icons/fa";
import {userOrders as userOrdersAction} from '../Market/actions/orderActions'
import '../Profile/Login.css'

import { Link } from "react-router-dom"

const userOrders = () => {
    const { userOrders = []}  = useSelector(state => state.orderState)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userOrdersAction)
    },[])

    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'Order ID',
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

        userOrders.forEach( userOrder => {
            data.rows.push({
                id: userOrder._id,
                noOfItems: userOrder.orderItems.length,
                amount : `$${userOrder.totalPrice}`,
                status: <p style={{color: userOrder.orderStatus.includes('Processing') ? 'red' : 'green'}}>{userOrder.orderStatus}</p> ,
                actions: (
                <Link className='edit' style={{paddingTop:'15px'}} to={`/order/${userOrder._id}`}  >
                    <FaEye  size="1.3em" />
                </Link>
                )
            })
        })

        return data;
    }

    


  return (
    <div className='container1'>
        <div className="register">
        <Fragment>
                 
                    <MDBDataTable
                        data={setOrders()}
                        bordered
                        striped
                        hover
                        className='table'
                        
                        
                        
                    />
                
            </Fragment>
        </div>
       
      
    </div>
  )
}

export default userOrders
