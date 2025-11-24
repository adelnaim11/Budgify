import React, { useState, useEffect } from "react";
import img1 from "../assets/Banners/home-banner1.svg";
import img2 from "../assets/Banners/home-banner2.svg";
import img3 from "../assets/Banners/home-banner3.svg";
import "../Styles/Carousel.css";

const Carousel =()=> {
  const slides = [
    { img: img1, text: "Track your daily expenses with ease." },
    { img: img2, text: "Visualize your financial habits with charts." },
    { img: img3, text: "Set goals and monitor your progress monthly." },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrent(index);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="carousel-section">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === current ? "active" : "inactive"
            }`}
          >
            <img src={slide.img} alt={slide.text} className="carousel-img" />
            <div className="carousel-caption">
              <p>{slide.text}</p>
            </div>
          </div>
        ))}

        <button className="carousel-btn prev" onClick={prevSlide}>
          ❮
        </button>
        <button className="carousel-btn next" onClick={nextSlide}>
          ❯
        </button>

        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`indicator ${i === current ? "active" : ""}`}
              onClick={() => goToSlide(i)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Carousel;
