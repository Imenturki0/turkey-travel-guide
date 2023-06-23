
import React, { useState, useEffect } from "react";
import axios from 'axios'
import FavouriteCard from "../components/FavouriteCard"
function Favourite() {
  const [list, setlist] = useState([])
  useEffect(() => {
    axios.post("http://localhost:3001/favouriteList",
      {
        userId: window.localStorage.getItem('userId')
      }
    ).then((res) => {
      if (res.data) {

        setlist(res.data)
      }
    })
  }, [])
 


  return (
    <div className="favourite">
    {list.length==0?<div className="text">no place exist in favourite list</div>:<div></div>}
      <FavouriteCard list={list} />
    </div>
  )
}

export default Favourite
