import React, { useState, useEffect } from 'react';

const Presentation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Array of slide images
  const slides = [
    '/presentation/slide1.jpeg',
    '/presentation/slide2.jpeg',
    '/presentation/slide3.jpeg',
    '/presentation/slide4.jpeg',
    '/presentation/slide5.jpeg',
    '/presentation/slide6.jpeg',
    '/presentation/slide7.jpeg',
    '/presentation/slide8.jpeg',
    '/presentation/slide9.jpeg',
    '/presentation/slide10.jpeg',
    '/presentation/slide11.jpeg',
    '/presentation/slide12.jpeg',
    '/presentation/slide13.jpeg',
    '/presentation/slide14.jpeg',
    '/presentation/slide15.jpeg',
    '/presentation/slide16.jpeg',
    '/presentation/slide17.jpeg',
    '/presentation/slide18.jpeg',
    '/presentation/slide19.jpeg',
    '/presentation/slide20.jpeg',
    '/presentation/slide21.jpeg',
    '/presentation/slide22.jpeg',
    '/presentation/slide23.jpeg',
    '/presentation/slide24.jpeg',
    '/presentation/slide25.jpeg',
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Auto-scroll every 5 seconds - temporarily disabled
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);





  // Keyboard navigation - temporarily disabled
  // useEffect(() => {
  //   const handleKeyPress = (event: KeyboardEvent) => {
  //     switch (event.key) {
  //       case 'ArrowRight':
  //       case ' ':
  //         event.preventDefault();
  //         nextSlide();
  //         break;
  //       case 'ArrowLeft':
  //         event.preventDefault();
  //         prevSlide();
  //         break;
  //       case 'Escape':
  //         setIsFullscreen(false);
  //         break;
  //       case 'f':
  //         case 'F':
  //           toggleFullscreen();
  //           break;
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyPress);
  //   return () => window.removeEventListener('keydown', handleKeyPress);
  // }, []);

  return (
    <div id="presentation" className={`bg-sky-50 py-8 md:py-12 px-4 md:px-8 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Title and Controls */}
      <div className="max-w-6xl mx-auto text-center mb-8 md:mb-14">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-2 md:mb-3" data-aos="fade-up">
          Наши Клиенты и Работы
        </h2>
        <p className="text-slate-600 text-sm md:text-lg max-w-2xl mx-auto px-4" data-aos="fade-up">
          Презентация наших проектов и клиентских работ
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-4 flex justify-between items-center px-4">
        <div className="text-slate-600 text-xs md:text-sm">
          {currentSlide + 1} / {slides.length}
        </div>
        <button
          onClick={toggleFullscreen}
          className="text-slate-600 hover:text-slate-800 text-xs md:text-sm transition-all duration-200 p-2"
        >
          {isFullscreen ? '✕' : '⤢'}
        </button>
      </div>

      {/* Main Image */}
      <div className="relative w-full max-w-3xl mx-auto h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-sky-50 rounded-xl shadow-lg mx-4">
        <img
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-full object-contain transition-opacity duration-300"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-slate-800/20 hover:bg-slate-800/40 text-slate-800 px-2 py-1 md:px-3 md:py-2 rounded-md text-lg md:text-xl font-bold transition-all duration-200"
          aria-label="Previous slide"
        >
          ＜
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-slate-800/20 hover:bg-slate-800/40 text-slate-800 px-2 py-1 md:px-3 md:py-2 rounded-md text-lg md:text-xl font-bold transition-all duration-200"
          aria-label="Next slide"
        >
          ＞
        </button>
      </div>

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto px-4 mt-4">
        <div className="h-[2px] bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sky-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>


    </div>
  );
};

export default Presentation;
