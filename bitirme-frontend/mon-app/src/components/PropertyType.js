import React, { useEffect, useState } from 'react'
import * as Icons from "react-icons/fa"
import * as Icons1 from "react-icons/io5"
import * as Icons2 from "react-icons/bi";
import * as Icons3 from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import "../styles/PropertyType.css"
function PropertyType(props) {
  
console.log(props.selected==null)

    const DynamicFaIcon = ({ name }) => {
        var IconComponent = Icons[name];
        if (name.includes("Io")) {
            IconComponent = Icons1[name]
        } else if (name.includes("Bi")) {
            IconComponent = Icons2[name]
        } else if (name.includes("Gi")) {
            IconComponent = Icons3[name]
        }

        if (!IconComponent) {
            return <Icons.FaBeer />;
        }

        return <IconComponent />;
    };
    const handleChange =(indx)=>{
        const itemsToSelect = props.selected.filter((item, index) => {
        return (!(item === indx)) 

      
      }, []);
    
console.log(itemsToSelect)
      props.setselected(itemsToSelect);
     if( props.selected.every((element, index) => element === itemsToSelect[index]))
     props.setselected(oldArray => [...oldArray, indx]);
    }
 

  
    return (
        <div className='proprety-type'>
           {/* <CiEdit className='edit-btn' onClick={() => setEdit(!Edit)}  >*/}
            <div className='title2'>{props.title}</div>
            <div className='proprety-list'>
                {
                    
                    !props.Edit ?
                        props.list.map(m => {

                            return (

                                <div className='proprety'>
                                    <DynamicFaIcon name={m["Places_hotel_propreties.Hotel_propreties.icon"]} />
                                    <div className='proprety-text'>{m["Places_hotel_propreties.Hotel_propreties.proprety"]}</div>
                                </div>
                            )

                        }) :
                        props.Allpropeties.map((m )=> {

                            return (
                                <label>
                                    <input type="checkbox" 
                                    checked={props.selected.includes(m["propreties_id"]) ? true : false}
                                     onChange={()=>handleChange(m["propreties_id"])}
                                    />
                                    <DynamicFaIcon name={m["icon"]} />
                                    <div className='proprety-text'>{m["proprety"]}</div>
                                </label>
                            )

                        })

                }</div>
        </div>
    )
}

export default PropertyType
