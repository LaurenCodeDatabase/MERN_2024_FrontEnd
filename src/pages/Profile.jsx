import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import context from '../context/Context';
import MyBlogs from '../components/MyBlogs';
import { BiSolidUserCircle } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';


const Profile = () => {

  const auth = useContext(context);

  // const [blog, setblog] = useState([]);

  useEffect(() => {
    const fetchuser = async () => {
      const api = await axios.get(`https://mern-2024-d3uv.onrender.com/api/users/myprofile`, { withCredentials: true, });
      console.log(api.data.UserName);
      //setblog(api.data.blogs)
      auth.setUser(api.data.UserName);
      auth.setIsAuthenticated(true);
    }

    fetchuser();
  }, []);


  return (
    <>
      <div className='text-center my-3'>
        <h2><BiSolidUserCircle /> {" "}{auth.user.name}</h2>
        <h3><MdEmail /> {" "}{auth.user.email}</h3>
        <MyBlogs />
      </div>
    </>

  )
}

export default Profile;