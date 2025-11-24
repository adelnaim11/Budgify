import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Login from "./Pages/Login";
import LandingPage from "./Pages/LandingPage";
import Header from "./Components/Reusables/Header";
import Footer from "./Components/Reusables/Footer";
import SignupPage from "./Pages/Signup";
import AboutPage from "./Pages/About";
import ContactPage from "./Pages/Contact";
import Dashboard from "./Pages/dashboard";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
