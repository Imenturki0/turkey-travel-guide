import React, { useState, useEffect } from 'react'
import "../styles/Image.css"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Popup from './Popup';

function Image_popup(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [image1, setImage] = useState();
  const [file, setFile] = useState(null);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [show, setshow] = useState(false);
  const [id, setİd] = useState();
  const slideLength = props.images.length;
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
  };

  const onchange = (e) => {

    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  }
console.log(file)
  const handlesubmit = async () => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", props.id)

    try {

      axios({
        method: 'post',
        url: 'http://localhost:3001/detail/upload',
        data: formData,

        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        /*setTimeout(function () {
          window.location.reload();
        }, 2000);*/
if(res.data=="saved"){
setshow(true)
}

      })
    } catch (error) {
      console.log(error)
    }

  }
  function Delete(id) {

    axios.post("http://localhost:3001/image/delete", {
      id: id
    })
    setButtonPopup(false)
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }

  return (
    <div className='Container'>
      {window.localStorage.getItem('role') === 'admin' ? <label>
        <input type="file" name="file" accept="image/*" className="inputfile" onChange={(e) => onchange(e)} />
        <AiFillPlusCircle className="plus-btn" onClick={()=>setshow(false)}/>
      </label> : <div></div>}

      <div className='images-container'>

        {props.images.map((element, index) => {
          if (element.src !== 'undefined' && element.src !== null) {
            const src = "/extra_images/" + element.src



            return (

              <div key={index} className="image-content" >
                {
                  window.localStorage.getItem('role') === 'admin' ?
                  <MdDelete className="delete-btn" onClick={() => { setİd(element.id); setButtonPopup1(true); }} /> :
                  <div></div>
                }

                <button onClick={() => { setCurrentSlide(index); setButtonPopup(true) }}>

                  <div className='image'>

                    <img src={src} alt="hel " /></div>
                </button>

                {buttonPopup && <div className='popup-image'>
                  <div className='img'>

                    <img src={"/extra_images/" + props.images[currentSlide].src} />
                  </div>
                  <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
                  <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
                  <button className='x-btn' onClick={() => setButtonPopup(false)} >&times;</button>

                </div>
                } </div>
            )
          }

        }
        )} {file !== null ?
          <div className='add-content'>
            <div className='image'>
              <img src={image1} />
{show?<div className='text1'>this picture added</div>:<div></div>}
            </div> <button className='submit-btn' onClick={handlesubmit}>submit</button></div> : <div></div>}
      </div>
      <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1} id={id} deletefunc={Delete}>
        <h1>Are you sure</h1>
        <p>Do you really want to delete it?</p>
        <div className="buttons">
          <button className="cancel btn" onClick={() => setButtonPopup1(false)} >cancel</button>
          <button className="delete btn" onClick={() => Delete(id)}>delete</button>
        </div>
      </Popup>
    </div>
  )
}

export default Image_popup
