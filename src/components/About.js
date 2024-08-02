import React from 'react';
import styled from 'styled-components';

const About = () => {
  return (
    <AboutSection>
      <AboutImage src='\images\MaryCeleste.jpg' alt="Photographer" />
      <AboutText>
        <h1>About Mary Celeste</h1>
        <p>
          Mary Celeste is a professional photographer specializing in
          adventure, lifestyle, and landscape photography. Her work has been
          featured in numerous publications and exhibitions worldwide.
        </p>
        <p>
          Mary's passion for photography is matched only by her love for the
          great outdoors. Whether climbing mountains, traversing deserts, or
          exploring urban landscapes, she captures the beauty of the world
          with a unique perspective.
        </p>
      </AboutText>
    </AboutSection>
  );
};

const AboutSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background: #fff;
`;

const AboutImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 50%;
  margin-right: 2rem;
`;

const AboutText = styled.div`
  max-width: 600px;
  h1 {
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

export default About;