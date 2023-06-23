import React from 'react'
import "../styles/OpeningHours.css"

function OpeningHours(props) {
    console.log(props.list)
    return (
       
        <div className='opening_hours'>

       <div className='title1'> opening hours:</div>
            {props.list.map(element => {
                return (
                    <div >
                    <div className='season'>  {element.season}</div>
                    <div className='days'> {element.days +":"+element.opening_hour+"-"+ element.close_hour}</div>
          
                  
                   
                    
                   
                    </div>
                    )
            })
            }
        </div>
    )
}

export default OpeningHours
