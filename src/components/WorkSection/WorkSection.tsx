import { useEffect, useRef, useState } from 'react';
import CallToAction from '../CallToAction/CallToAction';
import CallbackForm from '../CallbackForm/CallbackForm';

const galleryImages = [
  { image: '/works/800x600-rezka-keramogranita-photo-7-rezka-gidro.ru.ea0.jpg', caption: 'Резка керамогранита', category: 'керамика' },
  { image: '/works/800x600-rezka-mramora-rezka-gidro.ru-primer.bfe.jpg', caption: 'Резка натурального камня', category: 'камень' },
  { image: '/works/800x600-rezka-iskusstvennogo-kamnya-teatr-rezka-gidro.ru.d7e.jpg', caption: 'Резка искусственного камня', category: 'камень' },
  { image: '/works/800x600-dsc06249.ddb.jpg', caption: 'Логотип из стали', category: 'металл' },
  { image: '/works/800x600-rezka-reziny-photo-4-rezka-gidro.ru.30e.jpg', caption: 'Резка резины', category: 'резина' },
  { image: '/works/800x600-rezka-plitki-photo-4-rezka-gidro.ru.a02.jpg', caption: 'Резка плитки', category: 'керамика' },
  { image: '/works/800x600-gigrorezrka-orgsteklo-photo3.e9e.jpg', caption: 'Резка оргстекла и пластика', category: 'стекло' },
  { image: '/works/800x600-rezka_stekla_inoks.793.jpg', caption: 'Резка стекла', category: 'стекло' },
  { image: '/works/800x600-gigrorezrka-derevo-photo3.570.jpg', caption: 'Резка дерева', category: 'дерево' },
];

const WorksSection = () => {
  const [current, setCurrent] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [showCallback, setShowCallback] = useState(false);
  const [activeFilter, setActiveFilter] = useState('все');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const categories = ['все', 'камень', 'керамика', 'металл', 'стекло', 'резина', 'дерево'];
  const filteredImages = activeFilter === 'все' ? galleryImages : galleryImages.filter((img) => img.category === activeFilter);
  const total = filteredImages.length;
  const visibleSlides = Math.min(3, total);

  const nextSlide = () => setCurrent((prev) => (prev + visibleSlides) % total);
  const prevSlide = () => setCurrent((prev) => (prev - visibleSlides + total) % total);
  const mobileNext = () => setMobileIndex((i) => (i + 1) % total);
  const mobilePrev = () => setMobileIndex((i) => (i - 1 + total) % total);
  const onCallClick = () => setShowCallback(true);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop || total === 0) return;
    timeoutRef.current = setTimeout(nextSlide, 8000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, total]);

  useEffect(() => {
    setCurrent(0);
    setMobileIndex(0);
  }, [activeFilter]);

  const visible: typeof filteredImages = [];
  for (let i = 0; i < visibleSlides; i++) {
    if (total > 0) visible.push(filteredImages[(current + i) % total]);
  }

  return (
    <section className="bg-sky-50 py-20 px-4 md:px-8" id="works">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">С чем мы работаем?</h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Гидроабразивная резка различных материалов для архитектуры, строительства и производства
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === category
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-sky-50 hover:text-sky-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="md:hidden max-w-6xl mx-auto relative">
        {total > 0 ? (
          <div className="flex justify-center">
            <button
              className="w-[86%] bg-white rounded-2xl shadow overflow-hidden text-left"
              onClick={() => setModalImage(filteredImages[mobileIndex].image)}
            >
              <img src={filteredImages[mobileIndex].image} alt={filteredImages[mobileIndex].caption} className="w-full h-56 object-cover" />
              <div className="p-3 text-slate-700 text-sm text-center">{filteredImages[mobileIndex].caption}</div>
            </button>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-slate-600 text-lg">Работы по категории "{activeFilter}" пока не добавлены</p>
          </div>
        )}
        {total > 1 && (
          <>
            <button
              onClick={mobilePrev}
              className="absolute top-1/2 -translate-y-1/2 left-0 bg-white p-2 rounded-full shadow hover:bg-sky-100 transition"
              aria-label="Предыдущий"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={mobileNext}
              className="absolute top-1/2 -translate-y-1/2 right-0 bg-white p-2 rounded-full shadow hover:bg-sky-100 transition"
              aria-label="Следующий"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        {total > 0 && <div className="mt-3 text-center text-xs text-slate-500">{mobileIndex + 1} / {total}</div>}
      </div>

      <div className="relative max-w-6xl mx-auto overflow-hidden hidden md:block">
        {total > 0 ? (
          <div className="flex gap-4 justify-center transition-transform duration-700 ease-in-out">
            {visible.map((work, i) => (
              <div
                key={i}
                className="w-full max-w-[400px] flex-shrink-0 bg-white rounded-2xl shadow overflow-hidden cursor-pointer"
                onClick={() => setModalImage(work.image)}
              >
                <img src={work.image} alt={work.caption} className="w-full h-64 object-cover" />
                <div className="p-4 text-slate-700 font-medium text-center">{work.caption}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">Работы по категории "{activeFilter}" пока не добавлены</p>
          </div>
        )}
        {total > visibleSlides && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 -translate-y-1/2 left-0 bg-white p-2 rounded-full shadow hover:bg-sky-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -translate-y-1/2 right-0 bg-white p-2 rounded-full shadow hover:bg-sky-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setModalImage(null)}>
          <div className="max-w-5xl w-full p-4">
            <img src={modalImage} alt="Work large" className="rounded-xl max-h-[90vh] w-full object-contain" />
          </div>
        </div>
      )}

      <div className="mt-16 text-center">
        <CallToAction label="Заказать резку" onClick={onCallClick} />
      </div>

      {showCallback && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setShowCallback(false)}>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 text-xl" onClick={() => setShowCallback(false)}>×</button>
            <CallbackForm />
          </div>
        </div>
      )}
    </section>
  );
};

export default WorksSection;





  


