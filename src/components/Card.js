import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/Card.css"
import AddCard from "../components/AddCard"
import { FaTrash } from "react-icons/fa";
import Popup from "../components/Popup";




import Axios from 'axios'

function Card(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [id, setİd] = useState();
  const navigate = useNavigate();
  
  function go(id) {
console.log(id)
  console.log("he")
    Axios.post("http://localhost:3001/place", {
      id: id
    }).then((res) => {
      const city_data = props.list.find(element => element.destination_id === id);
     console.log(city_data)
    console.log(res.data.places)
      navigate('/destination/details',
        { state: { data: res.data.places, city_data: city_data ,address:res.data.adress} }
      )
    }) 

  }
  
  function Delete(id) {
  
    Axios.post("http://localhost:3001/delete", {
      id: id
    })
    setButtonPopup(false)
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  }
 
  return (
    <div>

      <div className='card'>

        {

          props.list.map((element) => {
            const { destination_id , img_name, img, city_name } = element;
            var src = '/cities_img/' + img_name 
            /*console.log(src)*/
            return (<div key={destination_id} className='card-inner'>
              <button onClick={() => go(destination_id)} className='button' >

                <div className='Card-item' key={destination_id}>

                  <img src={src} alt='images' />
                  <div className='text'>{city_name}</div>

                </div>

                {/*<i class="fa-sharp fa-solid fa-trash-check"></i>*/}
              </button>
              {window.localStorage.getItem('role') === 'admin' ? <button className='delete-icon' onClick={() => { setİd(destination_id); setButtonPopup(true); }}> <FaTrash /></button> : <div></div>}

            </div>


            )

          })
        }
        {

          window.localStorage.getItem('role') === 'admin' ? <AddCard /> : <div></div>
        }


      </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} id={id} deletefunc={Delete}>
        <h1>Are you sure</h1>
        <p>Do you really want to delete it?</p>
        <div className="buttons">
          <button className="cancel btn" onClick={() => setButtonPopup(false)} >cancel</button>
          <button className="delete btn" onClick={() => Delete(id)}>delete</button>
        </div>
      </Popup>
    </div>)
}

export default Card
