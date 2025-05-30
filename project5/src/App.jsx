import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Todos from './pages/Todos';
import Posts from './pages/Posts';
import Albums from './pages/Albums';
import Navbar from './components/Navbar';
import Info from './pages/Info';
import CompleteRegistration from './pages/CompleteRegistration';
import AlbumPhotos from './pages/AlbumPhotos';
import PhotoDetails from './pages/PhotoDetails';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <div>
      {user && <Navbar setUser={setUser} />}
      <div className="page-container">
      <Routes >
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complete-registration" element={<CompleteRegistration setUser={setUser} />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/info" element={user ? <Info /> : <Navigate to="/login" />} />
        <Route path="/todos" element={user ? <Todos /> : <Navigate to="/login" />} />
        <Route path="/posts" element={user ? <Posts /> : <Navigate to="/login" />} />
        <Route path="/albums" element={user ? <Albums /> : <Navigate to="/login" />}>
          <Route path=":albumId" element={user ? <AlbumPhotos /> : <Navigate to="/login" />}>
            <Route path="photos/:photoId" element={user ? <PhotoDetails /> : <Navigate to="/login" />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
