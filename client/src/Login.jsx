import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/signin', { email, password });

      if (response.status === 200) {
        console.log('Login successful');
        // Uncomment the following line to redirect to the Homepage after successful login
        navigate('/homepage');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        {/* Email Field */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Field */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button type="button" onClick={handleLogin}>
          Login
        </button>

        {/* Registration Button */}
        <Link to="/register">
          <button type="button">Register</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
