import { Briefcase, Settings, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Settings size={36} className="text-sky-600" />,
    title: 'Точное оборудование',
    description:
      'Итальянская установка Idroline с 5-осевой головкой — рез под углом до 60°, идеален для сложных задач.',
  },
  {
    icon: <ShieldCheck size={36} className="text-sky-600" />,
    title: 'Умные технологии',
    description:
      'Tecnocam 3D и система IKC обеспечивают геометрически точную резку и аккуратные кромки.',
  },
  {
    icon: <Briefcase size={36} className="text-sky-600" />,
    title: '10 лет опыта',
    description:
      'Профессиональная команда с опытом в производстве, монтажах и постоянным обучением в CMS Industries.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center mb-14" data-aos="fade">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
          Почему выбирают нас
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Высокая точность, современные технологии и надёжный опыт в одном месте.
        </p>
      </div>

      <div
        className="grid grid-cols-1 gap-8 max-w-6xl mx-auto [@media(min-width:1028px)]:grid-cols-3"
      >
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-sky-50 rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            <div data-aos="fade" data-aos-delay={index * 150}>
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

