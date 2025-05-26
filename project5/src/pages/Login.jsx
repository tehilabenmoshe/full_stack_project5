import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    const res = await fetch(`http://localhost:3000/users?username=${username}&website=${password}`);
    const users = await res.json();
    console.log('Fetched users:', users);

    if (users.length > 0) {
      setUser(users[0]); 
      setUsername('');
      setPassword('');
      setIsLoggedIn(true);
    } else {
      setError('password or username is incorrect');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
