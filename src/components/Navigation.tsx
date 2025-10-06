import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useScroll } from '../context/ScrollContext';
import Logo from '../assets/Logo';

const NavContainer = styled.nav<{ isScrolled: boolean; isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.isScrolled 
    ? props.theme.colors.background.darker + 'f0'
    : 'transparent'};
  padding: ${props => props.isScrolled ? '1rem 2rem' : '2rem'};
  transition: all 0.3s ease-in-out;
  transform: translateY(${props => props.isVisible ? '0' : '-100%'});
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.text.light};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${props => props.theme.colors.background.darker};
    padding: 6rem 2rem;
    flex-direction: column;
    transform: translateX(${props => props.isOpen ? '0' : '100%'});
    transition: transform 0.3s ease-in-out;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const NavItem = styled.div`
  position: relative;
  
  &:hover > .dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: -1rem;
  background: ${props => props.theme.colors.background.glass};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 0.5rem;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;

  @media (max-width: 768px) {
    position: static;
    background: transparent;
    border: none;
    padding: 0 0 0 1rem;
    opacity: 1;
    visibility: visible;
    transform: none;
    min-width: auto;
    backdrop-filter: none;
  }
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${props => props.theme.colors.text.light};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transform: scaleX(${props => props.$isActive ? 1 : 0});
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

const MenuButton = styled.button<{ isOpen: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 20px;
  position: relative;
  z-index: 1001;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background: ${props => props.theme.colors.text.light};
    position: absolute;
    transition: all 0.3s ease;

    &:first-child {
      top: ${props => props.isOpen ? '50%' : '0'};
      transform: ${props => props.isOpen ? 'rotate(45deg)' : 'none'};
    }

    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
      opacity: ${props => props.isOpen ? 0 : 1};
    }

    &:last-child {
      bottom: ${props => props.isOpen ? '40%' : '0'};
      transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'none'};
    }
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY, direction } = useScroll();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    if (scrollY > lastScrollY.current && scrollY > 100) {
      if (isVisible) setIsVisible(false);
    } else {
      if (!isVisible) setIsVisible(true);
    }
    lastScrollY.current = scrollY;
  }, [scrollY, direction]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <NavContainer isScrolled={scrollY > 50} isVisible={isVisible}>
      <NavContent>
        <LogoWrapper to="/">
          <Logo />
        </LogoWrapper>

        <MenuButton 
          isOpen={isOpen} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </MenuButton>

        <NavLinks isOpen={isOpen}>
          <NavItem>
            <NavLink to="/" $isActive={location.pathname === '/'}>
              HOME
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink 
              to="/about" 
              $isActive={location.pathname.startsWith('/about')}
              style={{ paddingRight: '1.5rem' }}
            >
              ABOUT
            </NavLink>
            <Dropdown className="dropdown">
              <NavLink to="/about" $isActive={location.pathname === '/about'}>
                About Us
              </NavLink>
              <NavLink to="/about/team" $isActive={location.pathname === '/about/team'}>
                Meet Our Team
              </NavLink>
              <NavLink to="/about/chapters" $isActive={location.pathname === '/about/chapters'}>
                Our Chapters
              </NavLink>
            </Dropdown>
          </NavItem>

          <NavItem>
            <NavLink to="/get-involved" $isActive={location.pathname === '/get-involved'}>
              GET INVOLVED
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/faqs" $isActive={location.pathname === '/faqs'}>
              FAQs
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/spotlight" $isActive={location.pathname === '/spotlight'}>
              SPOTLIGHT
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/contact" $isActive={location.pathname === '/contact'}>
              CONTACT
            </NavLink>
          </NavItem>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};