import { useEffect, useRef, useState } from 'react';

const works = [
  { image: '/works/1.jpg', caption: 'Резка гранита под 45°' },
  { image: '/works/2.jpg', caption: 'Мрамор для лестничных ступеней' },
  { image: '/works/3.jpg', caption: 'Сложная геометрия фасада' },
  { image: '/works/4.jpg', caption: 'Логотип из стали' },
  { image: '/works/5.jpg', caption: 'Панели из акрила' },
  { image: '/works/6.jpg', caption: 'Фасад из камня' },
  { image: '/works/7.jpg', caption: 'Индивидуальный декор' },
  { image: '/works/8.jpg', caption: 'Промышленная деталь' },
  { image: '/works/9.jpg', caption: 'Сложная вставка из стекла' },
];

const WorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const scrollToIndex = (i: number) => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.children[i] as HTMLElement;
    if (!card) return;
    container.scrollTo({
      left: card.offsetLeft,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    const newIndex = index === 0 ? works.length - 1 : index - 1;
    setIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = index === works.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section id="works" className="bg-sky-50 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center mb-12" data-aos="fade">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
          Наши работы
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          В портфолио — проекты от архитектурных панелей до инженерных деталей. Мы умеем работать с разными задачами и материалами.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto" data-aos="fade-up">
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-hide"
        >
          {works.map((work, i) => (
            <div
              key={i}
              className="min-w-[300px] flex-shrink-0 bg-white rounded-2xl shadow overflow-hidden cursor-pointer"
              onClick={() => setZoomedImage(work.image)}
            >
              <img
                src={work.image}
                alt={work.caption}
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 text-slate-700 text-base font-medium">
                {work.caption}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-white shadow-lg border border-slate-200 p-2 rounded-full hover:bg-sky-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-white shadow-lg border border-slate-200 p-2 rounded-full hover:bg-sky-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {zoomedImage && (
  <div
    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
    onClick={() => setZoomedImage(null)}
  >
    <div
      className="relative p-4 bg-white rounded-lg shadow-lg"
      onClick={(e) => e.stopPropagation()} 
    >
      <button
        className="absolute top-2 right-2 text-slate-500 hover:text-slate-800"
        onClick={() => setZoomedImage(null)}
      >
        ✕
      </button>
      <img
        src={zoomedImage}
        alt="Zoomed"
        className="max-w-[90vw] max-h-[80vh] sm:max-w-[800px] rounded-md"
      />
    </div>
  </div>
)}

    </section>
  );
};

export default WorksSection;



  


