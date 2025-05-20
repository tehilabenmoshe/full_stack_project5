import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

export default function PhotoDetails() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/photos/${photoId}`)
      .then(res => res.json())
      .then(setPhoto);
  }, [photoId]);

  if (!photo) return <div>Loading...</div>;

  return (
    <div className="photo-details-container">
    <button className='back-button' onClick={() => navigate(-1)}><FaArrowLeft/> Go Back to Album</button>

    <div className="photo-details">
      <img src={photo.url} alt={photo.title} />
      <h3>{photo.title}</h3>
    </div>

    </div>
  );
}