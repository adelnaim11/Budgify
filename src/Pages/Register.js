import React, { useState } from "react";
import "./../Styles/register.css"; 
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setMessage(data.message);
        setFormData({ username: "", email: "", password: "", confirm_password: "" });
      } else {
        setSuccess(false);
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again later.");
      setSuccess(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {message && (
        <div
          className={`alert ${success ? "alert-success" : "alert-error"}`}
          style={{
            background: success ? "#d4edda" : "#f8d7da",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-box">
          <label>Username</label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            required
            value={formData.confirm_password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
