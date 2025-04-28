import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { MDBDataTable} from 'mdbreact';

import { FaPen } from "react-icons/fa";
import {toast } from 'react-toastify'
import '../Profile/Login.css'
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router-dom"
import { deleteOrder, supplierOrders as supplierOrdersAction } from "./actions/orderActions"
import { clearError, clearOrderDeleted } from "./slice/orderSlice"

const SupplierSparePartsOrders = () => {
  const { supplierOrders = [], loading = true, error, isOrderDeleted }  = useSelector(state => state.orderState)
  
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
  
          supplierOrders.forEach( order => {
              data.rows.push({
                  id: order._id,
                  noOfItems: (
                    <ul style={{ paddingLeft: "20px" }}>
                      {order.orderItems.map((item, idx) => (
                        <li key={idx}>
                          {item.product?.name} — Qty: {item.quantity} — ${item.product?.price}
                        </li>
                      ))}
                    </ul>
                  ),
                  amount : `$${order.totalPrice}`,
                  status: <p style={{color: order.orderStatus.includes('Processing') ? 'red' : 'green'}}>{order.orderStatus}</p> ,
                  actions: (
                      <Fragment >
                          <div className="tablefrag">
                          
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
  
          dispatch(supplierOrdersAction)
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

export default SupplierSparePartsOrders
