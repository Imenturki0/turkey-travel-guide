
import React, { useState, useEffect, useRef } from 'react'
import Popup from "./Popup"
import Input from "../components/İnput"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "../styles/AddDetail.css"
import axios from 'axios';
import img from '../upload-img.png'
function AddDetails(props) {
    const textAreaRef = useRef();
    const [category, setCatgeory] = useState("")
    const [ilvalue, setIlValue] = useState("")
    const [ilcevalue, setIlceValue] = useState("")
    const [mahallevalue, setMahalleValue] = useState("")
    const [pkvalue, setPkValue] = useState("")
    const [address, setaddress] = useState("")

    const [file, setFile] = useState(null);
    const [image1, setImage] = useState();
    const [name, setName] = useState("");

    
    const useAutosizeTextArea = (
        textAreaRef,
        value
    ) => {
        useEffect(() => {
            if (textAreaRef) {
                // We need to reset the height momentarily to get the correct scrollHeight for the textarea
                textAreaRef.style.height = "0px";
                const scrollHeight = textAreaRef.scrollHeight;

                // We then set the height directly, outside of the render loop
                // Trying to set this with state or a ref will product an incorrect value.
                textAreaRef.style.height = scrollHeight + "px";
            }
        }, [textAreaRef, value]);
    };

    useAutosizeTextArea(textAreaRef.current, address);
    const onchange = (e) => {

        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    }
    const category_title = [
        "hotels",
        "restaurant",
        "shopping",
        "natural places",
        "cultural places",
        "ancient cities"
    ];
    const defaultOption = category_title[0];
    const coreData = require('turkey-neighbourhoods/data/core/index.json')
    const il = []
    coreData.map((element) => {

        if (!il.includes(element.il)) {
            il.push(element.il)
        }
    })

    const ilce = []
    const mahalle = []


    const result = coreData.filter(e => e.il === ilvalue)
    result.map((element) => {

        if (!ilce.includes(element.ilçe)) {
            ilce.push(element.ilçe)
        }
    })
    const result1 = coreData.filter(e => e.ilçe === ilcevalue)
    result1.map((element) => {

        // if (!ilce.includes(element.ilçe)) {
        mahalle.push(element.Mahalle)
        // }
    })
    const pk = []

    const result2 = coreData.filter(e => e.Mahalle === mahallevalue)
    result2.map((element) => {

        if (!pk.includes(element.PK)) {
            pk.push(element.PK)
        }
    })


    const handlesubmit = async () => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append('name', name)
        formData.append('category', category)
        formData.append("address",address)
        formData.append('id', props.id)
        //console.log(props.id)

        try {

            axios({
                method: 'post',
                url: 'http://localhost:3001/destination/upload1',
                data: formData,

                headers: { "Content-Type": "multipart/form-data" },
            }).then(console.log("done"))
        } catch (error) {
            console.log(error)
        }



    }



    return (
        <div>

            <Popup trigger={props.buttonPopup} setTrigger={props.setButtonPopup} >
                <div className='inputs'>
                    <div className='left-side'>
                        <Input type='text' label='place name' setinput={setName} input={name} />


                     
                        <label>
                            <img src={img} alt='no img' />

                            <input type="file" name="file" accept="image/*" className="inputfile" onChange={(e) => onchange(e)} />
                        </label>
                        <img src={image1} className='image' alt="" />
                    </div>
                    <div className='right-side'>

                        <p>category:</p>
                        <Dropdown onChange={e => setCatgeory(e.value)} className='dropdown' options={category_title} value={defaultOption} placeholder="Select an option" />
                        <p>province:</p>
                        <Dropdown onChange={e => setIlValue(e.value)} className='dropdown' options={il} value={il[0]} placeholder="Select an option" />
                        <p>district:</p>
                        <Dropdown onChange={e => setIlceValue(e.value)} className='dropdown' options={ilce} value={ilce[0]} placeholder="Select an option" />
                        <p>neighbourhood:</p>
                        <Dropdown onChange={e => setMahalleValue(e.value)} className='dropdown' options={mahalle} value={mahalle[0]} placeholder="Select an option" />
                        <p>post code:</p>
                        <Dropdown onChange={e => { setPkValue(e.value); setaddress(mahallevalue + " Mah ," + e.value + " " + ilcevalue + "/" + ilvalue) }} className='dropdown' options={pk} value={pk[0]} placeholder="Select an option" />
                        <p>address:</p>
                        <textarea className='address' value={address} onChange={e => setaddress(e.target.value)} ref={textAreaRef} row={1}></textarea>
                    </div> 

                </div>
                <div className='buttons'>
                <button className="ok btn" onClick={() => { props.setButtonPopup(false); handlesubmit() }} >save</button>
                <button className="cancel btn" onClick={() => { props.setButtonPopup(false)}} >cancel</button>
</div>
            </Popup>

        </div>
    )
}

export default AddDetails
