import React, { useState } from "react";
import "../Styles/Profile.css";

const ProfilePage = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMessage("Profile updated (frontend-only).");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setMessage("Password changed (frontend-only).");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setMessage("Email changed (frontend-only).");
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      {message && <p className="profile-message">{message}</p>}

      <div className="profile-card">
        <form className="profile-form" onSubmit={handleUpdateProfile}>
          <h3>Update Info</h3>

          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            oNnChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
          />

          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
          />

          <button type="submit" className="btn-primary">
            Update Profile
          </button>
        </form>

        <form className="profile-form" onSubmit={handleChangePassword}>
          <h3>Change Password</h3>

          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />

          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />

          <button type="submit" className="btn-primary">
            Change Password
          </button>
        </form>

        <form className="profile-form" onSubmit={handleEmailChange}>
          <h3>Change Email</h3>

          <label>Current Email</label>
          <input
            type="email"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            placeholder="Enter current email"
          />

          <button type="submit" className="btn-primary">
            Change Email
          </button>
        </form>
      </div>

      <div className="container-dashboard"></div>
    </div>
  );
};

export default ProfilePage;
