import React, { useState } from "react";
import { serviceDropdown } from "./Navİtems";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
/*import '../styles/DropDown.css';*/



function DropDown() {
  const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);
  return (
    <div>
    <ul
    className={dropdown ? "submenu clicked" : "submenu"}
    onClick={() => setDropdown(!dropdown)}
  >
    {serviceDropdown.map((item) => {
      return (
        <li key={item.id}>
          <div
            /*to={item.path}
            state={item.state}*/
            className={item.cName}
            onClick={() =>{ setDropdown(false);navigate(item.path,{state:{category:item.state.category}})}}>
            {item.title}
        </div>
        </li>
      );
    })}
  </ul>
    </div>
  )
}

export default DropDown
