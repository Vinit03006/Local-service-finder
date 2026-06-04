import { useEffect, useState } from "react";
import "./Heroslider.css";

const images = [
  "/sliderimage/sliderimg1.jpg",
  "/sliderimage/sliderimg2.jpg",
  "/sliderimage/sliderimg3.jpg",
  "/sliderimage/sliderimg4.jpg",
  "/sliderimage/sliderimg5.jpg"
];

function Heroslider({ children }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div className="hero-slider">


      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${images[current]})` }}
      ></div>

      <div className="hero-overlay"></div>


      <button className="hero-btn left" onClick={prevSlide}>❮</button>
      <button className="hero-btn right" onClick={nextSlide}>❯</button>

      <div className="hero-content">
        {children}
      </div>

    </div>
  );
}

export default Heroslider;