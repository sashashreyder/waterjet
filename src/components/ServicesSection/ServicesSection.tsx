import {
    Gem,
    Ruler,
    Construction,
    Layers3,
    Cog,
    GlassWater,
    Square,
    LayoutGrid,
  } from 'lucide-react';
  
  const services = [
    {
      icon: <Gem size={32} className="text-sky-500" />,
      title: 'Резка натурального камня',
      desc: 'Гранит, мрамор, песчаник — точная резка сложных форм.',
    },
    {
      icon: <Ruler size={32} className="text-sky-500" />,
      title: 'Резка искусственного камня',
      desc: 'Акрил, кварц — аккуратная и без сколов обработка.',
    },
    {
      icon: <Layers3 size={32} className="text-sky-500" />,
      title: 'Резка керамогранита',
      desc: 'Подходит для тонких и прочных плит.',
    },
    {
      icon: <Construction size={32} className="text-sky-500" />,
      title: 'Резка металлов',
      desc: 'Нержавейка, алюминий, латунь — точная промышленная резка.',
    },
    {
      icon: <Cog size={32} className="text-sky-500" />,
      title: 'Резка резины',
      desc: 'Обработка гибких материалов с сохранением формы.',
    },
    {
      icon: <LayoutGrid size={32} className="text-sky-500" />,
      title: 'Резка плитки',
      desc: 'Аккуратная резка керамической и клинкерной плитки.',
    },
    {
      icon: <Square size={32} className="text-sky-500" />,
      title: 'Резка оргстекла и пластика',
      desc: 'Высокоточная резка без сколов и перегрева.',
    },
    {
      icon: <GlassWater size={32} className="text-sky-500" />,
      title: 'Резка стекла',
      desc: 'Работа с хрупкими материалами на сложных радиусах.',
    },
    {
      icon: <Gem size={32} className="text-sky-500" />,
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
            data-aos-delay="0"
          >
            Наши услуги
          </h2>
          <p
            className="text-slate-600 text-lg max-w-2xl mx-auto"
            data-aos="fade-up"
          >
            Мы предлагаем точную гидроабразивную резку для архитектуры, строительства и производства.
          </p>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow hover:shadow-md transition-transform duration-500 hover:scale-[1.02]"
              data-aos="fade-up"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default ServicesSection;  
  
  

