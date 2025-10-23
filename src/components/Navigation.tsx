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
  padding: ${props => props.isScrolled ? '0.5rem 2rem' : '1.5rem 2rem'};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(${props => props.isVisible ? '0' : '-100%'});
  opacity: ${props => props.isVisible ? '1' : '0'};
  background: ${props => props.isScrolled 
    ? 'rgba(255, 255, 255, 1)'
    : 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 100%)'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(12px)' : 'none'};
  box-shadow: ${props => props.isScrolled ? '0 4px 16px rgba(0, 0, 0, 0.1)' : 'none'};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    background: rgba(240, 247, 255, 0.95);
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
  color: #111827;
  transition: all 0.3s ease;
  font-weight: 800;
  font-size: 1.35rem;
  letter-spacing: 0.02em;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);
  
  &:hover {
    color: #1e3a8a;
    transform: translateY(-1px);
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
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
    background: rgba(240, 247, 255, 0.95);
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
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: #111827;
  text-decoration: none;
  font-weight: ${props => props.$isActive ? '700' : '600'};
  padding: 0.75rem 1rem;
  font-size: 1rem;
  letter-spacing: 0.03em;
  transition: all 0.3s ease;
  display: block;
  white-space: nowrap;
  border-radius: 8px;
  position: relative;
  
  ${props => props.$isActive && `
    color: #1e3a8a;
    background: rgba(30, 58, 138, 0.08);
    box-shadow: 0 2px 8px rgba(30, 58, 138, 0.12);
  `}

  &:hover {
    color: #1e3a8a;
    background: rgba(30, 58, 138, 0.05);
    box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);
    transform: translateY(-1px);
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(37, 99, 235, 0.15);
  border-radius: 12px;
  padding: 0.75rem;
  min-width: 200px;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.2s ease-in-out;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.15);

  @media (max-width: 768px) {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    background: transparent;
    border: none;
    padding: 0 0 0 1rem;
    min-width: unset;
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
    background: #111827;
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const currentScrollY = scrollY;
    const scrollThreshold = 100;
    const scrollDelta = 50;

    if (currentScrollY < scrollThreshold) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY.current + scrollDelta) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY.current - scrollDelta / 2) {
      setIsVisible(true);
    }

    lastScrollY.current = currentScrollY;
  }, [scrollY]);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
    setIsVisible(true); // Show navigation when route changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

          <NavItem
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <NavLink 
              to="/about" 
              $isActive={location.pathname.startsWith('/about')}
            >
              ABOUT
            </NavLink>
            <Dropdown isOpen={dropdownOpen}>
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
            <NavLink to="/spotlights" $isActive={location.pathname === '/spotlights'}>
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