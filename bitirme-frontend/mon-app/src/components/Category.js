import { Axios } from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Category.css"



function Category(props) {
 

    const navigate = useNavigate();
   /* console.log(props.data)*/
    const list=props.data
    /*if (Array.isArray(list)) {
        console.log(props.title)
    const category_list=list.filter(x=> x.category.toString()=== props.title)
    console.log(category_list)}*/
    console.log(list)
    function go() {
       
           
        const category_list=list.filter(x=> x.category=== props.title)
     
        console.log(category_list)
          navigate('/destination/details/category',
          {state:{ data:category_list,city_data:props.city_data,category:props.title,src:'/cities_img/',address:props.address}}     
        )
       
    
      }
      console.log(list)
  return (
    
    <div className='category'>
    <img src={props.src} alt='images' />
    <div className='top-image'>
    <div className='text'>{props.title}</div>
    <button onClick={() => go()}>more details...</button>
   
    </div>
    
    </div>
   
  )
}

export default Category
