import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Category from '../components/Category'
import AddDetail from "../components/AddDetails"

import { Link } from 'react-router-dom';


function Categories_page() {
  const category_items = [
    { src: "/categories/hotels.png", title: "hotels" },
    { src: "/categories/restaurant.png", title: "restaurant" },
    { src: "/categories/shooping.png", title: "shopping" },
    { src: "/categories/naturalPlaces.png", title: "natural places" },
    { src: "/categories/culturalPlaces.png", title: "cultural places" },
    { src: "/categories/ancientCities.png", title: "ancient cities" }

  ]

  const [buttonPopup, setButtonPopup] = useState(false);
  const { state } = useLocation();
  const { data, city_data, address } = state

  const { destination_id,img_name, city_name } = city_data;
console.log(destination_id)
  var src = '/cities_img/' + img_name

  const result = category_items.filter((item1) => {
    return (data.some(item2 => item2.category === item1.title && item2.destination_id===destination_id
      ))


  }); 

console.log(category_items)
console.log(data)
console.log(result)

  return (

    <div className="details">
      <div className='city'>

        <img src={src} alt='images' />
        <div className='city_name'>{city_name}</div>
        <div className='navlink'>
          <Link to='/destination' className="link">destination</Link>
          <div className='symbol'> &nbsp; {" >"} &nbsp;</div>
          <Link to='/destination/details' state={{ data: data, city_data: city_data, address: address }} className="link">{city_name}</Link>
        </div>
      </div>
      {
       
         
          result.map((item, index) => {

          return (

            <Category src={item.src} title={item.title} data={data} city_data={city_data} address={address} />
          )

        })
     
        }
        {window.localStorage.getItem('role') === "admin"? 
        <button className='add btn' onClick={() => setButtonPopup(true)}>Add new place</button>:<div></div>}
     
      <AddDetail buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} id={city_data.destination_id} />

    </div>

  )
}

export default Categories_page
