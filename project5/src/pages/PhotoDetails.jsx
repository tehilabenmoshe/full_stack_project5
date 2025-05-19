import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PhotoDetails() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/photos/${photoId}`)
      .then(res => res.json())
      .then(setPhoto);
  }, [photoId]);

  if (!photo) return <div>Loading...</div>;

  return (
    <div style={{ marginTop: 32 }}>
      <h3>{photo.title}</h3>
      <img src={photo.url} alt={photo.title} style={{ maxWidth: 400 }} />
    </div>
  );
}