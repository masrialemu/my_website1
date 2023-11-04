import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css'; // Import your CSS file if it exists.
import { useUser } from '../../Context/Context'; // Import your UserContext
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory(); // Initialize useHistory
  const { login } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
  
    axios.post("https://my-website-back-end.onrender.com/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      if (response.data.token) {
        // Save user data and token to local storage
        const userData = {
          username: username,
          token: response.data.token
        };
  
        // Set the user data in the context
        login(userData);
  
        // Save user data to local storage
        localStorage.setItem("userData", JSON.stringify(userData));
  
        // Redirect the user to the home page or perform any other actions
        history.push('/'); // Use history.push to navigate to the home page
      } else {
        setError('Invalid credentials. Please try again.');
      }
    })
    .catch((error) => {
      console.error(error);
      setError('An error occurred. Please try again later.');
    });
  };
  
  


  return (
    <div className="login">
    <div className="containerz">
      <h1 className="login-title">Login</h1>
      <div className="login-form" id="login-form">
        <label htmlFor="username" className="login-label">Email:</label>
        <input
          type="text"
          id="username"
          name="email"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <br />
        <label htmlFor="password" className="login-label">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <br />
        <input type="button" onClick={handleLogin} value="Login" className="login-button" />
      </div>

      <div className="login-success" id="login-success">
        Login successful!
      </div>

      <div className="login-failure" id="login-failure">
        Login failed. Please check your credentials and try again.
      </div>
    </div>

    <p className="sign-up-link"> <a>Forget Password</a></p>
  </div>
  );
}

export default Login;
