import axios from 'axios'
import React,{useState} from 'react'
import PlaceElement from "../components/CategoryPlace"
import { useLocation } from "react-router-dom";
function PlaceToVisit() {
 
  
  const { state } = useLocation();
  const { category } = state
 
  return (
    <div className='PlaceToVisit'>
    <div className='category-name'>{category}</div>
  <PlaceElement   category={category}/>
  
    </div>
  )
}

export default PlaceToVisit
