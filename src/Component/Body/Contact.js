import React, { useEffect, useState } from 'react'
import './Contact.css'
import {AiFillFacebook,AiFillGithub,AiOutlineTwitter,AiFillLinkedin, AiOutlineInstagram } from "react-icons/ai"
import {FaTelegram} from "react-icons/fa"
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};




function Contact() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
    const [hide,setHide]=useState(true)
    const [show,setShow]=useState(true)
    const [loading,setLoading]=useState(false)
  const Action=()=>{
    show(true)
  }
 
 
  const HandleSubmit = async(e) => {
      setLoading(true)
      e.preventDefault()
      if (email.trim() === '' || title.trim() === '') {
        setShow(false)
        setHide(false)
        setLoading(false)
      }else{
       const res=await axios.post('https://my-website-back-end.onrender.com/mail', { email, title, description })
      if(res.data){
        setShow(true)
        setHide(false)
        setLoading(false)
      }
      else{
        setHide(false) 
        setShow(false)
        setLoading(false)
      }
      setEmail("");
      setTitle("");
      setDescription("");
     }
      

 
}
   
  return (
    <div className='contact' id='contact'>
      <div className="contacts">
      <span>Contact Us</span>
      <h3>who i'm</h3>
      <div className="contactt">
      <div className="Contact">
  <div className="Share">
  <div className="share">
          <div>
          <h1><a href="https://www.linkedin.com/in/masresha-alemu-851241232" target="_blank" ><AiFillLinkedin/></a></h1>
          <h1><a href="https://github.com/masrialemu?tab=repositories" target="_blank" ><AiFillGithub/></a></h1>
   
          </div>
          <div>
          <h1><a href="https://www.facebook.com/profile.php?id=100013708891539" target="_blank" ><AiFillFacebook/></a></h1>
          <h1><a href="https://t.me/Masri404" target="_blank" ><FaTelegram/></a></h1>
         
          </div>
          <div>
          <h1><a href="https://www.MasriAlemu?s=01" target="_blank" ><AiOutlineTwitter/></a></h1>
          <h1><a href="#" target="_blank" ><AiOutlineInstagram/></a></h1>
       
          </div>
        </div>
  </div>
         
        <div className="box">
          
           <form onSubmit={HandleSubmit}>
           {!hide && <div className="cm">{show ? <div className='cm'><p>The Email is Successfully Sent</p></div>:<div className='cm1'><p>Please Fill in The Required Fields</p></div>}</div>}

           <input style={{color:"black",fontSize:"14px"}} type="email" placeholder='please, Enter Your Email'
           value={email}
           onChange={(event) => setEmail(event.target.value)}  />
           <input  style={{color:"black"}} name="title" className='email' placeholder='Please, Enter Your Title'  type="text"
           value={title}
           onChange={(event) => setTitle(event.target.value)} />
           <textarea name="desc" style={{color:"black"}} placeholder='Please, Enter Your Description'  value={description}
           onChange={(event) => setDescription(event.target.value)} ></textarea>
           {!loading ?
            <div className="Btn">
            <input type="submit"
            onClick={HandleSubmit}
            value="Send" className='btn' />
            </div>
            :
            <div className="Btn">
            <button type="submit"
            disabled
           className='btn'>
            <ClipLoader
        color="#36d7b7"
        loading={loading}
        cssOverride={override}
        size={13}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
            </button>
            </div>
          }

           
           </form>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Contact
