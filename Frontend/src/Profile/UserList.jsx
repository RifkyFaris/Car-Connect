import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {deleteUser,getUsers} from './actions/userActions'
import { clearError,clearUserDeleted } from './slice/userSlice';
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import '../Profile/Login.css'
import { IoTrashBin } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import {Link} from 'react-router-dom'


export default function UserList() {
    const { users = [], loading = true, error, isUserDeleted }  = useSelector(state => state.authState)
    const dispatch = useDispatch();
    
    const setUsers = () => {
        const data = {
            columns : [
                
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'PhoneNo',
                    field: 'phoneNo',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
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
        users.forEach( user => {
            data.rows.push({
                name: user.name,
                phoneNo:user.phoneNo,
                email : user.email,
                role: user.role ,
                actions: (
                    <Fragment>
                        <div className="tablefrag">
                            <Link className='edit' to={`/supplier/product/${user._id}`} ><FaPen size="1.3em"/> </Link>
                            <p className="deleteProduct" onClick={e => deleteHandler(e, user._id)} >
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
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        if(error) {
            toast.error(error, {
                
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isUserDeleted) {
            toast.success('User Deleted Succesfully!',{
                
                onOpen: () => dispatch(clearUserDeleted())
            })
            return;
        }

        dispatch(getUsers)
    },[dispatch, error, isUserDeleted])


  return (
    <div className='container1'>
        <div className="register">
        <Fragment>
                {loading ? <></> : 
                    <MDBDataTable
                        data={setUsers()}
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
