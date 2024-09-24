import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import Userdetails from '../components/Userdetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from '../context/Context';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {

  const navigate = useNavigate();
  const auth = useContext(context);
  const [blog, setblog] = useState([]);

  useEffect(() => {
    const fetchblog = async () => {
      const api = await axios.get(`https://mern-2024-d3uv.onrender.com/api/blogs/myblogs`, { withCredentials: true, });
      //console.log(api.data);
      setblog(api.data.blogs)
    }

    fetchblog();
  }, []);

  const deleteBlog = async (id) => {
    const api = await axios.delete(`https://mern-2024-d3uv.onrender.com/api/blogs/${id}`, { withCredentials: true, });
    console.log(api.data.message);
    //setblog(api.data.blogs)
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
  }

  const editBlog = async(id) =>{
    console.log(id);
    auth.setId(id);
    navigate('/addblog')
  }

  return (
    <>
      <div className='container text-center my-5' style={{ width: '50%' }}>

        {blog.map((data) => {
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

              <div className="card mb-3" style={{ maxWidth: '660px' }}>
                <div className="row g-0">
                  <div className="col-md-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={data.imageUrl} className="img-fluid rounded-start" alt="test" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{data.title}</h5>
                      <p className="card-text">{data.description}</p>
                      <p className="card-text"><small className="text-body-secondary">{data.createdAt}</small></p>
                      <Userdetails id={data.user} />
                      <button onClick={() =>editBlog(data._id)} className='btn btn-warning mx-5'>Edit</button>
                      <button onClick={() => deleteBlog(data._id)} className='btn btn-warning mx-5'>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div >

    </>
  )
}

export default MyBlogs;