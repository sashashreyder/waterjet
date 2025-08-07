import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  onContactClick?: () => void;
}

const faqData = [
  {
    question: 'Что такое гидроабразивная резка?',
    answer:
      'Это метод высокоточной резки различных материалов с помощью струи воды с добавлением абразива. Без нагрева, без деформаций, идеально для металлов, керамики, стекла и других материалов.',
  },
  {
    question: 'Какие материалы можно резать?',
    answer:
      'Практически любые: металл, нержавейка, алюминий, стекло, керамика, мрамор, композиты, резина, пластик и даже дерево.',
  },
  {
    question: 'Какая точность у резки?',
    answer:
      'Точность зависит от материала и толщины, но как правило — до ±0.1 мм. Это промышленный уровень качества.',
  },
  {
    question: 'Как быстро выполняется заказ?',
    answer:
      'Сроки зависят от объёма и материала. Небольшие заказы — от 1 дня. При необходимости можем работать срочно.',
  },
  {
    question: 'Нужно ли подготавливать чертеж?',
    answer:
      'Можно прислать свой чертёж в формате .dxf, .dwg, .pdf или .step. Если нет — сделаем сами на основе ваших замеров и фото.',
  },
  {
    question: 'Как оформить заказ?',
    answer:
      'Свяжитесь с нами по телефону или через форму на сайте. Мы уточним детали и пришлём расчёт стоимости.',
  },
];

export default function FAQ({ onContactClick }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-4 md:px-8" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4" data-aos="fade-up">
            Частые вопросы
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto" data-aos="fade-up">
            Ответы на самые популярные вопросы о гидроабразивной резке
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left text-slate-800 font-semibold focus:outline-none hover:bg-slate-100 transition-colors duration-200"
                onClick={() => toggle(index)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sky-600 font-bold text-xs">{index + 1}</span>
                  </div>
                  <span className="text-lg">{item.question}</span>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-sky-600 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-slate-600 text-base leading-relaxed border-t border-slate-200 bg-white">
                  <div className="flex items-start gap-3 pt-4">
                    <div className="w-6 h-6 bg-sky-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sky-500 text-xs">💡</span>
                    </div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-3 bg-sky-50 px-6 py-3 rounded-full border border-sky-200 hover:bg-sky-100 hover:border-sky-300 transition-all duration-200 cursor-pointer"
          >
            <span className="text-sky-600 text-lg">❓</span>
            <span className="text-slate-700 font-medium">
              Остались вопросы? Свяжитесь с нами!
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
