import React, { useEffect, useState } from "react";
import "../Styles/About.css";
import TeamLogo from "../assets/Logo/team.png";
import Arrows from "../Components/Reusables/Arrows";

const AboutPage = () => {
  const staticData = {
    about: {
      hero_title: "About Budgify",
      hero_description: "Your smart tool to take control of your finances.",
      mission_title: "Our Mission",
      mission_text:
        "We aim to simplify personal finance and empower people to make smarter money decisions.",
      cta_title: "Ready to get started?",
      cta_text: "Join thousands of users already managing their finances better.",
      cta_link: "/signup",
    },
    team: [
      { id: 1, name: "John Carter", role: "Founder & CEO" },
      { id: 2, name: "Emily Smith", role: "Lead Developer" },
      { id: 3, name: "Mark Johnson", role: "UI/UX Designer" },
    ],
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(staticData);
  }, []);

  if (!data) return <div className="loading">Loading...</div>;

  const { about, team } = data;

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>{about.hero_title}</h1>
          <p>{about.hero_description}</p>
        </div>
        {Arrows()}
        <div className="container-grid"></div>
      </section>

      <section className="about-mission">
        <div className="container">
          <h2>{about.mission_title}</h2>
          <p>{about.mission_text}</p>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <h2>Meet the Team</h2>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.id} className="team-member">
                <img src={TeamLogo} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <h2>{about.cta_title}</h2>
        <p>{about.cta_text}</p>
        <a href={about.cta_link} className="btn-primary">
          Get Started
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
