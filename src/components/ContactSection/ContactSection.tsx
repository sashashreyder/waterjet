
const ContactSection = ({ onCallClick }: { onCallClick: () => void }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="bg-sky-50 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto" data-aos="fade-up">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-12">
              Контакты
            </h2>

            <ul className="text-slate-600 text-lg space-y-4">
              <li className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <strong>Телефоны:</strong>
                <div className="mt-1 sm:mt-0 flex flex-col sm:flex-row sm:items-center sm:gap-6">
                  <a
                    href="tel:+74952031778"
                    className="text-sky-600 hover:underline"
                  >
                    +7 (495) 203-17-78
                  </a>
                  <a
                    href="tel:+79267432909"
                    className="text-sky-600 hover:underline"
                  >
                    +7 (926) 743-29-09
                  </a>
                </div>
              </li>

              <li>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:sales@rezka-gidro.ru"
                  className="text-sky-600 hover:underline"
                >
                  sales@rezka-gidro.ru
                </a>
              </li>

              <li>
                <strong>Время работы:</strong> Пн–Пт 9:00–18:00
              </li>

              <li>
                <strong>Адрес:</strong> 142144, г. Москва, поселок Щапово, дом № 25
              </li>
            </ul>

            <div className="flex gap-4 mt-15">
              <button
                onClick={scrollToTop}
                className="px-5 py-2 bg-slate-200 text-slate-800 rounded-full hover:bg-slate-300 transition"
              >
                ↑ Наверх
              </button>
              <button
                onClick={onCallClick}
                className="px-6 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition"
              >
                Заказать резку
              </button>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg w-full h-[400px]">
          <div style={{ position: "relative", overflow: "hidden" }}>
  <iframe
    title="Yandex Map — Щапово, д. 25"
    src="https://yandex.com/map-widget/v1/?from=mapframe&ll=37.401168%2C55.415947&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNTk5MDA5NDM4EqQB0KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINCi0YDQvtC40YbQutC40Lkg0LDQtNC80LjQvdC40YHRgtGA0LDRgtC40LLQvdGL0Lkg0L7QutGA0YPQsywg0JrRgNCw0YHQvdC-0L_QsNGF0L7RgNGB0LrQuNC5INGA0LDQudC-0L0sINC_0L7RgdGR0LvQvtC6INCp0LDQv9C-0LLQviwgMjUiCg3LmhVCFe-pXUI%2C&sll=99.505405%2C61.698653&source=mapframe&sspn=246.093750%2C80.455478&text=%D1%89%D0%B0%D0%BF%D0%BE%D0%B2%D0%BE%2025&um=constructor%3Aabcdef1234567890abcdef...&utm_source=mapframe&z=3"
    width="100%"
    height="400"
    allowFullScreen
    style={{ position: "relative", border: 0 }}
  />
</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;


  
