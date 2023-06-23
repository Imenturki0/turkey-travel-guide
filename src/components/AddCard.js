import React, { useState } from 'react'
import axios from 'axios';
import "../styles/AddCard.css"
import img from '../upload-img.png'
function AddCard() {
  const [file, setFile] = useState(null);
  const [image1, setImage] = useState();
  const [name, setName] = useState("");
  const onchange = (e) => {

    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  const setname=name=>{
    setName(name.target.value)
    
  }
  const handlesubmit = async () => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append('name',name)
    console.log(name)
    /*var newfile = formData.get('file')
    console.log(file.name)*/
    try {
      /*axios.post("http://localhost:3001/destination/upload",
      {data:formData,
      file:file},{
        
        headers: { "Content-Type": "multipart/form-data" }
      });*/
      axios({
        method: 'post',
        url: 'http://localhost:3001/destination/upload',
        data: formData,
  
        headers: { "Content-Type": "multipart/form-data" },
      })
    } catch (error) {
      console.log(error)
    }
    axios.post("http://localhost:3001/coordinates", {
      cityname:name,
     
    }).then((response) => {
     
      const t = response.data;
     
    })  
  }


  return (
    <div className='added-card'>
      <label className='label'>upload picture here</label>
      <label>
        <img src={img} alt='no img' className='upload-image' />
      
        <input type="file" name="file" accept="image/*" className="inputfile" onChange={(e) => onchange(e)} />
      </label> 
       <img src={image1} className='image'  />
      <label className='label'>type city name here:</label>
      <input  type="text" className='city-name' onChange={setname}  />
      <button onClick={handlesubmit} >submit</button>

    </div>
  )
}

export default AddCard


