// src/components/Footer.js

import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      All material © 2024 by Mary Celeste. All rights reserved.
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.50);
  color: white;
  text-align: center;
  padding: 0rem 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
`;

export default Footer;
