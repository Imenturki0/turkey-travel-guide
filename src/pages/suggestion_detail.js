import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import Axios from "axios"

import Imagepopup from "../components/Image_popup"

function Place_detail() {

    
    const { state } = useLocation();
    const { data, city_data, category, src, place_name, idx } = state
   /*console.log(data)
   console.log(city_data)
   console.log(category)
   console.log(src)
   console.log(idx)*/
    const [list, setList] = useState([])
    /*const [buttonPopup, setButtonPopup] = useState(false);
    const [id, setId] = useState();*/

    const { img_name, img, city_name } = city_data;

    var src1 = src + img_name

    useEffect(() => {
        Axios.post("http://localhost:3001/suggestiondetail", {
            id: idx
        }).then((res) => {

            window.localStorage.setItem('list1', JSON.stringify(res.data))
           /* var list = JSON.parse(window.localStorage.getItem('list1'))**/
            setList(JSON.parse(window.localStorage.getItem('list1')))
        })
    }, [])
    console.log(list)
    var text = []

    list.map((item) => {
        if (!text.includes(item["text"])) {
            text.push(item["text"])
        }
    })


    var images = []
console.log(list)
    list.map((element) => {
console.log(element)
        
       /* if (!images.includes(element["Suggestion.Image.source"])){
        const src =   element["Suggestion.Image.source"]
        images.push(
            src
           )
}*/
const obj = { id: element["Suggestion.Image.image_id"], src: element["Suggestion.Image.source"] }

            if (!images.some(e => e.id === element["Suggestion.Image.image_id"] && e.src === element["Suggestion.Image.source"])) {

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
                <div className='title1'>{city_data.title}</div>
                <div className='navlink'>

                    
                            <div>
                                <Link to="/" className="link">Home </Link>
                                <div className='symbol'> &nbsp; {" >"} &nbsp;</div>
                                <Link to='/suggestion'
                                    state={{
                                        data: data,
                                        city_data: city_data,
                                        category: category,
                                        src: src,
                                        place_name: place_name,
                            
                                        id: idx
                                    }}
                                    className="link"> {city_data.title}
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
                    </div>:<div></div>
                     }
           

        </div>
</div>
        </div>
    )
}

export default Place_detail
