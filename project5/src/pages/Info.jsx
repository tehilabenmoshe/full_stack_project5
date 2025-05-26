import { useEffect, useState } from 'react';
import { FaEdit ,FaUserCircle } from "react-icons/fa";


function renderUserInfo(obj, edited, setEdited, editing, parentKey = '') {
  return (
    <ul className="user-details">
      {Object.entries(obj).map(([key, value]) => {
        if (key === 'id' || key === 'website' ||key==='name') return null;
        const fieldPath = parentKey ? `${parentKey}.${key}` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          return (
            <li key={fieldPath}>
              <strong>{key}:</strong>
              <div className="nested-info">
                {Object.keys(value).length > 0
                  ? renderUserInfo(value, edited, setEdited, editing, fieldPath)
                  : <span> </span>}
              </div>
            </li>
          );
        } else {
          return (
            <li key={fieldPath}>
              <strong>{key}:</strong>{' '}
              {editing ? (
                <input
                  value={edited[fieldPath] ?? value ?? ''}
                  onChange={e =>
                    setEdited(prev => ({ ...prev, [fieldPath]: e.target.value }))
                  }
                />
              ) : (
                value === undefined || value === null || value === ''
                  ? ' '
                  : String(value)
              )}
            </li>
          );
        }
      })}
    </ul>
  );
}

function setDeep(obj, path, value) {
  const keys = path.split('.');
  const last = keys.pop();
  let curr = obj;
  for (const k of keys) {
    if (!curr[k]) curr[k] = {};
    curr = curr[k];
  }
  curr[last] = value;
}

function applyEdits(user, edited) {
  const updated = JSON.parse(JSON.stringify(user));
  Object.entries(edited).forEach(([path, value]) => {
    setDeep(updated, path, value);
  });
  return updated;
}

function Info() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState({});

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleEdit = () => {
    setEditing(true);
    setEdited({});
  };

  const handleCancel = () => {
    setEditing(false);
    setEdited({});
  };

  const handleSave = async () => {
    if (!user) return;
    const updatedUser = applyEdits(user, edited);

    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(false);
    setEdited({});
  };

  if (!user) {
    return <div className="info">No connected user</div>;
  }

  return (
    <div className="info">
      <div className='info-card'>
      <div className="info-header">
        <FaUserCircle className='user-icon'/>
        <h2> {user.name || ''}</h2> 
           {!editing && (
          <button className="edit-btn" onClick={handleEdit}>
            <FaEdit />
          </button>
        )} 
      </div>
   

      {renderUserInfo(user, edited, setEdited, editing)} 

      {editing && (
        <div className="action-buttons">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default Info;
