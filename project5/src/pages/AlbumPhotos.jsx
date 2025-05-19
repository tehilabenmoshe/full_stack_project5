import { useParams, Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AlbumPhotos() {
  const { albumId, photoId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const photosPerPage = 15; // 3 rows of 5 photos

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/photos?albumId=${albumId}`)
      .then(res => res.json())
      .then(data => {
        setPhotos(data);
        setDisplayedPhotos(data.slice(0, photosPerPage)); // Load initial photos
        setHasMore(data.length > photosPerPage);
        setLoading(false);
      });
  }, [albumId]);

  const loadMorePhotos = () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * photosPerPage;
    const endIndex = nextPage * photosPerPage;
    
    setTimeout(() => {
      setDisplayedPhotos(prevPhotos => [
        ...prevPhotos,
        ...photos.slice(startIndex, endIndex)
      ]); //add the next photos page
      
      setPage(nextPage);
      setHasMore(endIndex < photos.length);
      setLoading(false);
    }, 300); // Small delay to simulate loading
  };

  if (photoId) {
    return <Outlet />;
  }

  return (
    <div className="album-container">
      <h2>Photos in Album {albumId}</h2>
      
      <div className="photos-grid">
        {displayedPhotos.map(photo => (
          <Link 
            key={photo.id} 
            to={`photos/${photo.id}`}
            className="photo-item"
          >
            <img src={photo.url} alt={photo.title} />
            <div className="photo-title">{photo.title}</div>
          </Link>
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
            reload more
          </button>
        </div>
      )}
      
      {!hasMore && photos.length > 0 && (
        <div className="end-message">
          <p>there are no more photos</p>
        </div>
      )}
    </div>
  );
}