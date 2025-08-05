import CallToAction from '../CallToAction/CallToAction';
import heroVideo from '../../assets/hero-bg.mp4';

const Hero = ({ onCallClick }: { onCallClick: () => void }) => {
  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-start overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div
        className="relative z-20 text-white px-4 sm:px-6 md:px-16 max-w-4xl text-left w-full"
        data-aos="fade"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-snug sm:leading-tight drop-shadow-lg">
          Гидроабразивная резка<br />на высшем уровне
        </h1>
        <p className="mb-6 sm:mb-8 text-lg sm:text-xl md:text-2xl drop-shadow">
          Точные резы, индивидуальный подход и надёжность на каждом этапе.
        </p>
        <CallToAction label="Перезвоните мне" onClick={onCallClick} />
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-[70px] sm:h-[100px] z-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,202.7C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>
    </section>
  );
};

export default Hero;






