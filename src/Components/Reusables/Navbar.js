import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../Logo/logo2.png"
const Navbar = () => {
  const [navItems, setNavItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    fetch("/api/navbar_items.php")
      .then(res => res.json())
      .then(data => setNavItems(data))
      .catch(err => console.error("Navbar fetch error:", err));

    fetch("/api/auth_status.php")
      .then(res => res.json())
      .then(data => setIsLoggedIn(data.logged_in))
      .catch(err => console.error("Auth status error:", err));
  }, []);


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          <img src={logo} alt="Logo" />
        </a>

        <div className={`navbar-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          {navItems.map(item => {
            if (
              item.visible_for === "both" ||
              (item.visible_for === "guest" && !isLoggedIn) ||
              (item.visible_for === "loggedin" && isLoggedIn)
            ) {
              return (
                <li key={item.id}>
                  <a href={item.link}>{item.label}</a>
                </li>
              );
            }
            return null;
          })}
          <li className="login-btn">
            {isLoggedIn ? (
              <a className="navbar-btn" href="/logout">Logout</a>
            ) : (
              <a className="navbar-btn" href="/login">Login</a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
