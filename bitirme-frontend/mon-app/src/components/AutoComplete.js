import React,{useState,useEffect} from 'react'
import { Autocomplete,verify } from '@lob/react-address-autocomplete'
import Postcoder from "react-address-lookup";
import {MapContainer ,TileLayer } from "react-leaflet";
// Some minor inline styles to make the component more apparent

function AutoComplete() {
   
    const [map, setMap] = useState(null);
    const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  
    useEffect(() => {
      if (map && coordinates.lat && coordinates.lng) map.setView(coordinates);
    }, [map, coordinates]);
  
   
    return (
        <div>
        <MapContainer
        center={[49.1951, 16.6068]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh" }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </MapContainer>
    
      </div>
    );
  
}

export default AutoComplete

