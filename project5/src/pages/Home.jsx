import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <div>
      <h1>Welcome{user ? `, ${user.username}` : ''}!</h1>
      <div>
        <button onClick={() => navigate('/todos')} >Todos</button>
        <button onClick={() => navigate('/posts')} >Posts</button>
        <button onClick={() => navigate('/albums')} >Albums</button>
        <button onClick={() => navigate('/info')} >Info</button>
      </div>
    </div>
  );
}