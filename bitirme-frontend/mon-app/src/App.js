import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React ,{useEffect, useState,Suspense } from "react";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Destination from "./pages/Destination"
import Faq from "./pages/Faq"
//import PlaceToVisit from "./pages/PlaceToVisit"
import News from "./pages/CoronaNews"
import Hisplaces from "./pages/historicalPlaces"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./App.css"
import Destinationdetails from "./pages/Categories_page";
import Categoriesdetails from "./pages/Places_page"
import Placedetails from "./pages/Place_detail"
import Suggestiondetails from "./pages/suggestion_detail"
import Favourite from "./pages/Favourite"
import PlaceToVisit from "./pages/PlaceToVisit"
import TovisitPage from "./pages/ToVisit_detail"
//import { ReactSession } from 'react-client-session';
import {useTranslation} from "react-i18next";
import Profile from "./pages/Profile";

function HeaderComponent()
{
  const [t, i18n] = useTranslation('common');
  return <div>
      <h1>{t('welcome.title', {framework:'React'})}</h1>
      <h1>{t("hello",{username:"hello"})}</h1>
      <button onClick={() => i18n.changeLanguage('de')}>tr</button>
      <button onClick={() => i18n.changeLanguage('en')}>en</button>
  </div>
}
function App() {


  const [islogin,setloginInfo]=useState('');
  const [username,setUsername]=useState('');
  useEffect(() => {
   setloginInfo(window.localStorage.getItem('islogin'));

  }, []);
  useEffect(() => {
    setUsername(window.localStorage.getItem('username'));
 
   }, []);
 /*console.log(window.localStorage.getItem('islogin'))*/
  return (
    <Suspense fallback="loading">
    <div className="App">
    {/*<HeaderComponent/>*/}
    <div >  
    <Router>
    <Navbar logged={islogin} username={username}/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/destination' element={<Destination/>} />
      <Route path='/faq' element={<Faq/>} />
      {/*<Route path='/placeToVisit' element={<PlaceToVisit/>} />*/}
      <Route path='/news' element={<News/>} />
      <Route path='/login' element={<Login isLogin={setloginInfo} setusername={setUsername}/>}/>
     
      <Route path='/tovisit' element={<PlaceToVisit/>} />
      {/*<Route path='/naturalplaces' element={<PlaceToVisit/>} />
      <Route path='/culturalplaces' element={<PlaceToVisit/>} />
  <Route path='/Islands' element={<PlaceToVisit/>} />*/}

      <Route path='/register' element={<Register/>} />
      <Route path='/destination/details' element={<Destinationdetails/>} />
      <Route path='/destination/details/category' element={<Categoriesdetails/>} />
      <Route path='/destination/details/category/place' element={<Placedetails/>} />
      <Route path='/suggestion' element={<Suggestiondetails/>} />
      <Route path='/favourite' element={<Favourite/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/tovisit/detail' element={<TovisitPage/>} />
    </Routes>
  </Router>

  </div>
    </div>
    </Suspense>
  );
}

export default App;
