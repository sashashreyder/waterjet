import CallToAction from '../CallToAction/CallToAction';
import styles from './Hero.module.css'

const Hero = ({ onCallClick }: { onCallClick: () => void }) => {
  return (
    <section className={`pt-20 min-h-screen flex items-center justify-center ${styles.heroBg}`}>
      <div className="text-center px-4 max-w-2xl" data-aos="fade">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
          Гидроабразивная резка<br /> на высшем уровне
        </h1>
        <p className="text-slate-600 text-lg mb-8">
          Точные резы, индивидуальный подход и надёжность на каждом этапе.
        </p>
        <CallToAction label="Перезвоните мне" onClick={onCallClick} />
      </div>
    </section>
  );    
};

export default Hero;
