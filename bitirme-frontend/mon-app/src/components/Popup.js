import React  from "react";
import '../styles/Popup.css'
function Popup({trigger, setTrigger,children,id,deletefunc}) {
  
    return (trigger)?(
    <div  className={trigger ? "popup show" : "popup hide"}>
    <div  className="popup-inner">
    
     {children}
    
     </div>
    </div>
    ):"";
  }
  
  export default Popup;