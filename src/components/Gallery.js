import React, { useState } from "react";
import styled from "styled-components";
import { images } from "../data/images";
import { categories } from "../data/categories";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "Landscape Portfolio"
  );
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Filter images based on selected category and location
  const filteredImages = images.filter((img) => {
    if (selectedCategory === "Galleries by Location") {
      return (
        img.category === selectedCategory && img.location === selectedLocation
      );
    }
    return img.category === selectedCategory;
  });

  // Extract unique locations for "Galleries by Location" category
  const locations = Array.from(
    new Set(
      images
        .filter((img) => img.category === "Galleries by Location")
        .map((img) => img.location)
    )
  );

  // Open modal and set selected image index
  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  // Close modal and reset selected image index
  const closeModal = () => {
    setSelectedImageIndex(null);
    setIsModalOpen(false);
  };

  // Navigate to the previous image
  const previousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  // Navigate to the next image
  const nextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < filteredImages.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <GalleryContainer>
      <CategoryMenu>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedLocation("");
            }}
            active={selectedCategory === category}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryMenu>

      {selectedCategory === "Galleries by Location" && (
        <LocationMenu>
          {locations.map((location) => (
            <LocationButton
              key={location}
              onClick={() => setSelectedLocation(location)}
              active={selectedLocation === location}
            >
              {location}
            </LocationButton>
          ))}
        </LocationMenu>
      )}

      <ImageGrid>
        {filteredImages.map((img, index) => (
          <ImageItem key={index} onClick={() => openModal(index)}>
            <img src={img.src} alt={img.title} />
            <ImageTitle>{img.title}</ImageTitle>
          </ImageItem>
        ))}
      </ImageGrid>

      {isModalOpen && selectedImageIndex !== null && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeModal}>×</CloseButton>
            <ModalImage
              src={filteredImages[selectedImageIndex].src}
              alt={filteredImages[selectedImageIndex].title}
            />
            <ModalTitle>{filteredImages[selectedImageIndex].title}</ModalTitle>
            <ModalDate>{filteredImages[selectedImageIndex].date}</ModalDate>
            <ModalLocation>
              {filteredImages[selectedImageIndex].location}
            </ModalLocation>
            <ModalDescription>
              {filteredImages[selectedImageIndex].description}
            </ModalDescription>

            {/* Navigation Buttons */}
            {selectedImageIndex > 0 && (
              <PrevButton onClick={previousImage}>&larr;</PrevButton>
            )}
            {selectedImageIndex < filteredImages.length - 1 && (
              <NextButton onClick={nextImage}>&rarr;</NextButton>
            )}
          </ModalContent>
        </Modal>
      )}
    </GalleryContainer>
  );
};

// Styled components for the gallery
const GalleryContainer = styled.div`
  padding: 2rem;
`;

const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const CategoryButton = styled.button`
  background: ${(props) => (props.active ? "#f39c12" : "#333")};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  font-family: "Playfair Display", serif;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background: #f39c12;
  }
`;

const LocationMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const LocationButton = styled.button`
  background: ${(props) => (props.active ? "#3498db" : "#333")};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-family: "Playfair Display", serif;
  margin: 0 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background: #3498db;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem; /* Reduce spacing between images */
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: 80vh; /* Limit height to avoid overflowing page */
`;

const ImageItem = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px; /* Add border-radius to round images */

  img {
    width: 100%;
    height: 200px; /* Fix height to create uniform grid */
    object-fit: cover; /* Scale image to fit container while preserving aspect ratio */
    transition: transform 0.3s ease;
    border-radius: 10px; /* Ensure images follow the parent border-radius */
    &:hover {
      transform: scale(1.1);
    }
  }

  &:hover div {
    opacity: 1;
  }
`;

const ImageTitle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%); /* Center the text horizontally */
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px;
  font-family: "Playfair Display", serif;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center; /* Align text to the center */
`;

// Modal styling
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ModalTitle = styled.div`
  color: white;
  text-align: center;
  font-family: "Playfair Display", serif;
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const ModalLocation = styled.div`
  color: white;
  text-align: center;
  font-family: "Playfair Display", serif;
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const ModalDate = styled.div`
  color: white;
  text-align: center;
  font-family: "Playfair Display", serif;
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const ModalDescription = styled.div`
  color: white;
  text-align: center;
  font-family: "Playfair Display", serif;
  margin-top: 1rem;
  font-size: 1.5rem;
`;

// Navigation Buttons
const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export default Gallery;
