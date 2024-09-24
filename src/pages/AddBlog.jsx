import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {

  const navigate = useNavigate();
  const auth = useContext(context);
  console.log(auth);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchblog = async () => {
      const api = await axios.get(`https://mern-2024-d3uv.onrender.com/api/blogs/blog/${auth.id}`, { withCredentials: true, });
      console.log(api);
      //setblog(api.data.blogs)
      setTitle(api.data.blog.title);
      setDescription(api.data.blog.description);
      setImageUrl(api.data.blog.imageUrl);
    }

    fetchblog();
  }, [auth.id]);


  const handleSubmite = async (e) => {
    e.preventDefault();
    //console.log(name,email,password);

    if(!auth.id){
      try {

        const api = await axios.post(`https://mern-2024-d3uv.onrender.com/api/blogs/new`, { title, description, imageUrl }, { headers:{"Content-Type":"application/json"}, withCredentials: true});
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
    }else{
      try {

        const api = await axios.put(`https://mern-2024-d3uv.onrender.com/api/blogs/${auth.id}`, { title, description, imageUrl }, { headers:{"Content-Type":"application/json"}, withCredentials: true});
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
        auth.setId('');
  
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
      {
        (auth.id) ? (<h1 className='text-center my-3'> Edit Blog</h1>) : (<h1 className='text-center my-3'>Add Blog</h1>)
      }
        
        <form onSubmit={handleSubmite}>
          <div className="mb-3 my-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"

            />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">imageurl</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              type="text" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="d-grid gap-2 my-5">
          {
            (auth.id) ? 
            (<button type="submit" className="btn btn-primary">Edit Blog</button>) :
            (<button type="submit" className="btn btn-primary">Add Blog</button>)
          }
            
          </div>
        </form>
      </div>

    </>
  )
}

export default AddBlog;