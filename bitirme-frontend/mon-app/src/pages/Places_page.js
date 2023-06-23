import React,{useState,useEffect} from 'react'
import { useLocation, Link } from 'react-router-dom';
import PlaceElement from "../components/Place"
import  Axios from 'axios';


function Places_page() {

  const { state } = useLocation();
  const { data, city_data, category, src, address } = state
  const { destination_id,img_name, img, city_name } = city_data;
  var src1 = src + img_name
  const [list, setlist] = useState([])
  const [typelist,setTypelist]=useState([])
console.log(city_data)
console.log(category)
  useEffect(() => {
    
    Axios.get("http://localhost:3001/CommentList").then((res) => {
        if (res.data) {
            setlist(res.data)
            console.log(res.data)
        }
    })
    Axios.get("http://localhost:3001/placetype").then((res)=>{
      console.log(res.data)
      setTypelist(res.data)
    })
}, [])

  return (
    <div className="details">
      <div className='city'>
        <img src={src1} alt='images' />
        <div className='city_name'>{city_name}</div>
        <div className='navlink'>
          <Link to='/destination' className="link">destination </Link>
          <div className='symbol'> &nbsp; {" >"} &nbsp;</div>
          <Link to='/destination/details' state={{ data: data, city_data: city_data, address: address }} className="link"> {city_name} </Link>
          <div className='symbol'> &nbsp; {" >"} &nbsp;</div>
          <Link to='/destination/details/category'
            state={{
              data: data,
              city_data: city_data,
              category: category,
              src: src,
              address: address
            }} className="link"> {category}</Link>
        </div>
      </div>
    
      <PlaceElement data={data}  city_data={city_data} category={category} src={src} address={address} list={list} destination_id={destination_id}/>


    </div>
  )
}

export default Places_page
