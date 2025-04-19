import React, { useState } from 'react'
import './Wishlist.css'
import { useEffect } from 'react'
import WishlistItem from './WishlistItem'

const Wishlist = () => {
  const [wishlist,setWishlist] = useState([])

  useEffect(()=>{
      getWishlist()
  },[])

  const getWishlist=async()=>{
    try{
      
      const response = await fetch(`http://localhost:5000/wishlist/list/${localStorage.getItem('studentUid')}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        },
      
      })

      const wishlist = await response.json()
      if(!response.ok)
        return console.log("Error loading events")
      
      setWishlist(wishlist.wishlist.eventIds)
      console.log(wishlist.wishlist.eventIds)


    }catch(e)
    {
      console.log('Error fetching wishlist: ',e)
      return
    }
  }

  return (
    <div className='wishlist common-blurbg'>
      {
        wishlist.map((item)=>(
          <WishlistItem item={item}/>
        ))
      }
    </div>
  )
}

export default Wishlist
