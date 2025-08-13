import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';



type Item = { src: string; alt: string; label: string };

const items: { src: string; alt: string; label: string }[] = [
    { src: '/colormetall.jpg', alt: 'Цветной металл — образец резки', label: 'Цветной металл' },
    { src: '/kitchen.jpg', alt: 'Кухонная столешница — образец резки', label: 'Кухня / столешницы' },
    { src: '/mramor.jpg', alt: 'Мрамор — образец резки', label: 'Мрамор' },
    { src: '/plastic.jpg', alt: 'Пластик — образец резки', label: 'Пластик' },
    { src: '/plitka.jpg', alt: 'Плитка — образец резки', label: 'Плитка' },
    { src: '/rezina.jpg', alt: 'Резина — образец резки', label: 'Резина' },
  ];  

const GallerySection = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const show = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    []
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, prev, next]);

  return (
    <section id="gallery" className="bg-sky-50 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto" data-aos="fade-up">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800">
              Галерея работ
            </h2>
            <p className="text-slate-600 text-lg mt-3">
              Примеры точной гидроабразивной резки на разных материалах.
            </p>
          </div>
          <a
            href="#contact"
            className="hidden md:inline-block px-6 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition"
          >
            Заказать резку
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => show(i)}
              className="group relative rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition shadow-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              data-aos="fade-up"
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <span className="text-white text-lg font-semibold drop-shadow">
                  {it.label}
                </span>
                <span className="inline-flex items-center gap-2 text-white/90 text-sm bg-slate-900/40 backdrop-blur px-2.5 py-1 rounded-full">
                  <Maximize2 size={16} />
                  Открыть
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
            data-aos="zoom-in"
          >
            <img
              src={items[index].src}
              alt={items[index].alt}
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />

            <button
              aria-label="Закрыть"
              onClick={close}
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 p-2 rounded-full bg-white shadow hover:bg-slate-100 transition"
            >
              <X className="text-slate-700" />
            </button>

            <button
              aria-label="Назад"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow hover:bg-slate-100 transition"
            >
              <ChevronLeft className="text-slate-700" />
            </button>

            <button
              aria-label="Вперёд"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow hover:bg-slate-100 transition"
            >
              <ChevronRight className="text-slate-700" />
            </button>

            <div className="mt-3 text-center">
              <p className="text-slate-200 text-sm">
                {items[index].label} • {index + 1} / {items.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
