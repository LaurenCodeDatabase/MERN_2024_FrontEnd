import React,{useContext, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import AddBlog from './pages/AddBlog';
import Navbar from './components/Navbar';
import context from './context/Context';
import { useNavigate } from 'react-router-dom';

const App = () => {

  const auth = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
   if(!auth.isAuthenticated){
    navigate('/');
   }
  }, [auth.isAuthenticated])
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/login' element ={<Login />} />
        <Route path='/profile' element ={<Profile />} />
        <Route path='/register' element ={<Register />} />
        <Route path='/addblog' element ={<AddBlog />} />
      </Routes>
    </>
  )
}

export default App