import React, { useEffect, useState } from "react";
import "../Styles/Contact.css";
import Arrows from "../Components/Reusables/Arrows";

const ContactPage = () => {
  const [formSent, setFormSent] = useState(false);

  const contact = {
    title: "Our Contact Information",
    email: "support@budgify.com",
    phone: "+123 456 789",
    address: "123 Finance Street, Budget City",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Message Sent!\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );

    setFormSent(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>
            Have questions or feedback? Reach out to our team and we’ll get back
            to you promptly.
          </p>
        </div>
        {Arrows()}
      </section>

      <section className="contact-form-section">
        <div className="container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className={formSent ? "btn-success" : "btn-contact"}
              disabled={formSent}
            >
              {formSent ? "Message was successfully sent!" : "Send Message"}
            </button>
          </form>

          <div className="contact-info">
            <h3>{contact.title}</h3>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Address: {contact.address}</p>
          </div>
        </div>
      </section>

      <div className="container-grid"></div>
    </div>
  );
};

export default ContactPage;
