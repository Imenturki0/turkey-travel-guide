import React, { useEffect, useState, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom';
import Axios from "axios"
import Comments from '../components/Comments'
import Image_popup from "../components/Image_popup"
import OpeningHours from '../components/OpeningHours';
import { IoHeartCircleOutline } from "react-icons/io5"
import PropertyType from '../components/PropertyType';
import { CiEdit } from "react-icons/ci";


function Place_detail() {
    const { state } = useLocation();
    const { data, city_data, category, src, place_name, idx, address, favourite } = state

    // console.log(city_data)
    //console.log(idx)
    const adress = address.filter(x => x.place_id === idx)
    const [list2, setList2] = useState([])
    const [list3, setList3] = useState([])
    const [list4, setList4] = useState([])
    const [listPropeties, setListPropreties] = useState([])
    const { img_name, city_name } = city_data;
    const [list, setlist] = useState([])
    const [isfavourite, setİsFavourite] = useState(false)
    const [selected, setSelected] = useState([])
    const [Edit, setEdit] = useState(false)
    const [Edit2, setEdit2] = useState(false)
    const [detail, setDetail] = useState("")
    const [text, setText] = useState("")
    var src1 = src + img_name

    const textAreaRef = useRef();
    const send = () => {
        Axios.post("http://localhost:3001/hotel/add", {
            place_id: idx,
            selected: selected

        }).then((c) => {
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        })
    }
    console.log(selected)
    const favourite1 = (id, indx) => {
        const islogin = window.localStorage.getItem('islogin');
        if (islogin === "success") {

            setİsFavourite(!isfavourite)

            Axios.post("http://localhost:3001/favourite", {
                id: id,
                favourite: !isfavourite,
                userId: window.localStorage.getItem('userId')
            })

        }
    }

    const sendDetail = () => {
        Axios.post("http://localhost:3001/Detail/add", {
            place_id: idx,
            text: detail

        })
    }

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

    useAutosizeTextArea(textAreaRef.current, detail);
    useEffect(() => {
        setİsFavourite(favourite)
        Axios.post("http://localhost:3001/detail", {
            id: idx,
            category: category,
            // address: adress[0].adress
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
                /*var data=res.data.data.filter(x=>{return x.place_id==idx || x["places.Place_detail.place_id"]==idx || x["places.place_id"]==idx })
              console.log(data)*/
                setList2(res.data.data)
                setList3(res.data.hours)
                console.log(res.data.data)
                //  setİsFavourite(!!res.data.data[0]["places.favourite"])

                var text1 = []
                res.data.data.map((item) => {
                    if (!text1.includes(item["places.Place_detail.text"])) {
                        text1.push(item["places.Place_detail.text"])


                    }
                })

                setDetail(text1.join("\n"))

                setText(text1)
                //setDetail(text1)


            }
        })
        Axios.post("http://localhost:3001/CommentList", {
            placeId: idx

        }).then((res) => {
            if (res.data) {
                setlist(res.data)
            }
        })
        // console.log(list4)

    }, [])
    // console.log(detail)
    //console.log(text)
    //var text = []
    /*list2.map((item) => {
        if (!text.includes(item["places.Place_detail.text"])) {
            text.push(item["places.Place_detail.text"])
        }
    })*/

    var images = []

    if (category !== "hotels") {
        list2.map((element) => {

            const obj = { id: element.image_id, src: element.source }

            if (!images.some(e => e.id === element.image_id && e.src === element.source)) {

                images.push(
                    obj
                )
            }
        })
        //console.log(images)
    }
    else {
        list3.map((element) => {

            const obj = { id: element.image_id, src: element.source }
            if (!images.some(e => e.id === element.image_id && e.src === element.source)) {

                images.push(
                    obj
                )
            }
        })
    }
    console.log(text)


    const Propretyamenities = list4.filter(c => c["Places_hotel_propreties.Hotel_propreties.proprety_type"] === "Property amenities")
    const Roomfeatures = list4.filter(c => c["Places_hotel_propreties.Hotel_propreties.proprety_type"] === "Room features")
    const Roomtypes = list4.filter(c => c["Places_hotel_propreties.Hotel_propreties.proprety_type"] === "Room types")
    const AllPropretyamenities = listPropeties.filter(c => c["proprety_type"] === "Property amenities")
    const AllRoomfeatures = listPropeties.filter(c => c["proprety_type"] === "Room features")
    const AllRoomtypes = listPropeties.filter(c => c["proprety_type"] === "Room types")

    console.log(adress)

    return (
        <div className='details'>

            <div className='city'>
                <img src={src1} alt='images' />
                <div className='city_name'>{city_name}</div>
                <div className='navlink'>

                    <div>
                        <Link to="/destination" className="link">destination </Link>
                        <div className='symbol'> &nbsp; {" >"} &nbsp;</div>
                        <Link to='/destination/details'
                            state={{
                                data: data,
                                city_data: city_data,
                                address: address
                            }}
                            className="link"> {city_name}
                        </Link>

                        <div className='symbol'> &nbsp; {" >"} &nbsp;</div>

                        <Link to='/destination/details/category'
                            state={{
                                data: data,
                                city_data: city_data,
                                category: category,
                                src: src,
                                address: address
                            }}
                            className="link"> {category}
                        </Link>

                        <div className='symbol'> &nbsp; {" >"} &nbsp;</div>

                        <Link to='/destination/details/category/place'
                            state={{
                                data: data,
                                city_data: city_data,
                                category: category,
                                src: src,
                                place_name: place_name,
                                /*link_name: link_name,
                                link: link, */
                                address: address
                            }} className="link"> {place_name}
                        </Link>
                    </div>

                </div>
            </div>

            <div className='container1'><button onClick={() => favourite1(idx)} className="heart1-btn">

                <IoHeartCircleOutline className={isfavourite ? "heart1-activated" : "heart1"} />
            </button>
                <div className='info'>

                    <Image_popup images={images} id={idx} alt="" />

                    {(category !== "hotels") ?
                        text.length !== 0 ?
                            <div className='texts'>
                                {window.localStorage.getItem('role') == "admin" ?
                                    <div> <CiEdit className='edit-btn2' onClick={() => setEdit2(!Edit2)} />
                                        {
                                            Edit2 ? <div> <textarea className='textarea' value={detail} onChange={e => setDetail(e.target.value)} ref={textAreaRef} row={1}></textarea>

                                                <button className='btn' onClick={() => sendDetail()}>add text</button></div>
                                                : <div>
                                                    {text.map((item) => {
                                                        return (
                                                            <div >

                                                                <div className='text'>{item} </div>
                                                                <br />
                                                            </div>
                                                        )
                                                    }
                                                    )}</div>
                                        }</div> : <div>
                                        {text.map((item) => {
                                            return (
                                                <div >

                                                    <div className='text'>{item} </div>
                                                    <br />
                                                </div>
                                            )
                                        }
                                        )}</div>}
                            </div> : <div >{/*<CiEdit className='edit-btn3' onClick={() => setEdit2(!Edit2)}/> */}
                                <textarea className='textarea1' value={detail} onChange={e => setDetail(e.target.value)} ref={textAreaRef} row={1}></textarea>

                                <button className='btn' onClick={() => sendDetail()}>add text</button>

                            </div> :
                        <div className='propreties'>
                            {window.localStorage.getItem('role') == "admin" ? <CiEdit className='edit-btn' onClick={() => setEdit(!Edit)} /> : <div></div>}

                            <PropertyType list={Propretyamenities} title="Proprety amenities:" Allpropeties={AllPropretyamenities} selected={selected} setselected={setSelected} Edit={Edit} />


                            <PropertyType list={Roomfeatures} title="Room features:" Allpropeties={AllRoomfeatures} selected={selected} setSelected setselected={setSelected} Edit={Edit} />


                            <PropertyType list={Roomtypes} title="Room types:" Allpropeties={AllRoomtypes} selected={selected} setSelected setselected={setSelected} Edit={Edit} />
                            {Edit ? <button onClick={() => send()}>Save</button> : <div></div>}
                        </div>
                    }

                </div>
                <div className='right-detail'>
                    {
                        (category !== "hotels") ? <OpeningHours list={list3} />
                            : <div></div>
                    }  {adress.length != 0 ?
                        <div className='opening_hours'>
                            <div className='title2'>address:{adress[0].adress}</div>
                        </div> : <div></div>}

                </div>
            </div>

            <Comments placeId={idx} list={list} />

        </div>
    )
}

export default Place_detail
