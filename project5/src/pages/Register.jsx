import { useState } from 'react';
import { Navigate,Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== verify) {
      setError('the passwords do not match');
      return;
    }

    const res = await fetch(`http://localhost:3000/users?username=${username}`);
    const users = await res.json();

    if (users.length > 0) {
      setError('username already exists');
      return;
    }

    const newUser = {
      username,
      website: password
    };

    const createdRes = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    const createdUser = await createdRes.json();

    localStorage.setItem('user', JSON.stringify(createdUser));
    setIsRegistered(true);
  };

  if (isRegistered) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          placeholder="verify password"
          value={verify}
          onChange={(e) => setVerify(e.target.value)}
        /><br />
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
