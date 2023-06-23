import React ,{useState}from 'react'
import { Link ,useLocation,useNavigate} from "react-router-dom";

function UserDropDown() {
    const [dropdown, setDropdown] = useState(false);
    const location = useLocation();  console.log(location.pathname)
    const navigate = useNavigate();
    const func=()=>{
      setDropdown(false)
      
      window.localStorage.setItem('islogin','error');
      window.localStorage.setItem('role','user');
      window.localStorage.setItem('userId',0);
      /*if(location.pathname=="/favourite"|| location.pathname=="/profile")
      {navigate("/")
      window.location.reload();}
      else window.location.reload();*/
      
      window.location.reload(navigate("/"))
      
    }
  return (
    <div className='login-menu'>
    <ul className='user-items'
    onClick={() => setDropdown(!dropdown)} >
<li> <Link to="/profile" className=" user-item" 
onClick={() => setDropdown(false)}>profile</Link>
</li>
<li> <Link to="/favourite" className=" user-item" 
onClick={() => setDropdown(false)}>favorite</Link>
</li>

<li> <Link to="/" className=" user-item" 
onClick={func}>logout</Link>
</li>

  </ul>
    </div>
  )
}

export default UserDropDown
