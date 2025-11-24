import React, { useState } from "react";
import "../../Styles/Header_Footer.css";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navcontainer nav-content">
        <div className="logo-section">
          <Link to="/">
            <h1 className="logo" onClick={closeMenu}>Budgify</h1>
          </Link>

          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`nav-links ${menuOpen ? "open" : "close"}`}>
          <ul>
            {user ? (
              <>
                <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
                <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>

                {user.role === "admin" && (
                  <li><Link to="/admin" onClick={closeMenu}>Admin Dashboard</Link></li>
                )}

                <li>
                  <button onClick={handleLogout} className="btn-navbar-primary">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                <li><Link to="/contact-us" onClick={closeMenu}>Contact-US</Link></li>

                <li>
                  <Link to="/login" onClick={closeMenu} className="btn-navbar-primary">
                    Get Started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
