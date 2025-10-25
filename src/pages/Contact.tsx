import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Instagram Icon
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
  </svg>
);

// Linktree Icon
const LinktreeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm0-18a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm3.5 9c.828 0 1.5.672 1.5 1.5S16.328 15 15.5 15 14 14.328 14 13.5s.672-1.5 1.5-1.5zm-7 0c.828 0 1.5.672 1.5 1.5S9.328 15 8.5 15 7 14.328 7 13.5 7.672 12 8.5 12zm3.5-3c1.381 0 2.5-1.119 2.5-2.5S16.381 4 15 4s-2.5 1.119-2.5 2.5S13.619 9 15 9z"/>
  </svg>
);


const ContactContainer = styled.div`
  min-height: calc(100vh - ${props => props.theme.spacing.header});
  background: #fff8e1;
  margin-top: ${props => props.theme.spacing.header};
`;

const ContactInfo = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #1a365d;
  }

  p {
    color: #1e293b;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .contact-details {
    background: #fff;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    max-width: 400px;
    margin: 0 auto 3rem;
    
    div {
      margin-bottom: 2rem;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      strong {
        color: #2563eb;
        display: block;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
        font-weight: 600;
      }

      a, span {
        color: #1a365d;
        text-decoration: none;
        font-size: 1rem;
        line-height: 1.5;
        display: block;

        &:hover {
          color: #2563eb;
        }
      }
    }
  }

  .social-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
  }
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.8rem 1.5rem;
  background: #2563eb;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);

  &:hover {
    background: linear-gradient(135deg, #1e40af, #1e3a8a);
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
  }
`;

const ContactForm = styled.form`
  background: rgba(255, 255, 255, 0.95);
  padding: ${props => props.theme.spacing.large};
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  
  .form-group {
    margin-bottom: ${props => props.theme.spacing.medium};
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #1a365d;
      font-weight: 600;
      font-size: 0.95rem;
    }
    
    input, textarea {
      width: 100%;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(37, 99, 235, 0.2);
      border-radius: 12px;
      color: #1a365d;
      font-size: 1rem;
      transition: all 0.3s ease;
      
      &:focus {
        outline: none;
        border-color: #2563eb;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
      }
      
      &::placeholder {
        color: #64748b;
      }
    }
    
    textarea {
      min-height: 150px;
      resize: vertical;
    }
  }
  
  button {
    width: 100%;
    padding: 1rem;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      background: #1e40af;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(34, 197, 94, 0.95);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 500;
`;

const Contact: React.FC = () => {
  return (
    <ContactContainer>
      <ContactInfo>
        <h1>Contact Us</h1>
        <p>
          Have questions about our programs? Want to get involved? 
          We'd love to hear from you! Please reach out to us via email,
          and we'll get back to you as soon as possible.
        </p>
        
        <div className="contact-details">
          <div>
            <strong>Email</strong>
            <a href="mailto:art4heartsorg@gmail.com">art4heartsorg@gmail.com</a>
          </div>
          <div>
            <strong>Mailing Address</strong>
            <span>14435 Big Basin Way</span>
            <span>Suite C</span>
            <span>PMB 175</span>
            <span>Saratoga, CA 95070</span>
          </div>
        </div>

        <div className="social-links">
          <SocialLink 
            href="https://linktr.ee/Art4Hearts" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Visit our Linktree"
          >
            <LinktreeIcon />
            Linktree
          </SocialLink>
          <SocialLink 
            href="https://www.instagram.com/art4heartsorg/?hl=en" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Follow us on Instagram"
          >
            <InstagramIcon />
            Instagram
          </SocialLink>
        </div>
      </ContactInfo>
    </ContactContainer>
  );
};

export default Contact;