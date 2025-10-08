import React from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IconButtonProps {
  Icon: IconType;
  position: 'left' | 'right';
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, position, onClick }) => {
  return (
    <StyledButton
      as={motion.button}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      position={position}
      onClick={onClick}
    >
      <Icon size={24} />
    </StyledButton>
  );
};

const StyledButton = styled(motion.button)<{ position: 'left' | 'right' }>`
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  ${props => props.position}: -50px;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.text.light};
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  &:hover {
    opacity: 1;
  }

  & > svg {
    width: 24px;
    height: 24px;
    color: ${props => props.theme.colors.text.light};
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  }
`;

export default IconButton;