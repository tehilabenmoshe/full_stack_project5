import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainImg from '../assets/main.png';
import todosImg from '../assets/todos.png';
import postsImg from '../assets/posts.png';
import albumsImg from '../assets/albums.png';
import albumsImg2 from '../assets/albums2.png';


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
          <h1>Welcome Back, {user ? ` ${user.username}` : ''}!</h1>
          <p>Your gateway to managing tasks, posts, and more! <br/> So let's get start!!</p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/todos')}>Todos</button>
            <button onClick={() => navigate('/posts')}>Posts</button>
            <button onClick={() => navigate('/albums')}>Albums</button>
            <button onClick={() => navigate('/info')}>Info</button>
          </div>
        </div>
        <div className="hero-image">
          <img className="albums-img" src={mainImg} alt="dashboard illustration" />
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-text">
          <h2>MANAGE ALL YOUR TODOS</h2>
          <p>Track your Todos, manage Posts, view Albums and Info with a modern and user-friendly interface.</p>
          <button className="demo-button" onClick={() => navigate('/todos')}>Todos</button>
        </div>
          <div className="feature-image">
            <img src={todosImg} alt="Todos Illustration" />
          </div>   
      </section>

      <section className="hero-section">
        <div className="feature-text">
          <h2>RESPONES OTHER'S POSTS</h2>
          <p>Track your Todos, manage Posts, view Albums and Info with a modern and user-friendly interface.</p>
          <button className="demo-button" onClick={() => navigate('/posts')}>Posts</button>
        </div>
         <div className="feature-image">
            <img src={postsImg} alt="Todos Illustration" />
          </div>
      </section>

      <section className="feature-section">
        <div className="feature-text">
          <h2>WATCH YOUR ALBUMS</h2>
          <p>Track your Todos, manage Posts, view Albums and Info with a modern and user-friendly interface.</p>
          <button className="demo-button" onClick={() => navigate('/albums')}>Albums</button>
        </div>
        <div className="feature-image">
          <img src={albumsImg} alt="Todos Illustration" />
        </div>
      </section>


      <section className="footer-section">
        <p>Made with ❤️ byTamar & Tehila | 2025</p>
      </section>
    </div>
  );
}