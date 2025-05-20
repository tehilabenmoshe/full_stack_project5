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
    <div className='home-container'>
      <h1>Welcome Back {user ? `, ${user.username}` : ''}!</h1>
      <div className='main-button-container'>
        <button onClick={() => navigate('/todos')} className='main-button'>Todos</button>
        <button onClick={() => navigate('/posts')} className='main-button' >Posts</button>
        <button onClick={() => navigate('/albums')} className='main-button'>Albums</button>
        <button onClick={() => navigate('/info')} className='main-button' >Info</button>
      </div>
    </div>
  );
}