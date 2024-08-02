// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.85);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Logo = styled(Link)` 
  font-size: 2rem;
  color: #ffffff;
  font-family: 'Playfair Display', serif;
  margin-bottom: 0.5rem;
  text-decoration: none; 
`;

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin: 0 1.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 1.2rem;
  font-family: 'Montserrat', sans-serif;
  transition: color 0.3s ease;
  
  &:hover {
    color: #f39c12;
  }
`;

export default Navbar;
