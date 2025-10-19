import React, { useEffect, useState } from "react";
import "./../Styles/home.css";

const Home = () => {

  const [banners, setBanners] = useState([]);
  const [features, setFeatures] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [marqueeItems, setMarqueeItems] = useState([]);
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeTestIndex, setActiveTestIndex] = useState(0);


  const fetchData = async (url, setter, key = null) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      const items = key ? data[key] : data;
      setter(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error(`Error fetching ${url}:`, err);
      setter([]);
    }
  };


  useEffect(() => {
    fetchData("/api/banners.php", setBanners);
    fetchData("/api/features.php", setFeatures, "features");
    fetchData("/api/testimonials.php", setTestimonials, "testimonials");
    fetchData("/api/marquee.php", setMarqueeItems, "marqueeItems");
  }, []);


  useEffect(() => {
    if (banners.length < 2) return;
    const interval = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);


  useEffect(() => {
    if (testimonials.length < 2) return;
    const interval = setInterval(() => {
      setActiveTestIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  return (
    <>

      <section className="carousel">
        {Array.isArray(banners) && banners.map((banner, i) => (
          <div
            key={banner.id}
            className={`carousel-item ${i === activeBanner ? "active" : ""}`}
            style={{ backgroundImage: `url(${banner.image_url})` }}
          >
            <div className="textoverlay">
              <h1>{banner.title}</h1>
              <p>{banner.description}</p>
            </div>
          </div>
        ))}
      </section>


      <section className="features">
        <h2>Why Choose Budgify?</h2>
        <div className="feature-grid">
          {Array.isArray(features) && features.map(feature => (
            <div key={feature.id} className="feature">
              <i className={feature.icon}></i>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="marquee-section">
        <h2>Trusted by 50+ Brands</h2>
        <div className="marquee">
          <ul className="marquee-content">
            {Array.isArray(marqueeItems) && marqueeItems.map(item => (
              <li key={item.id}><i className={item.icon_name}></i></li>
            ))}
          </ul>
        </div>
      </section>


      <section className="testimonials">
        <h2>What Our Users Say?</h2>
        <div className="testimonial-slider">
          {Array.isArray(testimonials) && testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`testimonial ${i === activeTestIndex ? "active" : ""}`}
            >
              <p>"{t.text}"</p>
              <h4>- {t.author}</h4>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
