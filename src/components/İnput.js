import React,{useState} from 'react'
import '../styles/input.css'
function İnput({type,label,setinput,input}) {
    

  const [isActive, setIsActive] = useState(false);
  
  function handleTextChange(text) {
    setinput(text);
    if (text !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }
  return (
    
    <div className='input-data'>
    <input type={type} value={input} onChange={(e) =>{
      handleTextChange(e.target.value);
    }} />
    <label className={isActive ? "Active": ""} >
    {label}
  </label>
  
     </div>

  )
}

export default İnput
