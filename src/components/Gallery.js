import React, { useState } from "react";
import styled from "styled-components";
import { images } from "../data/images";
import { categories } from "../data/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "Landscape Portfolio"
  );
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filteredImages = images.filter((img) => {
    if (selectedCategory === "Galleries by Location" && selectedLocation) {
      return img.location === selectedLocation;
    }
    return img.category === selectedCategory;
  });

  const locations = Array.from(new Set(images.map((img) => img.location)));

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setIsModalOpen(false);
  };

  const showPreviousImage = (event) => {
    event.stopPropagation();
    setSelectedImageIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const showNextImage = (event) => {
    event.stopPropagation();
    setSelectedImageIndex((prevIndex) => {
      const newIndex = prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
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
            <IconOverlay className="icon">
              <FontAwesomeIcon icon={faSearchPlus} />
            </IconOverlay>
            <ImageTitle>{img.title}</ImageTitle>
          </ImageItem>
        ))}
      </ImageGrid>

      {isModalOpen && selectedImageIndex !== null && (
        <Modal onClick={closeModal}>
          <ModalContent>
            <CloseButton onClick={closeModal}>×</CloseButton>
            <ModalImage
              src={filteredImages[selectedImageIndex].src}
              alt={filteredImages[selectedImageIndex].title}
            />
            <PrevButton onClick={showPreviousImage}>&#8249;</PrevButton>
            <NextButton onClick={showNextImage}>&#8250;</NextButton>
            <ModalDetails>
              <ModalTitle>
                {filteredImages[selectedImageIndex].title}
              </ModalTitle>
              <ModalText>{filteredImages[selectedImageIndex].date}</ModalText>
              <ModalText>
                {filteredImages[selectedImageIndex].location}
              </ModalText>
              <ModalText>
                {filteredImages[selectedImageIndex].description}
              </ModalText>
            </ModalDetails>
          </ModalContent>
        </Modal>
      )}
    </GalleryContainer>
  );
};

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
  z-index: 1;
`;

const GalleryContainer = styled.div`
  padding: 1.5rem;
  margin-top: 0;
  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 0;
  }
`;

const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
  max-width: 150px;
  transition: background 0.3s ease;

  &:hover {
    background: #f39c12;
  }
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const LocationMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
  max-width: 150px;
  transition: background 0.3s ease;

  &:hover {
    background: #3498db;
  }
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
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

const IconOverlay = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: 1;
  transition: opacity 0.3s ease, transform 0.3s ease;
  font-size: 1rem;
  color: white;
  z-index: 2;
  text-shadow: 0 0 3px black;

  @media (max-width: 768px) {
    opacity: 1;
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
  }

  &:hover img {
    transform: scale(1.1);
  }

  &:hover .icon {
    transform: scale(2.1);
  }

  &:hover ${ImageTitle} {
    opacity: 1;
  }
`;

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
  overflow-y: auto;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  overflow: hidden;
  text-align: center;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.0);
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 5px;
  z-index: 10;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.0);
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 2rem;
  border-radius: 5px;
  z-index: 10;
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.0);
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 2rem;
  border-radius: 5px;
  z-index: 10;
`;

const ModalDetails = styled.div`
  margin-top: 1rem;
  color: white;
  text-align: left;
  overflow-y: auto;
  max-height: 40vh;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ModalText = styled.p`
  font-size: 1rem;
  margin: 0.25rem 0;
`;

export default Gallery;
