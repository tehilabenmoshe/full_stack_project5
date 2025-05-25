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
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Welcome Back{user ? `, ${user.username}` : ''}!</h1>
          <p>Your gateway to managing tasks, posts, and more!</p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/todos')}>Todos</button>
            <button onClick={() => navigate('/posts')}>Posts</button>
            <button onClick={() => navigate('/albums')}>Albums</button>
            <button onClick={() => navigate('/info')}>Info</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="./assets/albums.png" alt="dashboard illustration" />
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-text">
          <h2>MANAGE ALL YOUR TODOS</h2>
          <p>Track your Todos, manage Posts, view Albums and Info with a modern and user-friendly interface.</p>
          <button className="demo-button" onClick={() => navigate('/todos')}>Todos</button>
        </div>
      </section>

      <section className="hero-section">
        <div className="feature-text">
          <h2>RESPONES OTHER'S POSTS</h2>
          <p>Track your Todos, manage Posts, view Albums and Info with a modern and user-friendly interface.</p>
          <button className="demo-button" onClick={() => navigate('/posts')}>Posts</button>
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-text">
          <h2>WATCH YOUR ALBUMS</h2>
          <p>Track your Todos, manage Posts, view Albums and Info with a modern and user-friendly interface.</p>
          <button className="demo-button" onClick={() => navigate('/albums')}>Albums</button>
        </div>
      </section>


      <section className="footer-section">
        <p>Made with ❤️ byTamar & Tehila | 2025</p>
      </section>
    </div>
  );
}