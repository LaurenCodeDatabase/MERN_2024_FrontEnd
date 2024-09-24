import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BiSolidUserCircle } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';


const Userdetails = ({ id }) => {

  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchuser = async () => {
      const api = await axios.get(`https://mern-2024-d3uv.onrender.com/api/users/${id}`, { withCredentials: true, });
      //console.log(api);
      setUser(api.data.user)
    }

    fetchuser();
  }, [])

  return (
    <>
    <h5><BiSolidUserCircle /> {"   "}{user.name}</h5>
    <h5><MdEmail /> {"   "}{user.email}</h5>
      {/* <BiSolidUserCircle />
      <div>{user.name}</div>
      <div>{user.email}</div> */}
    </>

  )
}

export default Userdetails;