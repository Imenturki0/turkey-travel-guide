import React, { useState, useEffect } from 'react'
import input from '../components/İnput'
import '../styles/Accordion.css'
import Axios from 'axios'
import { GiConfirmed } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import Popup from './Popup';
function Accordion(props) {
  let accordion = [];
  const [accordionİtems, Setaccordionİtems] = useState([]);
  const [open, Setopen] = useState(true);
  const [question, Setquestion] = useState("");
  const [answer, Setanswer] = useState("");
  const [selected, setselected] = useState(null)
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [id, setİd] = useState(0);
  
  const toggle = (i) => {
    if (selected === i) {
      return setselected(null)
    }
    setselected(i)
  }
  console.log(props.data)
  /*useEffect(() =>{
     
    
      props.data.forEach((i) => {
      accordion.push({
        title: i.title, 
        content: i.content, 
        open: open
      });
    });
    Setaccordionİtems(accordion)
     
    },[])   
  console.log(open)*/
  function Delete(id) {

    Axios.post("http://localhost:3001/Faq/delete", {
      id: id
    })
    setButtonPopup1(false)
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }

  const addquestion = () => {
    Axios.post("http://localhost:3001/accordionQ", {
      question: question
    }).then((res) => {

    })
  }

  const addanswer = (i) => {
    console.log(i)
    Axios.post("http://localhost:3001/accordionA", {
      answer: answer,
      questionid: i
    }).then((res) => {

    })
  }
  const accepted=(i,confirm)=>{
    Axios.post("http://localhost:3001/confirmation",{
      questionid:i,
      confirmation:confirm
    })
  }




  return (

    <div className='wrapper'>

      <div className='accordion'>
        {
          props.data.map((item, i) => (

            <div className='item'>
              {window.localStorage.getItem('role') === "admin" ?
                <div>
                  <div className='icons'>
                    <GiConfirmed onClick={()=>accepted(item.question_id,"accepted")}/>
                    <AiFillCloseCircle onClick={()=>accepted(item.question_id,"notaccepted")}/>
                    <MdDelete onClick={() => { setİd(item.question_id); setButtonPopup1(true); }}/>
                  </div>
                  <div className='title' onClick={() => toggle(i)}>
                    <h3>{item.title}</h3>
                    <div className="arrow-wrapper">
                      <i className={selected === i
                        ? "fa fa-angle-down fa-rotate-180"
                        : "fa fa-angle-down"}
                      ></i>
                    </div>
                  </div>


                  <div className={selected === i ? 'content1 show' : 'content1'}>
                    <div className='answer'>{item.content}
                    </div>

                    <textarea className="add-answer" cols="40" rows="5" placeholder="type answer here" onChange={e => Setanswer(e.target.value)}></textarea>
                    <button className='btn' onClick={() => addanswer(item.question_id)}>add answer</button>
                  </div>
                </div>
                : item.confirmation === "accepted" ?
                  <div>

                    <div className='title' onClick={() => toggle(i)}>
                      <h3>{item.title}</h3>
                      <div className="arrow-wrapper">
                        <i className={selected === i
                          ? "fa fa-angle-down fa-rotate-180"
                          : "fa fa-angle-down"}
                        ></i>
                      </div>
                    </div>


                    <div className={selected === i ? 'content1 show' : 'content1'}>
                      <div className='answer'>{item.content}
                      </div>


                    </div>
                  </div> : <div></div>}
            </div>

          ))}
        <div className='question'>
          <textarea className="add-question" cols="40" rows="5" placeholder="type question here" onChange={e => Setquestion(e.target.value)}></textarea>
          <button className='btn' onClick={addquestion}>add question </button>
        </div>
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

export default Accordion

