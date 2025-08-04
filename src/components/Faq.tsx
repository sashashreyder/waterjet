import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12" id="faq">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Частые вопросы</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium focus:outline-none"
              onClick={() => toggle(index)}
            >
              <span>{item.question}</span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
