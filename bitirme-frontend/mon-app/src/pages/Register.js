import React, { useState } from 'react'
import İnput from "../components/İnput"
import Axios from 'axios'
import Popup from "../components/Popup";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [buttonPopup, setButtonPopup] = useState(false);
    const register = () => {
        Axios.post("http://localhost:3001/register", {
          username: username,
          password: password,
          email:email,
          phone_number:phonenumber
    
        }).then((response) => {
            console.log(response);})
            setButtonPopup(true)
            setTimeout(() => {
             navigate('/login');
            }, 3000);
    
      };
    return (
        <div className='register'>
        <div className='form'>
            <h1 > REGİSTER</h1>
            <İnput type='text' label='name' setinput={setUsername} input={username} />
            <İnput type='password' label='password' setinput={setPassword} input={password} />
            <İnput type='text' label='email' setinput={setEmail} input={email} />
            <İnput type='text' label='phone' setinput={setPhonenumber} input={phonenumber} />
            <button onClick={register}>register </button>
            <p className='link'>Go back to <Link to="/login">login page</Link> </p>
       </div>
       <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
       <h1>successeful registration</h1>
       <p>your acount has been created</p>
      
       <div className="buttons">
         <button className="ok btn" onClick={() => setButtonPopup(false)} >Ok</button>
         
       </div>
     </Popup>
        </div>
    )
}

export default Register
