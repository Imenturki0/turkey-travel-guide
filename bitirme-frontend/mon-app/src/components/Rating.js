import React from 'react'
import { FaStar } from "react-icons/fa";

function Rating({star_rating}) {
    const stars = Array(5).fill(0)
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
    
      };
      
  return (
    
    <div className='stars'>
    {stars.map((_, index) => {
      return (
        <FaStar
          key={index}
          size={15}
          

          color={(star_rating) > index ? colors.orange : colors.grey}
          style={{
            marginRight: 8,
            cursor: "pointer",
           
          }}
        />
      )
    })}
  </div>
   
  )
}

export default Rating
