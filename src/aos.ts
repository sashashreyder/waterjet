import AOS from 'aos';
import 'aos/dist/aos.css';

export const initAOS = () => {
  AOS.init({
    duration: 600,
    easing: 'ease-out',
    once: true , 
  });
};

