import { useParams,useNavigate, Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaSave,FaArrowLeft, FaTrash,FaPlus,FaTimes } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

export default function AlbumPhotos() {
  const { albumId, photoId } = useParams();
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: '', url: '' });
  const [editPhotoId, setEditPhotoId] = useState(null);
  const [editPhoto, setEditPhoto] = useState({ title: '', url: '' });
  const navigate = useNavigate();
  const photosPerPage = 15; // 3 rows of 5 photos

  // Load photos from server with pagination
  const loadPhotos = async (pageNum) => {
    setLoading(true);
    try {
      const start = (pageNum - 1) * photosPerPage;
      const res = await fetch(`http://localhost:3000/photos?albumId=${albumId}&_start=${start}&_limit=${photosPerPage}`);
      const data = await res.json();
      
      if (pageNum === 1) {
        setDisplayedPhotos(data);
      } else {
        setDisplayedPhotos(prev => [...prev, ...data]);
      }
      
      // If we got fewer photos than requested, we've reached the end
      setHasMore(data.length === photosPerPage);
    } catch (error) {
      console.error('Failed to load photos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial photos
  useEffect(() => {
    loadPhotos(1);
  }, [albumId]);

  const loadMorePhotos = () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadPhotos(nextPage);
  };

  // Add photo
  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!newPhoto.title.trim() || !newPhoto.url.trim()) return;
    const photoToAdd = {
      albumId: albumId,
      title: newPhoto.title.trim(),
      url: newPhoto.url.trim(),
      thumbnailUrl: newPhoto.url.trim()
    };
    const res = await fetch('http://localhost:3000/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photoToAdd)
    });
    const created = await res.json();
    setDisplayedPhotos(prev => [created, ...prev]); // Add to beginning
    setShowAdd(false);
    setNewPhoto({ title: '', url: '' });
  };

  // Delete photo
  const handleDeletePhoto = async (id) => {
    await fetch(`http://localhost:3000/photos/${id}`, { method: 'DELETE' });
    setDisplayedPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  // Start edit
  const startEditPhoto = (photo) => {
    setEditPhotoId(photo.id);
    setEditPhoto({ title: photo.title, url: photo.url });
  };

  // Save edit
  const handleEditPhoto = async (e) => {
    e.preventDefault();
    const updatedPhoto = {
      title: editPhoto.title,
      url: editPhoto.url,
      thumbnailUrl: editPhoto.url
    };
    await fetch(`http://localhost:3000/photos/${editPhotoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPhoto)
    });
    setDisplayedPhotos(prev =>
      prev.map(photo =>
        photo.id === editPhotoId ? { ...photo, ...updatedPhoto } : photo
      )
    );
    setEditPhotoId(null);
    setEditPhoto({ title: '', url: '' });
  };

  if (photoId) {
    return <Outlet />;
  }

  return (
    <div className="photos-container">
      <div className="photos-header">
        <button className='add-photo-button' onClick={() => setShowAdd(s => !s)} >
          {showAdd ? <><FaTimes /> Cancel</> : <><FaPlus /> Add Photo</> }
        </button>
        <h2 >Album {albumId}</h2>
        <button className='back-button-a' onClick={() => navigate(-1)}>
          <FaArrowLeft/>Go Back to Albums list
        </button>
      </div>
      {showAdd && (
        <form onSubmit={handleAddPhoto} className='photo-add-form'>
          <input
            type="text"
            placeholder="Photo title"
            value={newPhoto.title}
            onChange={e => setNewPhoto(p => ({ ...p, title: e.target.value }))}
            required
            style={{ marginRight: 8 }}
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={newPhoto.url}
            onChange={e => setNewPhoto(p => ({ ...p, url: e.target.value }))}
            required
          />
          <button type="submit"><FaSave/></button>
        </form>
      )}
      <div className="photos-grid">
        {displayedPhotos.map(photo => (
          <div key={photo.id} className="photo-item">
            {editPhotoId === photo.id ? (
              <form onSubmit={handleEditPhoto} className='photo-edit-form'>
                <input
                  type="text"
                  value={editPhoto.title}
                  onChange={e => setEditPhoto(p => ({ ...p, title: e.target.value }))}
                  required
                />
                <input
                  type="text"
                  value={editPhoto.url}
                  onChange={e => setEditPhoto(p => ({ ...p, url: e.target.value }))}
                  required
                />
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditPhotoId(null)}>Cancel</button>
              </form>
            ) : (
              <div className="photo-container">
                <Link to={`photos/${photo.id}`}>
                  <img src={photo.url} alt={photo.title} />
                  <div className="photo-title">{photo.title}</div>
                </Link>
                <div className="photo-actions">
                  <button onClick={() => startEditPhoto(photo)} ><MdModeEdit/></button>
                  <button onClick={() => {if (confirm('Are you sure you want to delete this photo?'))
                    handleDeletePhoto(photo.id)}}><FaTrash/></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {loading && (
        <div className="loading-indicator">
          <p>loading more photos</p>
        </div>
      )}
      
      {hasMore && !loading && (
        <div className="load-more-container">
          <button onClick={loadMorePhotos} className="load-more-button">
            Load more
          </button>
        </div>
      )}
      
      {!hasMore && displayedPhotos.length > 0 && (
        <div className="end-message">
          <p>there are no more photos</p>
        </div>
      )}
    </div>
  );
}