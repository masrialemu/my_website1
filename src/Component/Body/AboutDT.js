import React, { useState,useEffect } from 'react'
import {AiOutlineRight } from "react-icons/ai";
import './AboutDT.css'
import axios from 'axios';
import { AiFillDelete} from "react-icons/ai";

function AboutDT() {

  const [skills, setSkills] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData ? userData.token : null;
  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const response = await axios.get('https://my-website-back-end.onrender.com/get/info'); // Replace with your server URL
        setSkills(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);


  const handleDelete = (id) => {
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
  
    if (userConfirmed) {
      
      axios.delete(`https://my-website-back-end.onrender.com/delete/info/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('Item deleted successfully');
          // Redirect or perform any other actions after successful deletion
          window.location.reload();
        })
        .catch((error) => {
          // Handle the error here
          console.error('Error deleting item', error);
        });
    } else {
      console.log('Deletion canceled by user');
      // You can choose to do nothing or display a message to the user
    }
  };

  return (
    
    <div className='Dt'>
    <div className="list">
    <div className="lists">
    <div className='ff'>
    {skills.map((skill) => (
    <span className='nx' key={skill._id}><span className='nm'><AiOutlineRight style={{margin:'0px'}} /> {skill.name}:</span> {skill.value}
   {
    token ? <AiFillDelete
    className='byy'
    onClick={() => handleDelete(skill._id)} // Pass the ID to the handler
  />:null
   }

</span>    
    ))}
    </div>
    </div>    
    </div>
    </div>
  )
}

export default AboutDT
