import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import Axios from "axios"
import axios from "axios";
import Rating from "./Rating";

import "../styles/Categoryplace.css"

function CaetgoryPlace(props) {
    const navigate = useNavigate();
    const [isfavourite, setİsFavourite] = useState([])
    const [data1, setData] = useState([])
    const [Address, setAdress] = useState([])

    useEffect(() => {
      /*  Axios.get("http://localhost:3001/placess").then((res) => {
          
             if (res.data) {
                
                setAdress(res.data.adress)
                const category_list = res.data.places.filter(x => {
                   
                    return x.category.toString() === props.category
                })
                setData(category_list)
                category_list.map((element, index) => {

                    setİsFavourite(names => [...names, !!element.favourite])
                })
            
            }
        })*/
        axios.post("http://localhost:3001/place", {
     
    }).then((res) => {
     setAdress(res.data.adress)
      const category_list = res.data.places.filter(x => x.category.toString() === props.category )
      const favourite1 = res.data.favourite.filter((element, index) => {
        return element['Favourite.User.user_id'] == window.localStorage.getItem("userId") && category_list.some(e => {
          return e.place_id === element.place_id;
        })
      })
      setData(category_list)

      
      var favourite = []
      category_list.map((element, index) => {


        if (favourite1.some(e => { return e.place_id === element.place_id })) {
          favourite.push(true)
        }
        else favourite.push(false)

      })
      setİsFavourite(favourite)
    })
    }, [props.category])


    function go(index,id, place_name) {

         navigate('/tovisit/detail',
           {
             state: {
               data: data1,
              
               category: props.category,
               city_data:data1[index],
               src: '/places/',
               place_name: place_name,
               idx: id,
               address: Address,
              
             }
           }
         )
    }


    const favourite1 = (id, indx) => {
        const islogin = window.localStorage.getItem('islogin');
        if (islogin === "success") {

            const itemsToSelect = isfavourite.map((item, index) => {
                if (index === indx) item = !item;

                return item;
            }, []);


            setİsFavourite(itemsToSelect);

            /* setİsFavourite(prevState => prevState.map((item, idx) => idx === indx ? !item :item))*/

            Axios.post("http://localhost:3001/favourite", {
                id: id,
                favourite: !isfavourite[indx],
                userId: window.localStorage.getItem('userId')
            })

        }
    }


    return (
        <div className='places'>
            {
                data1.map((element, index) => {
                    let { place_id, img_name, img, place_name, favourite } = element;

                    if (Address.length != 0) {
                        var found = Address.find(function (element) {
                            return element.place_id == place_id;

                        });
                    }
                   
                    var rating_avg = 0
                    var sum = 0
                    /* const rates = props.list.filter(obj => obj.place_id === place_id)
                       .map(obj => obj.star_rating);
           
                     if (rates.length !== 0) {
                       for (var number of rates) {
                         sum = sum + number;
           
                       }
                       rating_avg = Math.round(sum / rates.length);
           
           
                     }*/

                  
                    var src = '/places/' + img_name + '.' + img

                    return (
                        <div key={index} className='place-container'>
                            <div className="left">
                                <img className="img" src={src} />
                            </div>

                            <div className='right'>
                                <div className='place-name'>{place_name}</div>
                                <Rating star_rating={rating_avg} />
                                {
                                    found !== undefined ?
                                        <div className="adress">adress: {found.adress}</div> :
                                        <div></div>
                                }


                                <button onClick={() => go(index,place_id, place_name)} className='detail-btn'>details...</button>
                                <button onClick={() => favourite1(place_id, index)} className="heart-btn1">

                                    <FiHeart className={isfavourite[index] ? "heart-activated" : "heart"} />
                                </button>

                            </div>



                        </div>


                    )

                })

            }

        </div>
    )
}

export default CaetgoryPlace