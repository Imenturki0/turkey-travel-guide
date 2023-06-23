import React from 'react'
import "../styles/CommentBox.css"
import Rating from "./Rating"
import { FaStar } from "react-icons/fa";

function CommentBox({ list }) {
    const stars = Array(5).fill(0)
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
    
      };
    return (
        <div className='commentBox'>
            {
                list.map((element) => {
                    return (
                        <div className='comment-element'>
                           
                            <div className='userName'>{element["User.username"]}</div>
                            <div className='comment-inner'>
                            <div className='date'>{element["date"]}</div>
                             <div className='stars'>
                            {/*stars.map((_, index) => {
                              return (
                                <FaStar
                                  key={index}
                                  size={15}
                                  
                  
                                  color={(element.star_rating) > index ? colors.orange : colors.grey}
                                  style={{
                                    marginRight: 8,
                                    cursor: "pointer",
                                   
                                  }}
                                />
                              )
                            })*/}
                          </div>
                          <Rating star_rating={element.star_rating}/>
                            <div className='commenttext'>
                                {element.comment_text}
                            </div>
                           
                            </div>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default CommentBox
