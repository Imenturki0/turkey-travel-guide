import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import "../styles/Comments.css"
import AddComment from "./AddComment"
import CommentBox from './CommentBox'
function Comments({ placeId, list}) {
  const [rateSearch, setRateSearch] = useState(0)
  //const [list, setlist] = useState([])

  useEffect(() => {
   /* Axios.post("http://localhost:3001/CommentList", {
      placeId: placeId

    }).then((res) => {
      if (res.data) {
        setlist(res.data)
      }
    })*/
  }, [])

  return (
    <div className='comment'>
      <CommentBox list={list} />

      <AddComment setRateSearch={setRateSearch} rateSearch={rateSearch} placeId={placeId} />

    </div>
  )
}

export default Comments
