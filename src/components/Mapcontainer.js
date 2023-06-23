import React, { useEffect, useState,useRef,useMemo } from 'react'
import Axios from 'axios'

/*import "leaflet/dist/leaflet.css";*/
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../styles/Mapcontainer.css'
import L from 'leaflet';


function Mapcontainer(props) {
  
  const [coords, setcoords] = useState([])
  useEffect(() => {
    Axios.get("http://localhost:3001/map").then((res) => {

      setcoords(res.data)

    })
  }, [])
  /*console.log(coords)*/

console.log(coords)
const markerRef = useRef();

const eventHandlers = useMemo(
  () => ({
    mouseover() {
      if (markerRef) markerRef.current.openPopup();
    },
    mouseout() {
      if (markerRef) markerRef.current.closePopup();
    }
  }),
  []
);
  return (
   
   
        <MapContainer  center={[38.963745, 35.243322]} zoom={6} scrollWheelZoom={false} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {coords.map((element,index) => {
            const { lat, long } = element;

            /*console.log(lat,long)*/
            return (
              <Marker key={element.location_id} position={[lat, long]}    
              
              
          
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout:(event)=> event.target.closePopup()
              }}>
                <Popup>
          {coords[index]["Destination.city_name"]}
         
              </Popup>
              </Marker>
            )
          })}
        </MapContainer> 
      
   
  )
}

export default Mapcontainer


