import React, { useEffect, useState } from "react";
import "../Styles/LandingPage.css";
import Carousel from "../Components/Carousel";

const LandingPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData({
        hero: {
          title: "Take Control of Your Money",
          subtitle: "Track your finances and reach your goals effortlessly.",
          ctaPrimary: "Get Started",
          ctaSecondary: "Learn More",
        },
        features: [
          {
            icon: "💰",
            title: "Smart Budgeting",
            desc: "Create budgets that adapt to your lifestyle.",
          },
          {
            icon: "📊",
            title: "Real-Time Insights",
            desc: "Know exactly where your money goes.",
          },
          {
            icon: "🔒",
            title: "Secure & Private",
            desc: "Your data stays safe and encrypted.",
          },
        ],
        stats: [
          { value: "10k+", label: "Active Users" },
          { value: "$2M+", label: "Tracked Expenses" },
          { value: "98%", label: "User Satisfaction" },
        ],
      });
    }, 500);
  }, []);


  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="landing-page">
      <section className="carousel-section">
        <Carousel />
      </section>

      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-content fade-in">
          <h1>{data.hero.title}</h1>
          <p>{data.hero.subtitle}</p>
          <div className="hero-buttons">
            <a href="/signup" className="btn-outline2">
              {data.hero.ctaPrimary}
            </a>
            <a href="#features" className="btn-outline">
              {data.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2 className="fade-in">Why Choose Budgify?</h2>
        <div className="feature-grid">
          {data.features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section fade-in">
        <div className="stats-grid">
          {data.stats.map((s, i) => (
            <div key={i} className="stat-card">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
