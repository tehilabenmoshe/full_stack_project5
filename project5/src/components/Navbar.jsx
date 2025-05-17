import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
      <NavLink to="/todos" className={({ isActive }) => isActive ? 'active' : ''}>Todos</NavLink>
      <NavLink to="/posts" className={({ isActive }) => isActive ? 'active' : ''}>Posts</NavLink>
      <NavLink to="/albums" className={({ isActive }) => isActive ? 'active' : ''}>Albums</NavLink>
      <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
      <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>Register</NavLink>
    </nav>
  );
}

export default Navbar;