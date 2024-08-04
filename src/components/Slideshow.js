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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change images every 5 seconds

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
        />
      ))}
    </SlideshowContainer>
  );
};

const SlideshowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height for landing page */
  width: 100vw; /* Full width for landing page */
  overflow: hidden;
  position: relative; /* Ensure it can be positioned correctly */
  top: 0; /* Start from the top of the page */
  left: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the entire container while maintaining aspect ratio */
  position: absolute; /* Allow the image to fill the container */
  top: 0;
  left: 0;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 2s ease-in-out;
`;

export default Slideshow;

