import React ,{useEffect, useState}from 'react'
import Card from "../components/Card"

import Axios from 'axios'
/*import {CardList} from "../components/CardList"*/
import SearchBox from '../components/SearchBox'
import MapContainer from '../components/Mapcontainer'
function Destination() {
  

  const [searchfield, setSearchfield] = useState('')

  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }
  

  const [list, setlist] = useState([])
  useEffect(() => {
    Axios.get("http://localhost:3001/destination").then((res)=>{
      if (res.data){
        var l=res.data.filter(city =>{
          return city.city_name.toLowerCase().includes(searchfield.toLowerCase())
      });
       setlist(l) 
      }
    })
  },[searchfield])
 

  
    /* list=data.then(list=>{
      list.data.filter(city =>{
        return city.city.toLowerCase().includes(searchfield.toLowerCase())
    });
  })*/
  
     

  return (
    <div className='destination'>
    
    <SearchBox searchChange={onSearchChange}/>
    
 <Card id={1} list={list}/>


<MapContainer bool={true}/>
    </div>
  )
}

export default Destination

