
import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import Accordion from '../components/Accordion'
function Faq () {

  const [list, setlist] = useState([])
  useEffect(() => {
    Axios.get("http://localhost:3001/faq").then((res)=>{
      if (res.data){
        var l=res.data
        
       setlist(l) 
      }
    })
  },[])
  

let data=[]
list.map((element)=>{
  let object={
    question_id:element.question_id,
    title:element.question_text,
    content:element["Answer.answer_text"],
    confirmation:element.confirmation

  }
  data.push(object)
})

  
    
  	return (
      <div className='faq'>
      <h4>Turkey Frequently Asked Questions </h4>
      {/*<h4>BELOW YOU WILL FIND ANSWERS TO FREQUENTLY ASKED QUESTIONS ABOUT A TOURIST CENTER OF THE WORLD: TURKEY</h4>*/}
    	<Accordion data={data} />
      </div>
    );
  
};
export default Faq







