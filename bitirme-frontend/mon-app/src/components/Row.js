import React from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/Row.css"



function Row(props) {
    const navigate = useNavigate();
    function go(id, title, index) {



        navigate('/suggestion',
            {
                state: {
                    data: props.list,
                    city_data: props.list[index],
                    category: props.title, src: "/images/",
                    link_name: "Home",
                    link: '/',
                    city_name: title,
                    idx: id
                }
            }
        )
    }
    return (

        <div className='row'>
            <div className='title5'>
                <h2>{props.title}</h2>
            </div>
            <div className='images'>


                {
                    props.list.map((element, index) => {

                        const { suggestion_id, title, img_name, category } = element;
                      
                        return (

                            <div>
                                <button onClick={() => go(suggestion_id, title, index)}>
                                    <div key={suggestion_id} className={`row-item ${category}`} >
                                        <img src={`/images/${img_name}`} alt='images' />
                                        <div className='text'>{title}</div>
                                    </div></button>
                               
                            </div>
                        )
                    })
                }

{
    props.list.map((element, index) => {

        const { suggestion_id, title, img_name, category } = element;
      
        return (

            <div>
                <button onClick={() => go(suggestion_id, title, index)}>
                    <div key={suggestion_id} className={`row-item ${category}`} >
                        <img src={`/images/${img_name}`} alt='images' />
                        <div className='text'>{title}</div>
                    </div></button>
               
            </div>
        )
    })
}


            </div>
        </div>
    )
}

export default Row
