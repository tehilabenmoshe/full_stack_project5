import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ setUser }) {
  const navigate = useNavigate();

  const HandleLogout = () => {
    setUser(null); 
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
       
        <span className="brand">LOGO</span>
      </div>

      <div className="navbar-center">
        <NavLink to="/home" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>Home</NavLink>
        <NavLink to="/todos" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>Todos</NavLink>
        <NavLink to="/posts" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>Posts</NavLink>
        <NavLink to="/albums" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>Albums</NavLink>
        <NavLink to="/info" className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'}>Info</NavLink>
      </div>

      <div className="navbar-right">
        <NavLink to="/login" className="signin" onClick={HandleLogout}>Logout</NavLink>
        <NavLink to="/signup" className="get-started-link">Get Started</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
