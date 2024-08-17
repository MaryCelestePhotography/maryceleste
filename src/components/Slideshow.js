import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const images = [
  { src: 'images/landscape/Welcome to the Woods NH 16x24.jpg', title: 'Welcome to the Woods' },
  { src: 'images/landscape/Sweet Evening on the Cape 16x24.jpg', title: 'Sweet Evening on the Cape' },
  { src: 'images/landscape/Silent Reflections in Patagonia 24x36.jpg', title: 'Silent Reflections in Patagonia' },
];

const fallbackImage = 'images/landscape/Sweet Evening on the Cape 16x24.jpg';

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );

      const randomX = Math.random() * 10 - 5;
      const randomY = Math.random() * 10 - 5;
      setOffsets({ x: randomX, y: randomY });
    }, 5000); // Time for image change

    return () => clearInterval(interval);
  }, []);

  const handleImageError = (event) => {
    event.target.src = fallbackImage;
  };

  return (
    <SlideshowContainer>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.title}
          isActive={index === currentImageIndex}
          onError={handleImageError}
          style={{
            transform: `translate(${offsets.x}%, ${offsets.y}%) scale(1.1)`,
          }}
        />
      ))}
    </SlideshowContainer>
  );
};

const SlideshowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  top: 0;
  left: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 2s ease-in-out, transform 6s ease-in-out;
`;

export default Slideshow;
