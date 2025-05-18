import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ setUser }) {
  const navigate = useNavigate();

  const HandleLogout = () => {
    setUser(null); // זה יסיר גם מה-localStorage דרך useEffect
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
      <NavLink to="/todos" className={({ isActive }) => isActive ? 'active' : ''}>Todos</NavLink>
      <NavLink to="/posts" className={({ isActive }) => isActive ? 'active' : ''}>Posts</NavLink>
      <NavLink to="/albums" className={({ isActive }) => isActive ? 'active' : ''}>Albums</NavLink>
      <NavLink className="logout" to="#" onClick={HandleLogout}>Logout</NavLink>
    </nav>
  );
}

export default Navbar;
