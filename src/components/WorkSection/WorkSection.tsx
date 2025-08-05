import { useEffect, useRef, useState } from 'react';

const works = [
  { image: 'public/works/камень резка.jpg', caption: 'Резка керамогранита' },
  { image: 'public/works/800x600-rezka-mramora-rezka-gidro.ru-primer.bfe.jpg', caption: 'Резка натурального камня' },
  { image: '/works/3.jpg', caption: 'Сложная геометрия фасада' },
  { image: '/works/4.jpg', caption: 'Логотип из стали' },
  { image: '/works/5.jpg', caption: 'Панели из акрила' },
  { image: '/works/6.jpg', caption: 'Фасад из камня' },
  { image: '/works/7.jpg', caption: 'Индивидуальный декор' },
  { image: '/works/8.jpg', caption: 'Промышленная деталь' },
  { image: '/works/9.jpg', caption: 'Сложная вставка из стекла' },
];

const WorksSection = () => {
  const [current, setCurrent] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const total = works.length;
  const visibleSlides = 3;

  const nextSlide = () => {
    setCurrent((prev) => (prev + visibleSlides) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - visibleSlides + total) % total);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 8000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  const visible = [];
  for (let i = 0; i < visibleSlides; i++) {
    visible.push(works[(current + i) % total]);
  }

  return (
    <section className="bg-sky-50 py-20 px-4 md:px-8" id="works">
      <div className="max-w-6xl mx-auto text-left mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
          Наши работы
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl">
          В портфолио — проекты от архитектурных панелей до инженерных деталей. Мы умеем работать с разными задачами и материалами.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto overflow-hidden">
        <div className="flex gap-4 justify-center transition-transform duration-700 ease-in-out">
          {visible.map((work, i) => (
            <div
              key={i}
              className="w-full max-w-[400px] flex-shrink-0 bg-white rounded-2xl shadow overflow-hidden cursor-pointer hover:scale-100"
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

      {/* Modal */}
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
    </section>
  );
};

export default WorksSection;



  


