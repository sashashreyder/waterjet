import React, { useEffect } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css'; 

const Presentation: React.FC = () => {
  useEffect(() => {
    const deck = new Reveal();
    deck.initialize();
  }, []);

  return (
    <div className="reveal">
      <div className="slides">
        {/* Здесь будут слайды */}
      </div>
    </div>
  );
};

export default Presentation;
