import React, { useState, useContext } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from '../context/Context';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const auth = useContext(context);
  console.log(auth);

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmite = async (e) => {
    e.preventDefault();
    //console.log(name,email,password);
    try {

      const api = await axios.post(`https://mern-2024-d3uv.onrender.com/api/users/login`, { email, password }, { withCredentials: true, });
      console.log(api);
      //setUser(api.data.user)
      toast.success(api.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce
      });
      auth.setIsAuthenticated(true);
    setTimeout(() => {
      navigate('/profile');
    }, 1500);

    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce
      });
      auth.setIsAuthenticated(false);

    }
  }

  return (
    <>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        // transition:Bounce
      />
      <div className='container' style={{ width: '45%' }}>
        <h1 className='text-center my-3'>Login User</h1>
        <form onSubmit={handleSubmite}>
          
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="d-grid gap-2 my-5">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>

    </>
  )
}

export default Login;