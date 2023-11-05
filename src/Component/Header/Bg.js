import React, { useEffect, useState } from 'react'
import IMG1 from '../../Img/andras-vas-Bd7gNnWJBkU-unsplash.jpg'
import IMG2 from '../../Img/daniel-korpai-HyTwtsk8XqA-unsplash.jpg'
import IMG3 from '../../Img/steven-binotto-V3Q5Ens9vh0-unsplash.jpg'
import IMG4 from '../../Img/walling-nMqqEFhInkY-unsplash.jpg'
import IMG5 from '../../Img/best.jpg'
import './Bg.css'
import Typewriter from 'typewriter-effect';
import axios from 'axios'
function Bg() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('https://my-website-back-end.onrender.com/get/content'); // Replace with your server URL
       setSkills(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);


// const Background={backgroundImage:`url(${use[num].img})`
const Background={backgroundImage:`url(${IMG5})`  }
  return (
    <div className='BG' id='home'>
     <div className="BGS" >
     <div className="bg" style={Background}>
        <div className="bgs">
        <div className="center">
       {
        skills.map((e)=>(
          <div className="title" key={e._id}>
          <h3><span className='hoo'>{e.c1} </span> </h3>
          <h1><span><span style={{color:"white"}}></span>
          <h3 className='ans' style={{color:'orange'}}>
          {e.c2}
          </h3>
          </span></h1>  
          <h3>{e.c3}</h3>
          <span className='ans'><h3 style={{color:"gold"}} > 
          
          <Typewriter 
          options={{
            strings: ['html','css','javascript','react.js','node.js','express.js','mongoose','java','flask','mysqil','php','bootstrap','python','firebase','react-native'],
            autoStart: true,
            loop: true,
            }}
           /> 
          
          </h3></span>
          <div className="let">
          <a href="#contact"><button>let's Contact</button></a>
          </div>
          </div>
        ))
       }
        </div>
    
        </div>
      </div>

      
     </div>
    </div>
  )
}

export default Bg
