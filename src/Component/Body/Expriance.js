import React, { useEffect, useState } from 'react'
import './Expriance.css'
import { AiFillDelete} from "react-icons/ai";
import axios from 'axios';

function Expriance({e}) {
  const [skills, setSkills] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData ? userData.token : null;
  
  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await axios.get('https://my-website-back-end.onrender.com/get/skill');
        setSkills(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSkills();
  }, []); // The empty dependency array ensures this runs once on component mount
 
  const handleDelete2 = (id) => {
    // Display a confirmation dialog
    const userConfirmed = window.confirm('Are you sure you want to delete this skill?');
  
    if (userConfirmed) {
      // Make an HTTP DELETE request to delete the skill
      axios
        .delete(`https://my-website-back-end.onrender.com/delete/skill/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          window.location.reload();
          // You can handle redirection or other actions after successful deletion here
        })
        .catch((error) => {
          // Handle the error here
          console.error('Error deleting skill', error);
        });
    } else {
      console.log('Deletion canceled by user');
      // You can choose to do nothing or display a message to the user
    }
  };
  

  return (
    <div>
      <div className='exp' id='exp'>
        <div className="exps">
          <span>My Skill</span>
          <h3>who i'm</h3>
  
          <div className="Exps">
            <div className='exlist'>
              {skills.map((skill) => (
                <div className='f1' key={skill._id}>
                  <h2>{skill.name}</h2>
                  <div className="html">
                    <div className="injv" style={{ width: `${skill.value}%` }}></div>
                  </div>
                 {
                  token ?
                  <AiFillDelete onClick={()=>handleDelete2(skill._id)} className='byy' />
                  :null
                 }
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
             

}  
export default Expriance
