import React, { useState } from "react";
import styled from "styled-components";
import { images } from "../data/images";
import { categories } from "../data/categories";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("Landscape Portfolio");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Filter images based on selected category and location
  const filteredImages = images.filter((img) => {
    if (selectedCategory === "Galleries by Location") {
      return img.category === selectedCategory && img.location === selectedLocation;
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
            <ModalDetails>
              <ModalTitle>{filteredImages[selectedImageIndex].title}</ModalTitle>
              <ModalCategory>{filteredImages[selectedImageIndex].category}</ModalCategory>
              <ModalDate>{filteredImages[selectedImageIndex].date}</ModalDate>
              <ModalLocation>
                {filteredImages[selectedImageIndex].location}
              </ModalLocation>
              <ModalDescription>
                {filteredImages[selectedImageIndex].description}
              </ModalDescription>
            </ModalDetails>

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
  padding: 1.5rem;
  margin-top: 0; /* Move the gallery higher on the page */
  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 0; /* Adjust margin for smaller screens */
  }
`;

const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Allows buttons to wrap for smaller screens */
  margin-bottom: 1rem;
`;

const CategoryButton = styled.button`
  background: ${(props) => (props.active ? "#f39c12" : "#555")};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  font-family: "Playfair Display", serif;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem;
  flex: 1;
  max-width: 150px; /* Ensure all buttons have the same width */
  transition: background 0.3s ease;
  
  &:hover {
    background: #f39c12;
  }
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem; /* Adjust padding for smaller screens */
    font-size: 0.8rem; /* Adjust font size for smaller screens */
  }
`;

const LocationMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Allows buttons to wrap for smaller screens */
  margin-bottom: 1rem;
`;

const LocationButton = styled.button`
  background: ${(props) => (props.active ? "#3498db" : "#555")};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-family: "Playfair Display", serif;
  margin: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem;
  flex: 1;
  max-width: 150px; /* Ensure all buttons have the same width */
  transition: background 0.3s ease;

  &:hover {
    background: #3498db;
  }
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem; /* Adjust padding for smaller screens */
    font-size: 0.8rem; /* Adjust font size for smaller screens */
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
  overflow-y: auto;
  max-height: 80vh;
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
`;

const ImageItem = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
    border-radius: 10px;
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
  transform: translateX(-50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px;
  font-family: "Playfair Display", serif;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
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
  padding: 1rem;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  text-align: center;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: black;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
`;

const ModalDetails = styled.div`
  margin-top: 1rem;
  color: #333;
  font-family: "Playfair Display", serif;
`;

const ModalTitle = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const ModalCategory = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #777;
`;

const ModalLocation = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ModalDate = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ModalDescription = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
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
