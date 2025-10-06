import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: ${props => props.theme.spacing.small};
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  gap: ${props => props.theme.spacing.medium};
`;

const NavItem = styled(Link)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.light};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Navigation: React.FC = () => {
  return (
    <Nav>
      <NavList>
        <li><NavItem to="/">Home</NavItem></li>
        <li><NavItem to="/about">About</NavItem></li>
        <li><NavItem to="/projects">Projects</NavItem></li>
        <li><NavItem to="/news">News</NavItem></li>
        <li><NavItem to="/get-involved">Get Involved</NavItem></li>
        <li><NavItem to="/contact">Contact</NavItem></li>
      </NavList>
    </Nav>
  );
};

export default Navigation;