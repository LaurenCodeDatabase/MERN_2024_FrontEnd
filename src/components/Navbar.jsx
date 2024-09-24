import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { BiSolidUserCircle } from 'react-icons/bi';
import { IoIosLogIn } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {

  const navigate = useNavigate();
  const auth = useContext(context);

  const logOut = async() =>{
    const api = await axios.get(`https://mern-2024-d3uv.onrender.com/api/users/logout`,  { withCredentials: true, });
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
      auth.setIsAuthenticated(false);

      setTimeout(() => {
        navigate('/');
      }, 1500);
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
      <div className='navbar'>
        <Link to = {'/'} className='left'>
          <h5>MERN - Blog Application</h5>
        </Link>
          <div className='right'>
            {/* <Link to={'/'} className='items'>
            <h5>Home</h5> </Link> */}
            {(!auth.isAuthenticated) && 
              <Link to={'/login'} className='items'><h5><IoIosLogIn /></h5></Link>
            }
            
            {(auth.isAuthenticated) && 
              <Link to={'/profile'} className='items'><h5><BiSolidUserCircle /></h5></Link>
            }

            {(!auth.isAuthenticated) && 
              <Link to={'/register'} className='items'><h5>Register</h5></Link>
            }

            {(auth.isAuthenticated) && 
              <Link to={'/addblog'} className='items'><h5>AddBlog</h5></Link>
            }

            {(auth.isAuthenticated) && 
              <div onClick={logOut} className='item'><h3><CiLogout /></h3></div>
            }

                        
          </div>
        
      </div>
    </>
  )
}

export default Navbar;
