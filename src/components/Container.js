import React ,{useEffect,useState} from 'react'

import Row from'./Row'

import  Axios  from 'axios'
function Container() {
  const [list, setlist] = useState([])
  useEffect(() => 
  Axios.get("http://localhost:3001/suggestion1").then((response)=>
  {
    
    setlist(response.data)
 
  }),[]);
  let honneymoon_list=list.filter((element)=>{return element.category=="honeymoon"})
  let istanbul_list=list.filter((element)=>{return element.category=="istanbul"})
  let beaches=list.filter((element)=>{return element.category=="beaches"})
  console.log(beaches)
  return (
    <div className='container'>
   
    {/*imgItems.map((item) => {
       
        return(*/
            <div key={0}>
            

        <Row  title="best destinations for the honneymoon" list={honneymoon_list}></Row>
        
        <Row  title="Top-Rated Tourist Attractions & Things to Do in Istanbul" list={istanbul_list}></Row>
        
        <Row  title="THE BEST BEACHES IN TURKEY" list={beaches}></Row>
        </div>
/*)})*/
}
 
    
    
    </div>
  )
}

export default Container
