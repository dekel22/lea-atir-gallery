import React from 'react';
import { Link } from 'react-router-dom';
import { galleries } from '../data/galleries';
import './Home.css';

const Home = () => {
  return (
    <div className="home animate-fade-in">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title animate-delay-1">לאה עתיר</h1>
          <p className="hero-subtitle animate-delay-2">גלריית אומנות וירטואלית</p>
        </div>
      </section>

      <section className="galleries-section container section animate-fade-in animate-delay-3">
        <div className="galleries-grid">
          {galleries.map((gallery) => (
            <Link to={`/gallery/${gallery.id}`} key={gallery.id} className="gallery-card">
              <div className="gallery-card-image">
                <img src={gallery.coverImage} alt={gallery.title} loading="lazy" />
              </div>
              <div className="gallery-card-content">
                <h2>{gallery.title}</h2>
                <p>{gallery.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
