import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function CompleteRegistration({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const partialUser = JSON.parse(localStorage.getItem('tempUser'));
    if (!partialUser) {
      alert('No base user found. Please register again.');
      return;
    }

    const fullUser = {
      ...partialUser,
      name,
      email,
      address: {
        street,
        suite: "",
        city,
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone,
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    };

    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullUser),
      });

      if (res.ok) {
        const saved = await res.json();
        localStorage.setItem('user', JSON.stringify(saved));
        localStorage.removeItem('tempUser');
        setUser(saved);
        setIsComplete(true);
        alert('User saved successfully!');
      } else {
        alert('Failed to save user.');
      }
    } catch (err) {
      console.error(err);
      alert('An error happend while saving the user.');
    }
  };

  if (isComplete) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="complete-registration-container">
      <form onSubmit={handleSubmit} className="complete-registration-form">
        <h2>Complete Your Registration</h2>

        <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Street" value={street} onChange={e => setStreet(e.target.value)} />
        <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />

        <button type="submit">Save and Continue</button>
      </form>
    </div>
  );
}

export default CompleteRegistration;
