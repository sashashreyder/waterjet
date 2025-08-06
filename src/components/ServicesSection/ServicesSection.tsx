import {
  Gem,
  Layers3,
  Hammer,
  Cog,
  PanelTop,
  Square,
  Droplet,
  Trees,
  WandSparkles,
} from 'lucide-react';

const services = [
  {
    icon: <Gem size={28} className="text-sky-500" />,
    title: 'Резка камня',
    desc: 'Гранит, мрамор, кварц, акрил — точная резка сложных форм без сколов.',
  },
  {
    icon: <Layers3 size={28} className="text-sky-500" />,
    title: 'Резка керамогранита',
    desc: 'Подходит для тонких и прочных плит.',
  },
  {
    icon: <Hammer size={28} className="text-sky-500" />,
    title: 'Резка металла и стали',
    desc: 'Нержавейка, алюминий, латунь — промышленная точность и чистота реза.',
  },
  {
    icon: <Cog size={28} className="text-sky-500" />,
    title: 'Резка резины',
    desc: 'Обработка гибких материалов с сохранением формы.',
  },
  {
    icon: <PanelTop size={28} className="text-sky-500" />,
    title: 'Резка плитки',
    desc: 'Точная резка керамической и клинкерной плитки.',
  },
  {
    icon: <Square size={28} className="text-sky-500" />,
    title: 'Резка оргстекла и пластика',
    desc: 'Высокоточная резка без сколов и перегрева.',
  },
  {
    icon: <Droplet size={28} className="text-sky-500" />,
    title: 'Резка стекла',
    desc: 'Работа с хрупкими материалами на сложных радиусах.',
  },
  {
    icon: <Trees size={28} className="text-sky-500" />,
    title: 'Резка дерева',
    desc: 'Декоративные панели и инженерные решения.',
  },
  {
    icon: <WandSparkles size={28} className="text-sky-500" />,
    title: 'Индивидуальные решения',
    desc: 'Готовы обсудить нестандартные материалы и формы.',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3"
          data-aos="fade-up"
        >
          Наши услуги
        </h2>
        <p
          className="text-slate-600 text-lg max-w-2xl mx-auto"
          data-aos="fade-up"
        >
          Точная гидроабразивная резка для архитектуры, строительства и производства.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-start bg-slate-50 rounded-lg p-4 shadow-sm hover:shadow transition duration-300"
            data-aos="fade-up"
          >
            <div className="mr-4">{service.icon}</div>
            <div>
              <h3 className="text-base font-semibold text-slate-800 mb-1">
                {service.title}
              </h3>
              <p className="text-sm text-slate-600">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;


