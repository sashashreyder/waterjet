import { useEffect, useRef, useState } from 'react';
import CallToAction from '../CallToAction/CallToAction';
import CallbackForm from '../CallbackForm/CallbackForm';

const galleryImages = [
  { image: '/works/800x600-rezka-keramogranita-photo-7-rezka-gidro.ru.ea0.jpg', caption: 'Резка керамогранита' },
  { image: '/works/800x600-rezka-mramora-rezka-gidro.ru-primer.bfe.jpg', caption: 'Резка натурального камня' },
  { image: '/works/800x600-rezka-iskusstvennogo-kamnya-teatr-rezka-gidro.ru.d7e.jpg', caption: 'Резка искусственного камня' },
  { image: '/works/800x600-dsc06249.ddb.jpg', caption: 'Логотип из стали' },
  { image: '/works/800x600-rezka-reziny-photo-4-rezka-gidro.ru.30e.jpg', caption: 'Резка резины' },
  { image: '/works/800x600-rezka-plitki-photo-4-rezka-gidro.ru.a02.jpg', caption: 'Резка плитки' },
  { image: '/works/800x600-gigrorezrka-orgsteklo-photo3.e9e.jpg', caption: 'Резка оргстекла и пластика' },
  { image: '/works/800x600-rezka_stekla_inoks.793.jpg', caption: 'Резка стекла' },
  { image: '/works/800x600-gigrorezrka-derevo-photo3.570.jpg', caption: 'Резка дерева' },
];

const WorksSection = () => {
  const [current, setCurrent] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [showCallback, setShowCallback] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const total = galleryImages.length;
  const visibleSlides = 3;

  const nextSlide = () => {
    setCurrent((prev) => (prev + visibleSlides) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - visibleSlides + total) % total);
  };

  const onCallClick = () => {
    setShowCallback(true);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 8000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  const visible = [];
  for (let i = 0; i < visibleSlides; i++) {
    visible.push(galleryImages[(current + i) % total]);
  }

  return (
    <section className="bg-sky-50 py-20 px-4 md:px-8" id="works">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
          С чем мы работаем?
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Гидроабразивная резка различных материалов для архитектуры, строительства и производства
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto overflow-hidden">
        <div className="flex gap-4 justify-center transition-transform duration-700 ease-in-out">
          {visible.map((work, i) => (
            <div
              key={i}
              className="w-full max-w-[400px] flex-shrink-0 bg-white rounded-2xl shadow overflow-hidden cursor-pointer"
              onClick={() => setModalImage(work.image)}
            >
              <img
                src={work.image}
                alt={work.caption}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-slate-700 font-medium text-center">
                {work.caption}
              </div>
            </div>
          ))}
        </div>

        {/* Prev */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-0 bg-white p-2 rounded-full shadow hover:bg-sky-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-0 bg-white p-2 rounded-full shadow hover:bg-sky-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <div className="max-w-5xl w-full p-4">
            <img
              src={modalImage}
              alt="Work large"
              className="rounded-xl max-h-[90vh] w-full object-contain"
            />
          </div>
        </div>
      )}

<div className="mt-16 text-center transition-all duration-700 ease-out opacity-100 translate-y-0">
  <CallToAction label="Заказать резку" onClick={onCallClick} />
</div>


      {showCallback && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setShowCallback(false)}
        >
          <div
            className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 text-xl"
              onClick={() => setShowCallback(false)}
            >
              ×
            </button>
            <CallbackForm />
          </div>
        </div>
      )}
    </section>
  );
};

export default WorksSection;




  


