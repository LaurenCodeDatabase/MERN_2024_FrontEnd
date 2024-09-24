import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Userdetails from '../components/Userdetails';


const Home = () => {

  const [blog, setblog] = useState([]);

  useEffect(() => {
    const fetchblog = async () => {
      const api = await axios.get(`https://mern-2024-d3uv.onrender.com/api/blogs/getAllblogs`, { withCredentials: true, });
      //console.log(api.data);
      setblog(api.data.blogs)
    }

    fetchblog();
  }, []);


  return (
    <>
      <div className='container text-center my-5' style={{ width: '50%' }}>

        {blog.map((data) => {
          return (
            <>


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

export default Home;