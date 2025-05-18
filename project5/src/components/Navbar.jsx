import { NavLink } from 'react-router-dom';

function Navbar() {
    const HandleLogout = () => {
        localStorage.removeItem('user');
    };
  return (
    <nav className="navbar">
      <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
      <NavLink to="/todos" className={({ isActive }) => isActive ? 'active' : ''}>Todos</NavLink>
      <NavLink to="/posts" className={({ isActive }) => isActive ? 'active' : ''}>Posts</NavLink>
      <NavLink to="/albums" className={({ isActive }) => isActive ? 'active' : ''}>Albums</NavLink>
      <button className="logout" onClick={HandleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;