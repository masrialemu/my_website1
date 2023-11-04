import React, { useEffect, useState } from 'react'
import './Post.css'
import axios from 'axios';
function Post() {
  const [category, setCategory] = useState('portfolio');
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState('');
  const [github, setGithub] = useState('');
  const [live, setLive] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [name1, setName1] = useState('');
  const [contact, setContact] = useState('');
  const [c1, setC1] = useState('');
  const [c2, setC2] = useState('');
  const [c3, setC3] = useState('');
  const [c4, setC4] = useState('');
  const [cv, setCv] = useState('');
  const [hide,setHide]=useState(true)
  const [show,setShow]=useState(true)
  const [msg,setMsg]=useState('')
  const [desc1, setDesc1] = useState('');
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData ? userData.token : null;
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  

  useEffect(() => {
    // Use an ID or other identifier to fetch the specific content
    const contentId = 1; // Change this to the ID of the content you want to edit

    const fetchData = async () => {
      try {
        // Fetch data for the specific content using Axios
        const response = await axios.get(`https://my-website-back-end.onrender.com/get/content/1`);
        const contentData = response.data;

        // Populate the state with the fetched data
        setC1(contentData.c1);
        setC2(contentData.c2);
        setC3(contentData.c3);
        setC4(contentData.c4);
        setCv(contentData.cv);
        setDesc1(contentData.desc);

        // Handle the 'image' field if it's a file (you'll need to handle it differently)
      } catch (error) {
        console.error('Failed to fetch content data:', error);
      }
    };

    fetchData(); // Call the async fetchData function within useEffect
  }, []);

  const handlePostData = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', video);
    formData.append('github', github);
    formData.append('live', live);
    formData.append('desc', desc);
    if (file) {
      formData.append('image', file);
    }
  
    try {
      const response = await axios.post('https://my-website-back-end.onrender.com/post/project', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setMsg('Post is Successfully Uploaded')
        setShow(true)
        setHide(false)
        window.location.replace('/')
      }
    } catch (error) {
      setMsg('Post is not Successfully Uploaded')
      setShow(false)
      setHide(false)
      console.error(error);
    }
  };

  const handlePostSkill = async (e) => {
    e.preventDefault();

    const skillData = {
      name: name,
      value: value,
    };

    try {
      // Send a POST request to your server to add a new skill
      const response = await axios.post('https://my-website-back-end.onrender.com/post/skill', skillData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the authentication token
        },
        
      });

      if (response.status === 201) {
        setMsg('Skill is Successfully Uploaded')
        setShow(true)
        setHide(false)

      }
    } catch (error) {
      setMsg('Post is Successfully Uploaded')
      setShow(false)
      setHide(false)
      console.error(error);
    }
  };

  const handleEditData = async (id) => {
    try {
      const formData = new FormData();
      formData.append('c1', c1);
      formData.append('c2', c2);
      formData.append('c3', c3);
      formData.append('c4', c4);
      formData.append('cv', cv);
      formData.append('desc', desc1);
      if (file) {
        formData.append('image', file);
      }

      // Make a PUT request to update the content
      const response = await axios.put(`https://my-website-back-end.onrender.com/edit/content/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the authentication token
        },
      });

      setMsg('Content is Successfully Edited')
      setShow(true)
      setHide(false)
      console.log('Content updated successfully:');
      window.location.replace('/')
    } catch (error) {
      setMsg('Content is not Successfully Edited')
      setShow(false)
      setHide(false)
      console.error('Content update failed:', error);
    }
  };

  
    const handlePostContact = async (e) => {
      e.preventDefault();
  
      const contactData = {
        name: name1,
        value: contact,
      };
  
      try {
        // Send a POST request to your server to add new contact information
        const response = await axios.post('https://my-website-back-end.onrender.com/post/info', contactData, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the authentication token
          },
        });
  
        if (response.status === 201) {
          setMsg('Information is Successfully Uploaded')
          setShow(true)
          setHide(false)
          console.log('Contact information added successfully.');
        }
      } catch (error) {
        setMsg('Information is not Successfully Uploaded')
        setShow(false)
        setHide(false)
        console.error(error);
      }
    };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

 return (
    <div>
      <main>
        <div className="containerx">
        {!hide && <div className="cm">{show ? <div className='cm'><p>The {msg} </p></div>:<div className='cm1'><p>The {msg}</p></div>}</div>}

          <h1 className="post-title">Create a New Post</h1>
          <div>
          <select value={category} onChange={handleCategoryChange}>
            <option value="portfolio">Portfolio</option>
            <option value="skill">Skill</option>
            <option value="information">information</option>
            <option value="content">Content</option>
          </select>
          {category === 'portfolio' && (
            <div>
            <label htmlFor="title" className="post-label">Title:</label>
            <input type="text" id="title" name="title" required className="post-input" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label htmlFor="video" className="post-label">Video:</label>
            <input type="text" id="video" name="video" required className="post-input" value={video} onChange={(e) => setVideo(e.target.value)} />
            <br />
            <label htmlFor="github" className="post-label">Github:</label>
            <input type="text" id="github" name="github" required className="post-input" value={github} onChange={(e) => setGithub(e.target.value)} />
            <br />
            <label htmlFor="live" className="post-label">Live:</label>
            <input type="text" id="live" name= "live" required className="post-input" value={live} onChange={(e) => setLive(e.target.value)} />
            <br />
            <label htmlFor="description" className="post-label">Description:</label>
            <textarea id="description" name="description" required className="post-textarea" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <br />
            <label htmlFor="image" className="post-label">Image:</label>
            <input type="file" id="image" name="image" className="post-input" onChange={handleFileChange} />
            <br />
            <div className="image-preview">
              {file && (
                <img id="image-preview" src={URL.createObjectURL(file)} alt="Image Preview" className="post-image" />
              )}
            </div>
            <br />
            <button onClick={handlePostData} className="post-button">Post Project</button>
          </div>
          )}
          {category === 'skill' && (
            <div className="post-form">
            <label htmlFor="name" className="post-label">Name:</label>
            <input type="text" id="name" name="name" required className="post-input" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <label htmlFor="value" className="post-label">Value:</label>
            <input type="number" id="value" name="value" required className="post-input numx" value={value} onChange={(e) => setValue(e.target.value)} />
            <br />
            <button onClick={handlePostSkill} className="post-button">Post Skill</button>
          </div>
          )}
          {category === 'information' && (
            <div className="post-form" encType="multipart/form-data">
            <label htmlFor="name" className="post-label">Name:</label>
            <input type="text" id="name" name="name" required className="post-input" value={name1} onChange={(e) => setName1(e.target.value)} />
            <br />
            <label htmlFor="contact" className="post-label">Contact:</label>
            <input type="text" id="contact" name="contact" required className="post-input numx" value={contact} onChange={(e) => setContact(e.target.value)} />
            <br />
            <button onClick={handlePostContact} className="post-button">Post Contact</button>
          </div>
          )}
          {category === 'content' && (
            <div>
            <label htmlFor="title" className="post-label">Content 1:</label>
            <input type="text" id="title" name="title" required className="post-input" value={c1} onChange={(e) => setC1(e.target.value)} />
            <br />
            <label htmlFor="video" className="post-label">Content 2:</label>
            <input type="text" id="video" name="video" required className="post-input" value={c2} onChange={(e) => setC2(e.target.value)} />
            <br />
            <label htmlFor="github" className="post-label">Content 3:</label>
            <input type="text" id="github" name="github" required className="post-input" value={c3} onChange={(e) => setC3(e.target.value)} />
            <br />
            <label htmlFor="live" className="post-label">Content 4:</label>
            <input type="text" id="live" name= "live" required className="post-input" value={c4} onChange={(e) => setC4(e.target.value)} />
            <br />
            <label htmlFor="live" className="post-label">Cv :</label>
            <input type="text" id="live" name= "live" required className="post-input" value={cv} onChange={(e) => setCv(e.target.value)} />
            <br />
            <label htmlFor="description" className="post-label">Description:</label>
            <textarea id="description" name="description" required className="post-textarea" value={desc1} onChange={(e) => setDesc1(e.target.value)} />
            <br />
            
            <label htmlFor="image" className="post-label">Image:</label>
            <input type="file" id="image" name="image" className="post-input" onChange={handleFileChange} />
            <br />
            <div className="image-preview">
              {file && (
                <img id="image-preview" src={URL.createObjectURL(file)} alt="Image Preview" className="post-image" />
              )}
            </div>
            <br />
            <button onClick={()=>handleEditData(1)} className="post-button">Post Project</button>
          </div>
          )}
        </div>
        </div>
      </main>
    </div>
  );
  
}
export default Post