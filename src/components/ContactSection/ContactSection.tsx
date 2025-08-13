
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
  <li>
    <strong>Телефоны:</strong>{' '}
    <a
      href="tel:+74952031778"
      className="text-sky-600 hover:underline mr-4"
    >
      +7 (495) 203-17-78
    </a>
    <a
      href="tel:+79267432909"
      className="text-sky-600 hover:underline"
    >
      +7 (926) 743-29-09
    </a>
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
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.029571765309!2d37.33801731582857!3d55.39925228045702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414ae3a2355a1b89%3A0xc33e27c2c39f8c3f!2z0K3QutGA0LDQstC-0L3QuNGPINCg0LXRhdC90L7QutCwLCDQnNC40LzQvtC90YHQutCw0Y8g0YPQuy4sIDI1LCDQodC-0YDQvtCy0LAsIDE0MjE0NA!5e0!3m2!1sru!2sbr!4v1720539220015!5m2!1sru!2sbr"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

  