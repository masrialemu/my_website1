import React, { useEffect, useState } from 'react';
import './Portfolio.css';
import axios from 'axios';
import { AiFillDelete} from "react-icons/ai";



function Portfolio() {
  
  const [projects, setProjects] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData ? userData.token : null;
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://my-website-back-end.onrender.com/get/project');
            setProjects(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchData(); 
}, []); // Empty dependency array, meaning it will run once when the component mounts

const handleDelete1 = async (id) => {
  const userConfirmed = window.confirm(`Are you sure you want to delete"?`);

  if (userConfirmed) {
    try {
      const response = await axios.delete(`https://my-website-back-end.onrender.com/delete/project/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Project deleted successfully');
      // You can handle redirection or other actions after successful deletion here
      window.location.reload();
    } catch (error) {
      // Handle the error here
      console.error('Error deleting project', error);
    }
  } else {
    console.log('Deletion canceled by user');
    // You can choose to do nothing or display a message to the user
  }
};




  return (
    <div className="portos" id='portfolio'>
      <div className='port' >
        <div className="ports">
          <span>Portfolio</span>
          <h3>who I am</h3>

            <div className="Ports">
                    
          {projects.map((project) => (
              <div className="lport" key={project._id}>
                <div className="imgxx">
                  <img src={project.image} alt="Project" />
                </div>
                <div className="dit">
                  <div className="time">{new Date(project.createdAt).getFullYear()}
                  </div>
                  <div className="title">{project.title}</div>
                </div>
                <div className="btn">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <button className='git'>GitHub</button>
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <button className='live'>Live</button>
                  </a>
                  <a href={`/project/${project._id}`} target="_blank">
                   <button className="live">Detail</button>
                  </a>
                  <a href={project.video} target="_blank">
                  <button className="live">Video</button>
                 </a>
       
                 {
                  token ? <button className='dlx'>
                  <AiFillDelete className='byy'  onClick={()=>handleDelete1(project._id)} />
                  </button>
         :null
                 }
                
                </div>
              </div>
              ))}
          </div>
         

        </div>
      </div>
    </div>

  );
}

export default Portfolio;
