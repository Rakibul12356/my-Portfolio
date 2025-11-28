import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorOutlinePos, setCursorOutlinePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      // Dot instantly follows
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    // Circle follows with delay
    const updateOutline = (e) => {
      setTimeout(() => {
        setCursorOutlinePos({ x: e.clientX, y: e.clientY });
      }, 100);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousemove', updateOutline);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousemove', updateOutline);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="bg-white dark:bg-dark-900 min-h-screen">
      {/* Custom Cursor */}
      <div 
        className="custom-cursor"
        style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }}
      >
        <div className="cursor-dot"></div>
      </div>
      
      <div 
        className={`custom-cursor ${isHovering ? 'cursor-hover' : ''}`}
        style={{ transform: `translate(${cursorOutlinePos.x}px, ${cursorOutlinePos.y}px)` }}
      >
        <div className="cursor-outline"></div>
      </div>

      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

