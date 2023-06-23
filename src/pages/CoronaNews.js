import React, { useState,useEffect } from 'react'
import Axios from 'axios'
function CoronaNews() {
const [news,setnews]= useState({});
function func(keys,values){ keys.forEach((element, index) => {
  var title = document.createElement("h3");
  var ul = document.createElement("ul");
  ul.setAttribute("class", "element");
  /*console.log(element)
  console.log(values[index])*/
  title.innerText = element
  document.getElementById('text').appendChild(title);
  var text = values[index]

  const myArray = text.split("\n");
  /*console.log(myArray)*/
  myArray.forEach((element) => {
    if (element !== '') {
      var li = document.createElement("li");
      li.innerHTML = element

      document.getElementById('text').appendChild(li);
    }

  })

  /* console.log(myArray)*/
  /* document.getElementById('text').appendChild(ul);*/

})}

useEffect(() => {
  console.log(Object.keys(news).length===0)
  if(Object.keys(news).length===0){
    let d={}
    d=JSON.parse(window.localStorage.getItem("news"));
    console.log(d)
    if(d!==null){
    func(Object.keys(d),Object.values(d))
  }
    console.log('come'+JSON.stringify(d))
  }

 Axios.get("http://localhost:3001/news", {


  }).then((response) => {
    console.log('data'+response.data);
    const obj = response.data; 
   
   setnews(obj) 
   console.log(obj)
     console.log('jhe'+JSON.stringify(obj))
     console.log("he"+Object.keys(obj).length!==0)
     if(Object.keys(obj).length!==0){
       window.localStorage.setItem("news", JSON.stringify(obj));
         console.log('ggg'+(window.localStorage.getItem("news")))
    const keys = Object.keys(obj)
    const values = Object.values(obj)
    console.log(keys,' eh'+values)
    //func(keys,values)
  }

     
   
 


  })},
   []);
  
  
   
  return (
    <div className='coronaNews'>
   
      <div id='text'></div>
    </div>
  )
}

export default CoronaNews
