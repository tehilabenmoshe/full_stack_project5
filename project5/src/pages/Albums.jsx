import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const { albumId } = useParams(); 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user.id);
      fetch(`http://localhost:3000/albums?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setAlbums(data);
          setFiltered(data);
        });
    }
  }, []);

  useEffect(() => {
    setFiltered(
      albums.filter(
        album =>
          album.id.toString().includes(search) ||
          album.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, albums]);

  const handleAddAlbum = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !userId) return;
    const newAlbum = {
      userId,
      title: newTitle.trim()
    };
    const res = await fetch('http://localhost:3000/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAlbum)
    });
    const created = await res.json();
    setAlbums(prev => [...prev, created]);
    setFiltered(prev => [...prev, created]);
    setShowAdd(false);
    setNewTitle('');
  };

  if (albumId) {
    return <Outlet />;
  }

  return (
    <div className="albums-container">
      <h1>Your Albums</h1>
      
      {showAdd && (
        <form onSubmit={handleAddAlbum}>
          <input
            type="text"
            placeholder="Album title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
      )}
      
      <div className="albums-controls">
        <input
          type="text"
          placeholder="Search by id or title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="albums-search"
        />
        <button
          className="add-album-button"
          onClick={() => setShowAdd(s => !s)}
        >
          {showAdd ? 'x' : '+'}
        </button>
      </div>

      <div className="albums-grid">
        {filtered.map(album => (
          <Link
            key={album.id}
            to={`/albums/${album.id}`}
            className="album-card"
          >
            <div className="album-id">ID: {album.id}</div>
            <div className="album-title">{album.title}</div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="albums-empty">No albums found.</div>
        )}
      </div>
    </div>
  );
};

export default Albums;