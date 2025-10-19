import React from "react";
import "./../Styles/About.css";

const About = () => {
  const content = {
    heroTitle: "Welcome to Budgify",
    heroSubtitle: "Smart budgeting, effortless tracking, secure data.",
    whoWeAre:
      "Budgify is a modern finance platform that helps you manage budgets, track expenses, and achieve your financial goals with ease.",
    mission:
      "To empower individuals to take control of their finances with intuitive, easy-to-use tools.",
    vision:
      "To create a world where managing money is simple, stress-free, and secure."
  };

  return (
    <div className="about-page">

      <section className="about-hero">
        <h1>{content.heroTitle}</h1>
        <p>{content.heroSubtitle}</p>
      </section>

      <section className="about-section">
        <h2>Who We Are</h2>
        <p>{content.whoWeAre}</p>

        <div className="mission-vision">
          <div className="card">
            <h4>Our Mission</h4>
            <p>{content.mission}</p>
          </div>
          <div className="card">
            <h4>Our Vision</h4>
            <p>{content.vision}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
