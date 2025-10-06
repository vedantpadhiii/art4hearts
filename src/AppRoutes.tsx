import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

// Page imports
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/about/Team';
import Chapters from './pages/about/Chapters';
import GetInvolved from './pages/GetInvolved';
import FAQs from './pages/FAQs';
import Spotlight from './pages/Spotlight';
import Contact from './pages/Contact';

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/team" element={<Team />} />
        <Route path="/about/chapters" element={<Chapters />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/spotlight" element={<Spotlight />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;