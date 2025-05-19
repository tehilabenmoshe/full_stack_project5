import { useState } from 'react';
import { Navigate,Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [verify, setVerify] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (website !== verify) {
      setError('the passwords do not match');
      return;
    }

    const res = await fetch(`http://localhost:3000/users?username=${username}`);
    const users = await res.json();

    if (users.length > 0) {
      setError('username already exists');
      return;
    }
    localStorage.setItem('tempUser', JSON.stringify({ username, website }));    
    setIsRegistered(true);
  };

  if (isRegistered) {
    return <Navigate to="/complete-registration"  replace />;
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
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
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
