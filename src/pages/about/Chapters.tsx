import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Chapter {
  name: string;
  leader: string;
  location: string;
  email: string;
  region: string;
  country: string;
  lat?: number;
  lng?: number;
}

const chapters: Chapter[] = [
  { name: 'Art4Hearts: Minnesota Connections Academy', leader: 'Makayla Anderson', location: 'Saint Paul', region: 'Minnesota', country: 'USA', email: 'amakayla900@gmail.com', lat: 44.9537, lng: -93.0900 },
  { name: 'Art4Hearts Chandler AZ', leader: 'Siena Verdugo', location: 'Chandler', region: 'Arizona', country: 'USA', email: 'art4heartschandler@gmail.com', lat: 33.3062, lng: -111.8413 },
  { name: 'Art4Hearts Crest High School', leader: 'Mallory Bowen', location: 'Shelby', region: 'North Carolina', country: 'USA', email: 'mallorybowen2022@gmail.com', lat: 35.2790, lng: -81.6381 },
  { name: 'Art4Hearts Lebanon High School', leader: 'Addy Wright', location: 'Lebanon', region: 'Indiana', country: 'USA', email: 'theaddisonwright@gmail.com', lat: 40.0423, lng: -86.4656 },
  { name: 'Art4Hearts Palm Beach Gardens', leader: 'Keira Compiani', location: 'Palm Beach Gardens', region: 'Florida', country: 'USA', email: 'Kmae.compiani@gmail.com', lat: 26.8158, lng: -80.1065 },
  { name: 'Art4Hearts Suffolk County Long Island', leader: 'Aishwarya Kammili', location: 'Suffolk', region: 'New York', country: 'USA', email: 'aishwaryakammili@gmail.com', lat: 40.9176, lng: -72.7554 },
  { name: 'Art4Hearts Bridgewater', leader: 'Neila Roach', location: 'Bridgewater', region: 'Massachusetts', country: 'USA', email: 'roachneila21@gmail.com', lat: 41.9813, lng: -71.0084 },
  { name: 'Art4Hearts Frontier International Academy', leader: 'Noor Ahmed', location: 'Hamtramck', region: 'Michigan', country: 'USA', email: 'zaralovescats143@gmail.com', lat: 42.2324, lng: -83.0673 },
  { name: 'Art4Hearts West Campus High School', leader: 'Janey Saechao', location: 'Sacramento', region: 'California', country: 'USA', email: 'art4heartswchs@gmail.com', lat: 38.5816, lng: -121.4944 },
  { name: 'Art4Hearts Atherton High School', leader: 'Delaney Payton', location: 'Louisville', region: 'Kentucky', country: 'USA', email: 'art4heartsahs@gmail.com', lat: 38.2527, lng: -85.7585 },
  { name: 'Art4Hearts Apple Valley High School', leader: 'Marley Fic', location: 'Apple Valley', region: 'California', country: 'USA', email: '2026.marleyfic@gmail.com', lat: 34.5001, lng: -117.1812 },
  { name: 'Art4Hearts Surprise, AZ', leader: 'Christina Barsch-Kuzmyn', location: 'Surprise', region: 'Arizona', country: 'USA', email: 'art4heartssurprise@gmail.com', lat: 33.6390, lng: -112.3692 },
  { name: 'Art4Hearts Denver', leader: 'Ellie Carroll', location: 'Denver', region: 'Colorado', country: 'USA', email: 'Elliecarrolladvocacy@gmail.com', lat: 39.7392, lng: -104.9903 },
  { name: 'Art4Hearts Gilbert Classical Academy', leader: 'Sophie Kephart', location: 'Gilbert', region: 'Arizona', country: 'USA', email: 'sophiegkephart@gmail.com', lat: 33.3528, lng: -111.7890 },
  { name: 'Art4Hearts Milpitas Middle College High School', leader: 'Nishka Gohel', location: 'Milpitas', region: 'California', country: 'USA', email: 'nishkangohel@gmail.com', lat: 37.4281, lng: -121.8863 },
  { name: 'Art4Hearts Clear Creek High School', leader: 'Hafsa Syed', location: 'League City', region: 'Texas', country: 'USA', email: 'Hafsasyed009@gmail.com', lat: 29.4849, lng: -95.1181 },
  { name: 'Art4Hearts SEA', leader: 'Selene Maldonado', location: 'Ormond Beach', region: 'Florida', country: 'USA', email: 'selene0925@icloud.com', lat: 29.2876, lng: -81.0573 },
  { name: 'Art4Hearts ABQ', leader: 'Nicole Ibarra', location: 'Albuquerque', region: 'New Mexico', country: 'USA', email: 'munecamisticas@outlook.com', lat: 35.0844, lng: -106.6504 },
  { name: 'Art4Hearts Emerson High School', leader: 'Andrea Capati', location: 'McKinney', region: 'Texas', country: 'USA', email: 'andrealorin.capati.169@k12.friscoisd.org', lat: 33.1972, lng: -96.6397 },
  { name: 'Art4Hearts San Jose', leader: 'Emily Mai', location: 'San Jose', region: 'California', country: 'USA', email: 'emilykimmai@gmail.com', lat: 37.3382, lng: -121.8863 },
  { name: 'Art4Hearts DH Conley HS', leader: 'Maddie Adrias', location: 'Greenville', region: 'North Carolina', country: 'USA', email: 'art4hearts.dhc@gmail.com', lat: 35.6129, lng: -82.3982 },
  { name: 'Art4Hearts Medina, TN', leader: 'Payton Wilson', location: 'Medina', region: 'Tennessee', country: 'USA', email: 'Paytonw680@outlook.com', lat: 35.4434, lng: -88.7162 },
  { name: 'Art4Hearts Miami, FL', leader: 'Melody Monge', location: 'Miami', region: 'Florida', country: 'USA', email: 'melodymonge902@gmail.com', lat: 25.7617, lng: -80.1918 },
  { name: 'Art4Hearts Frisco, TX', leader: 'Khyathi Motukuri', location: 'Frisco', region: 'Texas', country: 'USA', email: 'art4hearts.frisco@gmail.com', lat: 33.1506, lng: -96.8236 },
  { name: 'Art4Hearts Saddle River Day School', leader: 'Emma Ehrenkranz', location: 'Saddle River', region: 'New Jersey', country: 'USA', email: 'emma.ehrenkranz@icloud.com', lat: 40.9616, lng: -74.0352 },
  { name: 'Art4Hearts Webber Academy', leader: 'Kylah Meghani', location: 'Calgary', region: 'Alberta', country: 'Canada', email: 'art4heartswebber@gmail.com', lat: 51.0447, lng: -114.0719 },
  { name: 'Art4Hearts Saint Paul High School', leader: 'Ariana Soto', location: 'Santa Fe Springs', region: 'California', country: 'USA', email: 'ariana335024@gmail.com', lat: 33.9453, lng: -118.0951 },
  { name: 'Art4Hearts Irvine High School', leader: 'Iman Rizvi', location: 'Irvine', region: 'California', country: 'USA', email: 'arts4heartsihschapter@gmail.com', lat: 33.6846, lng: -117.8265 },
  { name: 'Art4Hearts Waxhaw, NC', leader: 'Shyna Jalota', location: 'Waxhaw', region: 'North Carolina', country: 'USA', email: 'shyna.jalota13@gmail.com', lat: 34.8797, lng: -80.7483 },
  { name: 'Art4Hearts Hinesville, Georgia', leader: 'Kamilah Perez-Concepcion', location: 'Hinesville', region: 'Georgia', country: 'USA', email: 'milahpc.09@gmail.com', lat: 31.8418, lng: -81.6200 },
  { name: 'Art4Hearts Strawberry Crest High School', leader: 'Nishita Moravineni', location: 'Shelby', region: 'North Carolina', country: 'USA', email: 'art4heartsschs@gmail.com', lat: 35.2790, lng: -81.6381 },
  { name: 'Art4Hearts Cary, NC', leader: 'Mackenzie Sanders', location: 'Cary', region: 'North Carolina', country: 'USA', email: 'Mackenzies0308@gmail.com', lat: 35.7915, lng: -78.7811 },
  { name: 'Art4Hearts Newfane High School', leader: 'Adalyn Shepard', location: 'Newfane', region: 'New York', country: 'USA', email: 'Adalyneshepard56@gmail.com', lat: 43.0530, lng: -78.8020 },
  { name: 'Art4Hearts Brooke Point High School', leader: 'Kanwal Naveed', location: 'Stafford', region: 'Virginia', country: 'USA', email: 'kanwalnaveed2010@icloud.com', lat: 38.4161, lng: -77.6706 },
  { name: 'Art4Hearts Bay City Western High School', leader: 'Autumn Lyons', location: 'Bay City', region: 'Michigan', country: 'USA', email: 'lyonsaut2028@bcschools.net', lat: 43.5891, lng: -83.8846 },
  { name: 'Art4Hearts Walnut', leader: 'Lyonn', location: 'Walnut', region: 'California', country: 'USA', email: 'art4heartswalnut@gmail.com', lat: 34.0105, lng: -117.8660 },
  { name: 'Art4Hearts Newark', leader: '', location: 'Newark', region: 'California', country: 'USA', email: 'art4heartnewark@gmail.com', lat: 37.5485, lng: -122.0363 },
  { name: 'Westlake High School', leader: 'Emma Kashyap', location: 'Westlake Village', region: 'California', country: 'USA', email: 'art4heartswhs@gmail.com', lat: 34.1438, lng: -118.8113 },
  { name: 'Art4Hearts North Garland High School', leader: '', location: 'Garland', region: 'Texas', country: 'USA', email: 'nghsarthearts@gmail.com', lat: 32.9126, lng: -96.6345 },
  { name: 'Art4Hearts Isaac Bear Early College High School', leader: 'Mackenzie Ryan', location: 'Wilmington', region: 'North Carolina', country: 'USA', email: 'art4heartsibechs@gmail.com', lat: 34.2257, lng: -77.9447 },
  { name: 'Art4Hearts Mission Oak High School', leader: 'Sparrow Silva', location: 'Tulare', region: 'California', country: 'USA', email: 'art4heartsMOHS@gmail.com', lat: 36.2417, lng: -119.3535 },
  { name: 'Art4Hearts Louis D Brandeis High School', leader: 'Angela Grace Aquino', location: 'San Antonio', region: 'Texas', country: 'USA', email: 'art4hearts.louisdbrandeishs@gmail.com', lat: 29.4241, lng: -98.4936 },
  { name: 'Art4Hearts Lakewood High School', leader: 'Ella Morgan', location: 'Lakewood', region: 'Colorado', country: 'USA', email: 'art4hearts.lakewoodhs@gmail.com', lat: 39.7139, lng: -105.0844 },
  { name: 'Art4Hearts Columbia', leader: 'Mackenna Maddox', location: 'Columbia', region: 'South Carolina', country: 'USA', email: 'art4heartscolumbia@gmail.com', lat: 34.0007, lng: -81.0348 },
  { name: 'Art4Hearts Salt Lake City', leader: '', location: 'Salt Lake City', region: 'Utah', country: 'USA', email: 'art4hearts.slc@gmail.com', lat: 40.7608, lng: -111.8910 },
  { name: 'Art4Hearts El Modena High School', leader: 'Sarah Dinh', location: 'Orange', region: 'California', country: 'USA', email: 'elmo.art4hearts@gmail.com', lat: 33.7879, lng: -117.8527 },
  { name: 'Art4Hearts Orlando', leader: '', location: 'Orlando', region: 'Florida', country: 'USA', email: 'art4hearts.orlando@gmail.com', lat: 28.5421, lng: -81.3723 },
  { name: 'Art4Hearts St. Mary\'s Preparatory High School', leader: 'Adelina', location: 'West Bloomfield', region: 'Michigan', country: 'USA', email: '', lat: 42.5419, lng: -83.4788 },
  { name: 'Art4Hearts Pasco High School', leader: 'Jenna Bragg', location: 'Pasco', region: 'Washington', country: 'USA', email: 'art4heartspasco@gmail.com', lat: 46.2396, lng: -119.1007 },
  { name: 'Art4Hearts 10th of Ramadan City', leader: 'Menna Esam', location: '10th of Ramadan City', region: 'Sharkya', country: 'Egypt', email: 'mennaabozahra2008@gmail.com', lat: 30.4850, lng: 31.4455 },
  { name: 'Art4Hearts King\'s College Alicante', leader: 'Alejandra Lín', location: 'Elche', region: 'Alicante', country: 'Spain', email: 'Alejandra.lin189@gmail.com', lat: 38.2688, lng: -0.6954 },
  { name: 'Art4Hearts Yangon, Myanmar', leader: 'Clara Zaw', location: 'Yangon', region: 'Yangon', country: 'Myanmar', email: 'clara.nguushweyizaw@gmail.com', lat: 16.8661, lng: 96.1951 },
  { name: 'Art4Hearts The Millennium School', leader: 'Aleena Ahmed', location: 'Dubai', region: 'Dubai', country: 'United Arab Emirates', email: 'Aleenaahmed063@gmail.com', lat: 25.2048, lng: 55.2708 },
  { name: 'Art4Hearts Athens', leader: 'Danae Lianantonaki', location: 'Athens', region: 'Attica', country: 'Greece', email: 'art4heartsathens@gmail.com', lat: 37.9838, lng: 23.7275 },
  { name: 'Art4Hearts Segamat', leader: 'Lee Jing', location: 'Segamat', region: 'Johor', country: 'Malaysia', email: 'art4hearts.segamat@gmail.com', lat: 2.7250, lng: 102.8125 }
];

// Styled Components
const PageContainer = styled(motion.div)`
  min-height: 100vh;
  margin-top: ${props => props.theme.spacing.header};
  background: #ffffff;
  padding-top: 0;
  font-family: 'Kollektif', sans-serif;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const HeroSection = styled.section`
  width: 100%;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  margin-bottom: 0;
  margin-top: 0;
  flex-shrink: 0;
  background: #c6dddc;

  &::before {
    display: none;
  }

  &::after {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
    min-height: auto;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0.9) 100%
  );
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0;
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #1d4ed8);
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  max-width: 800px;
  line-height: 1.8;
  color: #1e293b;
  margin: 0 auto;
`;

const ContentSection = styled(motion.section)`
  width: 100%;
  padding: 0;
  max-width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: auto;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;
  gap: 0;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: 600px;
  }

  @media (max-width: 768px) {
    height: 500px;
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
  background: white;
  flex: 1;

  .leaflet-container {
    height: 100%;
    width: 100%;
    font-family: 'Kollektif', sans-serif;
    background: white;
  }

  .leaflet-marker-icon {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  .leaflet-popup-content-wrapper {
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(198, 221, 220, 0.25);
  }

  .leaflet-popup-tip {
    background: white;
  }
`;

const MapHeaderContainer = styled.div`
  display: none;
  grid-column: 1 / -1;
  margin-bottom: 2rem;
`;

const MapSectionTitle = styled.h2`
  font-size: 1.6rem;
  color: #5b21b6;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const StateCardContainer = styled.div`
  display: none;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MapSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;

  &:nth-child(2),
  &:nth-child(3) {
    display: none;
  }
`;

const MapTitle = styled.h2`
  font-size: 2.5rem;
  color: #1a365d;
  margin-bottom: 1.5rem;
  font-weight: 600;
  padding: 1.5rem 2rem 0;
  border-bottom: none;
  background: transparent;
  letter-spacing: normal;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    padding: 1rem 1.5rem 0;
  }
`;

const StateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const StateCard = styled(motion.button)`
  background: linear-gradient(135deg, #ede9fe 0%, #f3e8ff 100%);
  border: 2px solid #c4b5fd;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  font-weight: 600;
  color: #5b21b6;
  font-size: 1rem;

  &:hover {
    border-color: #8b5cf6;
    background: linear-gradient(135deg, #ddd6fe 0%, #ede9fe 100%);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1rem;
  }
`;

const CountryCard = styled(motion.button)`
  background: linear-gradient(135deg, #ede9fe 0%, #f3e8ff 100%);
  border: 2px solid #c4b5fd;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  font-weight: 600;
  color: #5b21b6;
  font-size: 1rem;

  &:hover {
    border-color: #8b5cf6;
    background: linear-gradient(135deg, #ddd6fe 0%, #ede9fe 100%);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1rem;
  }
`;

const ChapterCount = styled.div`
  font-size: 0.8rem;
  color: #7c3aed;
  margin-top: 0.5rem;
  font-weight: 500;
`;

const Modal = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  color: #5b21b6;
  margin-bottom: 1rem;
  font-weight: 700;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ChapterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ChapterItem = styled(motion.div)`
  padding: 1.5rem;
  background: linear-gradient(135deg, #f3f0ff 0%, #faf5ff 100%);
  border-left: 4px solid #8b5cf6;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
    transform: translateX(4px);
  }
`;

const ChapterName = styled.h3`
  font-size: 1.1rem;
  color: #5b21b6;
  margin-bottom: 0.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ChapterDetail = styled.p`
  font-size: 0.9rem;
  color: #7c3aed;
  margin-bottom: 0.3rem;

  strong {
    color: #5b21b6;
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ede9fe;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  color: #5b21b6;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #ddd6fe;
    transform: rotate(90deg);
  }
`;

const Chapters: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<L.Map | null>(null);
  const [showMap, setShowMap] = useState(true);

  // Country name translations
  const countryNames: { [key: string]: { english: string; native: string } } = {
    'USA': { english: 'United States', native: 'United States' },
    'Canada': { english: 'Canada', native: 'Canada' },
    'Egypt': { english: 'Egypt', native: 'مصر' },
    'Spain': { english: 'Spain', native: 'España' },
    'Myanmar': { english: 'Myanmar', native: 'မြန်မာ' },
    'United Arab Emirates': { english: 'United Arab Emirates', native: 'الإمارات العربية المتحدة' },
    'Greece': { english: 'Greece', native: 'Ελλάδα' },
    'Malaysia': { english: 'Malaysia', native: 'Malaysia' }
  };

  useEffect(() => {
    if (!showMap || !mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current as HTMLElement).setView([39.8283, -98.5795], 4);
    mapRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Country/region labels removed to prevent overlap when zooming

    // Add markers
    const markersGroup = L.featureGroup();

    chapters.forEach((chapter) => {
      if (chapter.lat && chapter.lng) {
        const isUSA = chapter.country === 'USA';
        const color = isUSA ? '#8b5cf6' : '#ec4899';
        
        // Get country names
        const countryInfo = countryNames[chapter.country] || { english: chapter.country, native: chapter.country };
        
        // Create custom icon
        const icon = L.divIcon({
          html: `
            <div style="
              background-color: ${color};
              border-radius: 50%;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              font-weight: bold;
              color: white;
              font-size: 12px;
            ">
              ❤
            </div>
          `,
          iconSize: [30, 30],
          className: 'custom-icon'
        });

        const marker = L.marker([chapter.lat, chapter.lng], { icon })
          .bindPopup(`
            <div style="font-family: inherit; padding: 8px;">
              <h4 style="margin: 0 0 8px 0; color: #5b21b6; font-weight: 700;">${chapter.name}</h4>
              <p style="margin: 4px 0; color: #6d28d9; font-size: 0.9rem;"><strong>Country:</strong> ${countryInfo.english}${countryInfo.native !== countryInfo.english ? ` / ${countryInfo.native}` : ''}</p>
              <p style="margin: 4px 0; color: #6d28d9; font-size: 0.9rem;"><strong>Location:</strong> ${chapter.location}, ${chapter.region}</p>
              <p style="margin: 4px 0; color: #6d28d9; font-size: 0.9rem;"><strong>Leader:</strong> ${chapter.leader || 'N/A'}</p>
              ${chapter.email ? `<p style="margin: 4px 0; color: #6d28d9; font-size: 0.9rem;"><strong>Email:</strong> ${chapter.email}</p>` : ''}
            </div>
          `, {
            maxWidth: 300,
            className: 'custom-popup'
          });

        markersGroup.addLayer(marker);
      }
    });

    map.addLayer(markersGroup);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [showMap]);

  // Group chapters by region and country
  const usChapters = chapters.filter(c => c.country === 'USA');
  const internationalChapters = chapters.filter(c => c.country !== 'USA');

  const usStates = Array.from(new Set(usChapters.map(c => c.region))).sort();
  const countries = Array.from(new Set(internationalChapters.map(c => c.country))).sort();

  const getChaptersForRegion = (region: string, country: string) => {
    if (country === region) {
      // For international countries
      return chapters.filter(c => c.country === country);
    } else {
      // For USA states
      return chapters.filter(c => c.region === region && c.country === country);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection>
        <HeroOverlay />
        <HeroContent
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HeroTitle>Our Chapters</HeroTitle>
          <HeroSubtitle>
            Art4Hearts has grown to include 150+ chapters across the United States and around the world. 
            Explore our interactive map to discover chapters in your region and learn about the passionate leaders 
            bringing creativity and compassion to their communities.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <MapContainer>
          {/* Interactive Map Section */}
          <MapSection
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <MapTitle>Interactive Map</MapTitle>
            <MapWrapper ref={mapContainerRef} />
          </MapSection>

          {/* USA Section */}
          <MapSection
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <MapTitle>United States</MapTitle>
            <StateGrid>
              {usStates.map((state) => (
                <StateCard
                  key={state}
                  onClick={() => setSelectedRegion(`${state}-USA`)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {state}
                  <ChapterCount>
                    {getChaptersForRegion(state, 'USA').length} {getChaptersForRegion(state, 'USA').length === 1 ? 'chapter' : 'chapters'}
                  </ChapterCount>
                </StateCard>
              ))}
            </StateGrid>
          </MapSection>

          {/* International Section */}
          <MapSection
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <MapTitle>International</MapTitle>
            <StateGrid>
              {countries.map((country) => (
                <CountryCard
                  key={country}
                  onClick={() => setSelectedRegion(`${country}-INTL`)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {country}
                  <ChapterCount>
                    {getChaptersForRegion(country, country).length} {getChaptersForRegion(country, country).length === 1 ? 'chapter' : 'chapters'}
                  </ChapterCount>
                </CountryCard>
              ))}
            </StateGrid>
          </MapSection>
        </MapContainer>
      </ContentSection>

      {/* Modal for showing chapters */}
      <AnimatePresence>
        {selectedRegion && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e: React.MouseEvent) => {
              if (e.target === e.currentTarget) {
                setSelectedRegion(null);
              }
            }}
          >
            <ModalContent
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <CloseButton onClick={() => setSelectedRegion(null)}>✕</CloseButton>
              <ModalTitle>
                {selectedRegion.includes('USA')
                  ? selectedRegion.split('-')[0]
                  : selectedRegion.split('-')[0]}
              </ModalTitle>
              <ChapterList>
                {getChaptersForRegion(
                  selectedRegion.split('-')[0],
                  selectedRegion.includes('USA')
                    ? 'USA'
                    : selectedRegion.split('-')[0]
                ).map((chapter, index) => (
                  <ChapterItem
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ChapterName>{chapter.name}</ChapterName>
                    {chapter.leader && <ChapterDetail><strong>Leader:</strong> {chapter.leader}</ChapterDetail>}
                    <ChapterDetail><strong>Location:</strong> {chapter.location}, {chapter.region}</ChapterDetail>
                    {chapter.email && <ChapterDetail><strong>Email:</strong> {chapter.email}</ChapterDetail>}
                  </ChapterItem>
                ))}
              </ChapterList>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Chapters;