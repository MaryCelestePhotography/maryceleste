// src/components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Nav>
      <Logo to="/">
        <img src="/images/signature.png" alt="Mary Celeste Photography" />
      </Logo>
      <Menu>
        <MenuItem>
          <StyledLink to="/gallery">Galleries</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/about">About</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/ordering">Prints</StyledLink> {/* New Ordering Link */}
        </MenuItem>
        <MenuItem>
          <StyledLink to="/contact">Contact</StyledLink>
        </MenuItem>
      </Menu>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background: rgba(0, 0, 0, 0.85);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;

  img {
    height: 3rem; // Set a fixed height for the logo image
    width: auto; // Maintain aspect ratio
  }

  @media (max-width: 768px) {
    img {
      height: 2.5rem; // Smaller height on mobile
    }
  }
`;

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const MenuItem = styled.li`
  margin: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  transition: color 0.3s ease;

  &:hover {
    color: #f39c12;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export default Navbar;
