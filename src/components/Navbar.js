
import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css';
import img from "../user-avatar.png"
import { navItems } from "./Navİtems";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./DropDown";
import UserDropDown from "./UserDropDown";

const Navbar = ({logged,username}) => {

  const [dropDown, setDropDown] = useState(false);

  const [dropProfile, setDropProfile] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  let count=0;
  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }
  const setDrop = () => {
    setDropDown(!dropDown)
  }
  const setDropprofile = () => {
    setDropProfile(!dropProfile)
  }
  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

    return () => {
        window.removeEventListener('resize', changeWidth)
    }

  }, [])
 console.log(logged)
  return (

    <>
      <nav className='nav'>

        <div className="menu-icon" onClick={toggleNav} >
          <FontAwesomeIcon className="icon" icon={faBars} />
        </div>
        
          <ul className="nav-items">
          
            {navItems.map((item) => {
              if (item.title === "PlaceToVisit" && (toggleMenu || screenWidth >800)) {
                return (<div>
                  <li
                    key={count++}
                    className={item.cName}
                    onMouseEnter={() => setDropDown(true)}
                    onMouseLeave={() => setDropDown(false)}
                    onClick={setDrop}
                  >
                    <div className="link">{item.title}</div>
                    {dropDown && <Dropdown />}
                  </li></div>
                );
              } else if (item.title === "login" && logged==="success") {
                
                return (
                  <li
                  key={count++}
                  className="user"
               onClick={setDropprofile}
                  
                >
                <img className="user-icon" src={img} alt='images' />
             <p className="username">{username}</p>
        
                  {dropProfile && <UserDropDown/>}
                
                </li>
              
                );
              }
              else if ((toggleMenu || screenWidth >800)){
              return (
                <li key={count++} className={item.cName}>
                  <Link to={item.path}  onClick={toggleNav}>{item.title}</Link>
                </li>

              );}
            })}

          </ul>
      

      </nav>
    </>
  )
}

export default Navbar
