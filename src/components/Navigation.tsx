import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useScroll } from '../context/ScrollContext';
import Logo from '../assets/Logo';
import '../index.css';


// Instagram Icon
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
  </svg>
);

// LinkedIn Icon
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.644h3.554v1.361c.425-.654 1.185-1.586 2.882-1.586 2.105 0 3.681 1.376 3.681 4.336v5.533zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.956-1.71 1.187 0 1.915.75 1.935 1.71 0 .951-.748 1.71-1.976 1.71zm1.946 11.597H3.392V9.808h3.891v10.644zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);


const NavContainer = styled.nav<{ isScrolled: boolean; isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${props => props.isScrolled ? '0.5rem 2rem' : '1rem 2rem'};
  transition: all 0.3s ease;
  transform: translateY(${props => props.isVisible ? '0' : '-100%'});
  background: linear-gradient(135deg, #c6dddc 0%, #b3d4d2 100%);
  backdrop-filter: blur(8px);
  box-shadow: ${props => props.isScrolled ? '0 4px 16px rgba(0, 0, 0, 0.08)' : 'none'};

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #c6dddc 0%, #b3d4d2 100%);
  }
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
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
  
  img {
    height: auto;
    max-width: 200px;
    width: auto;
  }
  
  &:hover {
    color: #1e3a8a;
    transform: translateY(-1px);
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex: 1;
  justify-content: center;

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
    flex: none;
    justify-content: flex-start;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContactLink = styled(Link)<{ $isActive?: boolean }>`
  color: #51aba7;
  text-decoration: none;
  font-weight: 700;
  padding: 0.6rem 1.5rem;
  font-size: 0.95rem;
  letter-spacing: 0.03em;
  transition: all 0.3s ease;
  border-radius: 8px;
  border: 2px solid #51aba7;
  white-space: nowrap;
  background: transparent;
  font-family: 'Kollektif', sans-serif;
  
  &:hover {
    background: #000000;
    color: white;
    border-color: #000000;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const InstagramLink = styled.a`
  color: #51aba7;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  transition: all 0.3s ease;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid #51aba7;
  background: transparent;
  white-space: nowrap;
  font-family: 'Kollektif', sans-serif;
  
  &:hover {
    background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    border-color: #cc2366;
    color: white;
    transform: translateY(-2px) rotate(10deg);
    box-shadow: 0 4px 12px rgba(204, 35, 102, 0.3);
  }
`;

const LinkedInLink = styled.a`
  color: #51aba7;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  transition: all 0.3s ease;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid #51aba7;
  background: transparent;
  white-space: nowrap;
  font-family: 'Kollektif', sans-serif;
  
  &:hover {
    background: #0A66C2;
    border-color: #0A66C2;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(10, 102, 194, 0.3);
  }
`;


const NavItem = styled.div`
  position: relative;
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: #111827;
  text-decoration: none;
  font-weight: ${props => props.$isActive ? '700' : '600'};
  padding: 0.5rem 0.8rem;
  font-size: 0.95rem;
  letter-spacing: 0.03em;
  transition: all 0.3s ease;
  display: block;
  white-space: nowrap;
  border-radius: 6px;
  position: relative;
  font-family: 'Kollektif', sans-serif;
  
  ${props => props.$isActive && `
    color: white;
    background: transparent;
  `}

  &:hover {
    color: white;
    background: transparent;
    transform: translateY(-1px);
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #c6dddc 0%, #b3d4d2 100%);
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
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar at the top of the page
      if (currentScrollY < 100) {
        setIsVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else {
        setIsVisible(currentScrollY < lastScrollY);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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
          <img src="/Art4Hearts Banner.png" alt="Art4Hearts Banner" />
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
            <NavLink to="/gallery" $isActive={location.pathname === '/gallery'}>
              GALLERY
            </NavLink>
          </NavItem>

          <RightSection>
            <ContactLink to="/contact" $isActive={location.pathname === '/contact'}>
              CONTACT US
            </ContactLink>
            <InstagramLink 
              href="https://www.instagram.com/art4heartsorg/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Follow us on Instagram"
            >
              <InstagramIcon />
            </InstagramLink>
            <LinkedInLink 
              href="https://www.linkedin.com/company/art4hearts/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Follow us on LinkedIn"
            >
              <LinkedInIcon />
            </LinkedInLink>
          </RightSection>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};