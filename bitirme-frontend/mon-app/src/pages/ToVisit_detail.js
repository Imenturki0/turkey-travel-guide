
import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import Axios from "axios"

import Imagepopup from "../components/Image_popup"
import Comments from '../components/Comments';
function ToVisit_detail() {


    const { state } = useLocation();
    const { data, city_data, category, src, place_name, idx, address } = state

    const [list, setList] = useState([])
    /*const [buttonPopup, setButtonPopup] = useState(false);
    const [id, setId] = useState();*/
    const { img_name, img, city_name } = city_data;
    var src1 = src + img_name + "." + img


    const [list2, setList2] = useState([])
    const [list3, setList3] = useState([])
    const [list4, setList4] = useState([])
    const [listPropeties, setListPropreties] = useState([])


    const [isfavourite, setİsFavourite] = useState(false)
    const [selected, setSelected] = useState([])
    const [Edit, setEdit] = useState(false)

console.log(address)
    useEffect(() => {
        Axios.post("http://localhost:3001/detail", {
            id: idx,
            category: category,
            address: address[0].adress
        }).then((res) => {

            if (category === "hotels") {
                setList4(res.data.data)
                setList3(res.data.images)
                setListPropreties(res.data.propreties)
                res.data.data.map((element, index) => {
                    /*select.push(element["Places_hotel_propreties.Hotel_propreties.propreties_id"])*/
                    setSelected(oldArray => [...oldArray, element["Places_hotel_propreties.Hotel_propreties.propreties_id"]]);
                })
            }
            else {
                setList2(res.data.data)
                setList3(res.data.hours)
                setİsFavourite(!!res.data.data[0]["places.favourite"])

            }
        })
        Axios.post("http://localhost:3001/CommentList", {
            placeId: idx

        }).then((res) => {
            if (res.data) {
                setList(res.data)
            }
        })
        console.log(list4)

    }, [])
    console.log(list)
    var text = []

    var text = []
    list2.map((item) => {
        if (!text.includes(item["places.Place_detail.text"])) {
            text.push(item["places.Place_detail.text"])
        }
    })
    console.log(list2)
    var images = []
    list2.map((element) => {

        const obj = { id: element.image_id, src: element.source }

        if (!images.some(e => e.id === element.image_id && e.src === element.source)) {

            images.push(
                obj
            )
        }
    })




    console.log(images)


    return (
        <div className='details'>
            <div className='city'>
                <img src={src1} alt='images' />
                <div className='title1'>{place_name}</div>
                <div className='navlink'>


                    <div>
                        <Link to="/tovisit" state={{


                            category: category,

                        }} className="link">place To Visit </Link>
                        <div className='symbol'> &nbsp; {" >"} &nbsp;</div>
                        <Link to='/tovisit/detail'
                            state={{


                                data: data,
                                city_data: city_data,
                                category: category,
                                src: src,
                                place_name: place_name,
                                idx: idx,
                                address: address

                            }}
                            className="link"> {place_name}
                        </Link>
                    </div>


                </div>
            </div>
            <div className='container1'>
                <div className='info'>
                    <Imagepopup images={images} />


                    {(text.length !== 0) ?
                        <div className='texts'>
                            {text.map((item) => {
                                return (
                                    <div >
                                        <div className='text'>{item} </div>
                                        <br />
                                    </div>
                                )
                            }
                            )}
                        </div> : <div></div>
                    }


                </div>
            </div>
            <Comments placeId={idx} list={list} />
        </div>
    )
}

export default ToVisit_detail

