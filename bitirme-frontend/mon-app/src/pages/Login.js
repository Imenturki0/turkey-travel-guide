import React, { useState } from 'react'
import Axios from 'axios'
import İnput from "../components/İnput"
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
function Login({ isLogin,setusername }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const islogin = (logged) => {
    isLogin(logged)
  }
  const Setusername = (username) => {
    setusername(username)
  }

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
     
    }).then((response) => {
     /* console.log(response);*/
      const t = response.data;
      islogin(t.state);
     console.log(t.state)
        window.localStorage.setItem('islogin', t.state);
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('role', t.role);
        window.localStorage.setItem('userId', t.user_id);
        console.log(t.role)
      /*console.log('value'+window.localStorage.getItem('islogin'))*/
      Setusername(username);
    
      if(t.state==='error'){
        document.getElementById('text1').innerHTML='invalid username or password try again'
        /*return navigate('/login')*/
      }else return navigate('/')
     // return t === 'error' ? navigate('/login') : navigate('/');
    });

  };


  return (
    <div className='login'>
      <div className='form'>
        <h1>LOGİN</h1>
        <İnput type='text' label='name' setinput={setUsername} input={username} />
        <İnput type='password' label='password' setinput={setPassword} input={password} />



        <button onClick={login}>sign in </button>
        <p id='text1'></p>
        <p className='link'>click <Link to="/register">here</Link> to register</p>
      </div>
    </div>
  )
}

export default Login
