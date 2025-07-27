import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userRole = await loginUser(username, password);
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'driver') {
        navigate('/driver');
      } else if (userRole === 'customer') {
        navigate('/customer');
      } else {
        setError('Invalid role');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007BFF', color: '#fff', border: 'none' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
