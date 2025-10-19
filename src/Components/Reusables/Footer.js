import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h4 className="footer-title">Budgify</h4>
          <p>Take control of your financial future with our budget management tools.</p>
        </div>


        <div className="footer-column">
          <h5 className="footer-title">Quick Links</h5>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
          </ul>
        </div>


        <div className="footer-column">
          <h5 className="footer-title">Follow Us</h5>
          <div className="footer-social">
            <a href="https://www.facebook.com/">Facebook</a>
            <a href="https://twitter.com/">Twitter</a>
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://www.linkedin.com/">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <small>&copy; 2025 Budgify. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
