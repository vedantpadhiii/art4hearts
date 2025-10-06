import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const PageContainer = styled(motion.div)`
  width: 100%;
  padding-top: ${props => props.theme.spacing.header};
`;

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </PageContainer>
  );
};

export default PageTransition;
