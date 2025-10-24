import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
    margin: 0 auto;
    
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
      </ContactInfo>
    </ContactContainer>
  );
};

export default Contact;