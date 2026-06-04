import { useState, useEffect, useRef } from "react";
import "./slider.css";

function Slider() {
  const original = [
    { src: "/images/Electrician.jpg", title: "Electrician", desc: "Electrical repairs and installations." },
    { src: "/images/Plumber.jpg", title: "Plumber", desc: "Pipe fixing and plumbing solutions." },
    { src: "/images/Cleaner.jpg", title: "Cleaning", desc: "Home and office cleaning services." },
    { src: "/images/Mechanic.jpg", title: "Mechanic", desc: "Vehicle repair and servicing." },
    { src: "/images/Ac Repair.jpg", title: "Ac Repair", desc: "Ac Repair and Servicng." },
    { src: "/images/Painter.jpg", title: "Painter", desc: "Vehicle repair and servicing." },
    { src: "/images/Carpenter.jpg", title: "Carpenter", desc: "Furniture repair, woodwork, and custom installations." },
    { src: "/images/Tech Repair.jpg", title: "Tech Service", desc: "Expert solutions for mobile, laptop, and home tech setup and repair." },
    { src: "/images/Moving & Delivery.jpg", title: "Moving & Delivery", desc: "Packing, shifting, and delivery services." },
    { src: "/images/Pet Service.jpg", title: "Pet service", desc: "Pet care, grooming, and training." },
    { src: "/images/Security Installation.jpg", title: "Security Installation", desc: "Security system setup and installation."},
    

    
    

  ];

  const gap = 20;
  const visibleCards = 5;
  const cloneCount = visibleCards;

  const data = [
    ...original.slice(-cloneCount),
    ...original,
    ...original.slice(0, cloneCount)
  ];

  const [index, setIndex] = useState(cloneCount);
  const [transition, setTransition] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef(null);


  useEffect(() => {
    const updateCardWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const width = (containerWidth - gap * (visibleCards - 1)) / visibleCards;
        setCardWidth(width);
      }
    };
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const getOffset = (i) => i * (cardWidth + gap);

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  useEffect(() => {
    if (index === original.length + cloneCount) {
      setTimeout(() => {
        setTransition(false);
        setIndex(cloneCount);
      }, 500);
    }
    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(original.length);
      }, 500);
    }
  }, [index]);

  useEffect(() => {
    if (!transition) {
      const timer = setTimeout(() => setTransition(true), 50);
      return () => clearTimeout(timer);
    }
  }, [transition]);

  return (
    <div className="slider-outer">
      <button className="btn-slider " onClick={prev}>&#8249;</button>

      <div className="carousel-container" ref={containerRef}>
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${getOffset(index)}px)`,
            transition: transition ? "transform 0.5s ease" : "none"
          }}
        >
          {data.map((item, i) => (
            <div
              className="card"
              key={i}
              style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px` }}
            >
              <img src={item.src} alt={item.title} />
              <div style={{"padding":"12px 14px"}}>
              <h5>{item.title}</h5>
              <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-slider " onClick={next}>&#8250;</button>
    </div>
  );
}

export default Slider;