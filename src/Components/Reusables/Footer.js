import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../Styles/Header_Footer.css";

const Footer =()=> {
  return (
    <footer className="footer-modern">
      <div className="footer-container">
        <div className="footer-section brand">
          <h2 className="footer-logo">Budgify</h2>
          <p>
            Empowering you to take control of your finances with smart budgeting and clear insights.
          </p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact</h4>
          <p>Email: support@budgify.com</p>
          <p>Phone: +961 76445285</p>
          <div className="social-icons">
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-twitter-x"></i></a>
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Budgify — A Web-advanced Project Made By Adel Naim</p>
      </div>
    </footer>
  );
}
export default Footer;
