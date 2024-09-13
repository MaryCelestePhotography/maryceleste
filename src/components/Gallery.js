import React, { useState } from "react";
import styled from "styled-components";
import { images } from "../data/images";
import { categories } from "../data/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("Landscape Portfolio");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const imagesPerPage = 6;

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

  // Pagination logic
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);

  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
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
              setCurrentPage(1);
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
              onClick={() => {
                setSelectedLocation(location);
                setCurrentPage(1); 
              }}
              active={selectedLocation === location}
            >
              {location}
            </LocationButton>
          ))}
        </LocationMenu>
      )}

      <ImageGrid>
        {currentImages.map((img, index) => (
          <ImageItem key={index} onClick={() => openModal(indexOfFirstImage + index)}>
            <img src={img.src} alt={img.title} loading="lazy" />
            <IconOverlay className="icon">
              <FontAwesomeIcon icon={faSearchPlus} />
            </IconOverlay>
            <ImageTitle>{img.title}</ImageTitle>
          </ImageItem>
        ))}
      </ImageGrid>

      <PaginationControls>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          &#8249; Previous
        </PaginationButton>
        <PageIndicator>
          Page {currentPage} of {totalPages}
        </PageIndicator>
        <PaginationButton onClick={nextPage} disabled={currentPage === totalPages}>
          Next &#8250;
        </PaginationButton>
      </PaginationControls>

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
              <ModalText>{filteredImages[selectedImageIndex].location}</ModalText>
              <ModalText>{filteredImages[selectedImageIndex].description}</ModalText>
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
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem;
  transition: background 0.3s ease;
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
  margin: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
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

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  background-color: #555;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const PageIndicator = styled.span`
  font-size: 1rem;
  color: white;
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
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  overflow: hidden;
  text-align: center;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 75vh;
`;

const ModalDetails = styled.div`
  max-height: 20vh;
  overflow-y: auto;
  margin-top: 1rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-family: "Montserrat", sans-serif;
`;

const ModalText = styled.p`
  font-size: 0.9rem;
  color: white;
  margin: 0.5rem 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: transparent;
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 1rem;
  background: transparent;
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 1rem;
  background: transparent;
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

export default Gallery;
