
import React, { useState, useRef, useEffect } from 'react'
import { FaStar } from "react-icons/fa";

import axios from 'axios';
import Popup from './Popup';
import { Link } from 'react-router-dom';



const AddComment = ({ placeId }) => {

  const [currentValue, setCurrentValue] = useState(0);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const textAreaRef = useRef();
  const [commentvalue, setCommentValue] = useState("");
  const [confirm, setconfirm] = useState(false);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }




  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

  };
  const useAutosizeTextArea = (
    textAreaRef,
    value
  ) => {
    useEffect(() => {
      if (textAreaRef) {
        // We need to reset the height momentarily to get the correct scrollHeight for the textarea
        textAreaRef.style.height = "0px";
        const scrollHeight = textAreaRef.scrollHeight;

        // We then set the height directly, outside of the render loop
        // Trying to set this with state or a ref will product an incorrect value.
        textAreaRef.style.height = scrollHeight + "px";
      }
    }, [textAreaRef, value]);
  };

  useAutosizeTextArea(textAreaRef.current, commentvalue);

  const sendata = () => {
    const islogin = window.localStorage.getItem('islogin');
    if (islogin == "success") {

      axios.post("http://localhost:3001/comment", {
        stars_rate: currentValue,
        comment: commentvalue,
        userId: window.localStorage.getItem('userId'),
        placeId: placeId
      }).then(res => {
        console.log(res.data)
        if (res.data === "success") {
          setconfirm(false)
          setTimeout(function () {
            window.location.reload();
          }, 2000);

        } else if (res.data === "fail") {
          setconfirm(true)

        }
      }
      )
    } else {
      console.log("you need to login first")

      setShow1(true)
    }
  }
  return (
    <div className='rStar'>
      <div className='Addcomments' >
        <div className='stars'>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}

                color={(currentValue) > index ? colors.orange : colors.grey}
                style={{
                  marginRight: 10,
                  cursor: "pointer"
                }}
              />
            )
          })}
        </div>
        <textarea placeholder="leave comment here" className='textarea' onChange={e => setCommentValue(e.target.value)}
          ref={textAreaRef}
          row={1}
          value={commentvalue} />
        {confirm ? <div className='text1'> Do not use these words change your comment</div> : <div></div>}
        {show1 ? <div className='text1'>You need to login first
          <Link to="/login" className='link'>Go to login page</Link> </div> : <div></div>}
        <button className='button2' onClick={sendata}>add comment</button>

      </div>
      {/*<div className='searchStars'>
        <StarRatings
        starDimension="30px"
          rating={rateSearch}
          starRatedColor='#F9AB21'
          changeRating={changeRating}
          numberOfStars={5}
          name='rating'
        />
</div>*/}

    </div>
  )
}

export default AddComment
