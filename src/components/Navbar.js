// src/components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Nav>
      <Logo to="/">Mary Celeste Photography</Logo>
      <Menu>
        <MenuItem>
          <StyledLink to="/gallery">Galleries</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/about">About</StyledLink>
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
  padding: 2rem 0;  /* Reduce top and bottom padding for smaller nav */
  background: rgba(0, 0, 0, 0.85);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 0.5rem 0; /* Further reduce padding on smaller screens */
  }
`;

const Logo = styled(Link)`
  font-size: 1.7rem; /* Reduce logo size for balance */
  color: #ffffff;
  font-family: "Playfair Display", serif;
  text-decoration: none;
  text-align: center;
  margin-bottom: 0.25rem; /* Space between logo and menu */
`;

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1rem; /* Add spacing between menu items */

  @media (max-width: 768px) {
    flex-wrap: wrap; /* Allow items to wrap if needed */
    gap: 0.5rem; /* Smaller gap on smaller screens */
  }
`;

const MenuItem = styled.li`
  margin: 0; /* Remove individual margin */
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 1rem; /* Adjust font size for menu */
  font-family: "Montserrat", sans-serif;
  transition: color 0.3s ease;

  &:hover {
    color: #f39c12;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Slightly smaller font on mobile */
  }
`;

export default Navbar;
