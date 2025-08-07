import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Александр Петров',
    company: 'ООО "ТехСтрой"',
    rating: 5,
    text: 'Высокое качество и точность резки. Работали с мрамором для нашего офиса - результат превзошел ожидания. Рекомендую!',
    image: '/works/800x600-rezka-mramora-rezka-gidro.ru-primer.bfe.jpg'
  },
  {
    name: 'Елена Смирнова',
    company: 'ЗАО "ПроМет"',
    rating: 5,
    text: 'Оперативное выполнение заказа по резке металла. Сроки соблюдены, качество отличное. Буду обращаться еще.',
    image: '/works/800x600-dsc06249.ddb.jpg'
  },
  {
    name: 'Дмитрий Козлов',
    company: 'АрхГрупп',
    rating: 5,
    text: 'Резка выполнена на высшем уровне! Работали с керамогранитом для проекта - идеальная точность и чистота реза.',
    image: '/works/800x600-rezka-keramogranita-photo-7-rezka-gidro.ru.ea0.jpg'
  },
  {
    name: 'Мария Иванова',
    company: 'СтройИнвест',
    rating: 5,
    text: 'Профессиональный подход к работе. Резка стекла и оргстекла выполнена безупречно. Спасибо за качество!',
    image: '/works/800x600-gigrorezrka-orgsteklo-photo3.e9e.jpg'
  }
];

const TestimonialsSection = () => {
  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4" data-aos="fade-up">
          Отзывы клиентов
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto" data-aos="fade-up">
          Что говорят о нас наши клиенты
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-slate-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <h3 className="font-semibold text-slate-800">{testimonial.name}</h3>
                <p className="text-sm text-slate-600">{testimonial.company}</p>
              </div>
              <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                <span className="text-sky-600 font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
            </div>
            
            <p className="text-slate-700 text-sm leading-relaxed">
              "{testimonial.text}"
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <div className="inline-flex items-center gap-2 bg-sky-50 px-6 py-3 rounded-full">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-slate-700 font-medium">Средняя оценка: 5.0 из 5</span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
