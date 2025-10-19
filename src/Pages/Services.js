import React, { useEffect, useState } from "react";

const Services = () => {
  const [hero, setHero] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/api/services.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHero(data.hero);
          setServices(data.services);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="services-loading">
        <h3>Loading services...</h3>
      </div>
    );
  }

  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="container text-center">
          <h1 className="display-4">{hero.title || "Our Services"}</h1>
          <p className="lead">{hero.description || "Explore what we offer"}</p>
        </div>
      </div>

      <section className="services-section container mt-5">
        <div className="row g-4">
          {services.length > 0 ? (
            services.map((service) => (
              <div className="col-md-4" key={service.id}>
                <div className="service-card text-center p-4 shadow-sm rounded">
                  <div className="service-icon mb-3">
                    <i className={service.icon}></i>
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description text-muted">
                    {service.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No services available right now.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
