import { Eye, Wrench, ThumbsUp } from 'lucide-react';

const steps = [
  {
    icon: <Eye size={28} className="text-white" />,
    title: 'Анализ задачи',
    description:
      'Определяем техническую возможность: какие материалы подойдут, какая точность требуется, каков объём работ.',
  },
  {
    icon: <Wrench size={28} className="text-white" />,
    title: 'Параметры и настройка',
    description:
      'Настраиваем оборудование под проект, формируем траекторию резки и подготавливаем чертежи.',
  },
  {
    icon: <ThumbsUp size={28} className="text-white" />,
    title: 'Готовый результат',
    description:
      'Изделие точно вырезано, аккуратно упаковано и доставлено вовремя. Мы берём на себя полный цикл.',
  },
];

const HowSection = ({ onCallClick }: { onCallClick: () => void }) => {
  return (
    <section id="how" className="bg-sky-50 py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center mb-6" data-aos="fade">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2">
          Как мы работаем
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto mt-5 mb-10">
          Надёжный и понятный процесс: от запроса — до упаковки готового изделия.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-10 mt-12й mb-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-5"
            data-aos="fade-up"
          >
            <div className="flex-shrink-0 bg-sky-600 rounded-full h-12 w-12 flex items-center justify-center shadow-md">
              {step.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-1">
                {step.title}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center" data-aos="fade-up">
  <button
    onClick={onCallClick}
    className="px-6 py-3 bg-sky-600 text-white rounded-full text-base font-medium hover:bg-sky-700 transition"
  >
    Заказать резку
  </button>
</div>
    </section>
  );
};

export default HowSection;



