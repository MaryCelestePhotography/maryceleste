// src/components/Ordering.js

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const Ordering = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  const handleContactButtonClick = () => {
    navigate('/contact');  // Navigate to the Contact page when the button is clicked
  };

  return (
    <OrderContainer>
      <Title>Ordering Prints</Title>
      <Content>
        <p>
          Prints will only be created at custom shops that have been tested and proven to produce high-quality results.
        </p>
        <p>
          The most expensive option is printing done with a gallery-quality high gloss acrylic facemount, with finishing choices including glossy, non-glare, or anti-reflective.
        </p>
        <p>
          Prints can also be created on extremely high-quality metal with gloss, satin, or matte finishes.
        </p>
        <p>
          The least expensive option with gallery-quality results is a floatmount. The image is printed on archival photographic paper using fine art ink colors on professional printers. Then the image is mounted to tempered masonite with a protective film applied to the face of the print and a back mount to give it a floating appearance when hung on the wall. The print will have a matte finish, or for an upgrade, can be printed on metallic paper for a subtle glow.
        </p>
        <p>
          Since there are many variables in selecting products, upgrades, and sizes, each print warrants a discussion with individual clients. For a very loose estimate, before taxes and shipping, a 36 inch x 24 inch print on acrylic facemount would start at $900. The same 36x24 inch print on metal would start at $700. The same size print on floatmount would start at $450.
        </p>
        <p>
          Please <ContactButton onClick={handleContactButtonClick}>contact me</ContactButton>, and we will consider which options best suit your needs.
        </p>
      </Content>
    </OrderContainer>
  );
};

const OrderContainer = styled.div`
  padding: 3rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  color: #333;
  font-family: 'Montserrat', sans-serif;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-family: 'Playfair Display', serif;
  color: #222;
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Content = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  text-align: center; /* Center-align the text */

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  p {
    margin-bottom: 1rem;
  }
`;

const ContactButton = styled.button`
  background-color: #f39c12;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e67e22;
  }
`;

export default Ordering;
