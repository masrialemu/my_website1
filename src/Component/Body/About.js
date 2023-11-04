import React, { useEffect, useState } from 'react'
import './About.css'
import axios from 'axios';
function About({e}) {
  const [Btn,setBtn]=useState(false)
  const [skills, setSkills] = useState([]);
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('https://my-website-back-end.onrender.com/get/content'); // Replace with your server URL
       setSkills(response.data)
       console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);

  

  const SeeMore=()=>{
    setBtn(p=>!p)
  }
  const Text={
    WebkitLineClamp:Btn ? `${100}`:`${10}`
  }

  return (
    <div className='About' id='about'>
      <div className="about">
      <span>About Me</span>
      <h3>who i'm</h3>
        {
          skills.map((e)=>(
            <div className="abouts">
         <div className="list">
         <div className="imgs">
         <img src={e.image} alt={e.image}  className='imgh'  />
         </div>
         <div className="det">
         <div className="Text">
         <div className="text" >
          <p style={Text}>
         {e.desc}
          </p> 
         </div>
         <div className="mr">
         {
          !Btn ?<input type="button" value="More" onClick={SeeMore} />
          :<input type="button" value="Hide" onClick={SeeMore} />
         }
        </div>
         <div className="btn">
          <a href={e.cv}><button className='dtt'>Download CV</button></a>
          <a href="#contact"><button>Let's Contact</button></a>
         </div>
         </div>
         </div>

         </div>
        </div>
          ))
        }
      </div>
    </div>
  )
}

export default About
