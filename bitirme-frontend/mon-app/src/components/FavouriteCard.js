import React from 'react'
import "../styles/FavouriteCard.css"
import { useNavigate } from "react-router-dom";

function FavouriteCard(props) {
  const navigate = useNavigate();
  function go(id, place_name) {
    console.log(id)
    
    
        navigate('/destination/details/category/place',
          {
            state: {
              data: props.data,
              city_data: props.city_data,
              category: props.category,
              src: '/cities_img/',
              place_name: place_name,
             /* link: "/destination",
              link_name: "destination",*/
              idx: id,
              address: props.address
            }
          }
        )
      }
  return (
    <div className='favourites'>
      {props.list.map(element => {
        var src = '/places/' + element["places.img_name"] + '.' + element["places.img"]
        return (
          <div className='favourite-item'>
            <img className="img" src={src} />
            <div className='top-image'>
              <div className='name'>{"city name: " + element["places.Destination.city_name"]}</div>
              <div className='Category'>{"category: " + element["places.category"]}</div>
              <div className='name'>{"place name: " + element["places.place_name"]}</div>

            </div>


          </div>
        )
      })
      }
    </div>
  )
}

export default FavouriteCard
