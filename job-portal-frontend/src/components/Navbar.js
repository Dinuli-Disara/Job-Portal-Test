import React, {useEffect, useState} from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Check if user is logged in and retrieve user role from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <NavLink to="/" className="logo">JobWell</NavLink>
        </div>

        {/* Main Navigation Links: Show only if logged in */}
        { isLoggedIn && (
          <nav className="navbar-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
            <NavLink to="/jobs" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Jobs</NavLink>
            <NavLink to="/explore" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Explore</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact us</NavLink>
            <NavLink to="/store" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Store</NavLink>
          </nav>
        )}

        {/* Login Button */}
        <div className="navbar-auth">
          {!isLoggedIn ? (
            <NavLink to="/login" className="auth-btn login-btn">SIGN IN / SIGN UP</NavLink>
          ) : (
            <>
              <NavLink to="/profile" className="auth-btn profile-btn">Profile</NavLink>
              <button 
                className="auth-btn logout-btn" 
                onClick={() => {
                  localStorage.removeItem('user');
                  setIsLoggedIn(false);
                  setUserRole('');
                  navigate('/');
                }}
              >
                Logout  
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;