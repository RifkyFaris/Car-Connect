import React from 'react'
import { useEffect, useState } from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import '../Profile/Login.css'
import { IoSearch } from "react-icons/io5";

const Search = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const [keyword,setKeyword]=useState("")
    const searchHandler=(e)=>{
      e.preventDefault()
      navigate(`/search/${keyword}`)
    }
    const clearKeyword=()=>{
      setKeyword("")
    }
    useEffect(()=>{
      if(location.pathname==='/'){
        clearKeyword()
      }
    },[location])


  return (
    <form onSubmit={searchHandler}>
       <div className="search-rifky">
        <div className="search-container-rifky">
          <input className="search-box-rifky" value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} type="text" placeholder="Search Product..." />
          <button className="button-rifky" type="submit">
          <IoSearch  
                        color={'#f8f8f6'}
                        size="1.4em"
                        
                        
                    />
          </button>
          
          
        </div>
        
      </div>
      </form>
    
  )
}

export default Search
