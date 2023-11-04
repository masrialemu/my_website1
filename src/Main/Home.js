import React, { useEffect, useState } from 'react'
import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import LoadingPage from '../Component/Load/Loading'
import axios from 'axios'

function Home() {
  const [load,setLoad]=useState(true) 
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://my-website-back-end.onrender.com/get/project');
            setLoad(false)
        } catch (error) {
            console.error(error);
            
        }
    };

    fetchData(); 
}, []); // Empty dependency array, meaning it will run once when the component mounts

  
  return (
    <div>
    {
      load ? <LoadingPage/>:
      <div>
      <Header  />
      <Body />
      <Footer />
     </div>
    }
    </div>

)
  }
export default Home
