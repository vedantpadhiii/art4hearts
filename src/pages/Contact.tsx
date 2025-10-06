import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ContactContainer = styled.div`
  min-height: calc(100vh - ${props => props.theme.spacing.header});
  background: ${props => props.theme.colors.background.dark};
  color: ${props => props.theme.colors.text.light};
  padding: ${props => props.theme.spacing.large};
  margin-top: ${props => props.theme.spacing.header};
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.large};
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  h1 {
    font-size: clamp(3rem, 6vw, 6rem);
    font-family: ${props => props.theme.fonts.title};
    margin-bottom: ${props => props.theme.spacing.medium};
    color: ${props => props.theme.colors.primary};
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: ${props => props.theme.spacing.large};
    line-height: 1.6;
  }
  
  .contact-details {
    margin-top: ${props => props.theme.spacing.large};
    
    div {
      margin-bottom: ${props => props.theme.spacing.medium};
      
      strong {
        color: ${props => props.theme.colors.primary};
        display: block;
        margin-bottom: 0.5rem;
      }
    }
  }
`;

const ContactForm = styled.form`
  background: ${props => props.theme.colors.background.darker};
  padding: ${props => props.theme.spacing.large};
  border-radius: 20px;
  
  .form-group {
    margin-bottom: ${props => props.theme.spacing.medium};
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: ${props => props.theme.colors.primary};
    }
    
    input, textarea {
      width: 100%;
      padding: 1rem;
      background: ${props => props.theme.colors.background.dark};
      border: 1px solid ${props => props.theme.colors.background.light}40;
      border-radius: 10px;
      color: ${props => props.theme.colors.text.light};
      font-size: 1rem;
      
      &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
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
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text.light};
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform ${props => props.theme.transitions.medium};
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.text.light};
  padding: 1rem 2rem;
  border-radius: 10px;
  z-index: 1000;
`;

const Contact: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <ContactContainer>
      <ContactGrid>
        <ContactInfo>
          <h1>Contact Us</h1>
          <p>
            Have questions about our programs? Want to get involved? 
            We'd love to hear from you. Reach out using the form or 
            contact us directly.
          </p>
          
          <div className="contact-details">
            <div>
              <strong>Email</strong>
              info@art4hearts.org
            </div>
            <div>
              <strong>Phone</strong>
              +1 (555) 123-4567
            </div>
            <div>
              <strong>Address</strong>
              123 Art Street, Creative District<br />
              San Francisco, CA 94105
            </div>
          </div>
        </ContactInfo>
        
        <ContactForm onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" required />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" required />
          </div>
          
          <div className="form-group">
            <label>Subject</label>
            <input type="text" required />
          </div>
          
          <div className="form-group">
            <label>Message</label>
            <textarea required></textarea>
          </div>
          
          <button type="submit">Send Message</button>
        </ContactForm>
      </ContactGrid>
      
      <AnimatePresence>
        {showSuccess && (
          <SuccessMessage
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Message sent successfully!
          </SuccessMessage>
        )}
      </AnimatePresence>
    </ContactContainer>
  );
};

export default Contact;