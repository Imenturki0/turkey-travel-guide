import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import img from "../user-avatar.png"
function Profile() {
    const [userinfo, setUserinfo] = useState([])

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    useEffect(() => {
        axios.get("http://localhost:3001/user").then(c => {
            setUserinfo(c.data)
            c.data.map(d => { if (d.user_id === parseInt(window.localStorage.getItem('userId'))) { user = d } })
            console.log(user)
            setUsername(user.username)
            setEmail(user.email_address)
            setPhonenumber(user.phone_number)

        })
    }, [])
    //userinfo.map(d=>{ if(d.user_id==window.localStorage.getItem('userId')){setUserinfo(d)}})
    var user = {}
    userinfo.map(d => { if (d.user_id === parseInt(window.localStorage.getItem('userId'))) { user = d } })
    console.log(user)
    const send = () => {
        axios.post("http://localhost:3001/userupdates", {
            user_id:parseInt(window.localStorage.getItem('userId')),
            username: username,
            phone_number: phonenumber,
            email_address:email
        })
        window.localStorage.setItem('username', username);


    }

    return (
        <div className='profile'>

            <div className='form'>
                <h1>My Profile</h1>
                <img className="user-icon" src={img} alt='images' />

                <div className='box'>
                    username:
                    <div className='input-data'>
                        <input type="text" value={username} onChange={(e) => {
                            setUsername(e.target.value);
                        }} />


                    </div>
                </div>
                <div className='box'>email_address:
                    <div className='input-data'>
                        <input type="text" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    </div>
                </div>
                <div className='box'>phone number:
                    <div className='input-data'>
                        <input type="text" value={phonenumber} onChange={(e) => {
                            setPhonenumber(e.target.value);
                        }} />
                    </div>
                </div>
                <button  onClick={()=>send()}>Save Edit </button>
            </div>
        </div>
    )
}

export default Profile
