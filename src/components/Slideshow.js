
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const images = [
  { src: "images/wildlife/Snorkel Strollin' Africa 16x24.jpg", title: "Snorkel Strollin' Africa" },
  { src: 'images/landscape/Silent Reflections in Patagonia 24x36.jpg', title: 'Silent Reflections in Patagonia' },
  { src: 'images/landscape/Welcome to the Woods NH 16x24.jpg', title: 'Welcome to the Woods' },

];


const fallbackImage = '/images/slideshow/fallback.jpg';

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change images every 3 seconds

    return () => clearInterval(interval); 
  }, []);

  const handleImageError = (event) => {
    event.target.src = fallbackImage;
  };

  return (
    <SlideshowContainer>
      <Image
        src={images[currentImageIndex].src}
        alt={images[currentImageIndex].title}
        onError={handleImageError} 
      />
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
  transition: opacity 1s ease-in-out;
  opacity: 0.9;
  position: absolute; /* Allow the image to fill the container */
  top: 0;
  left: 0;
`;

export default Slideshow;
