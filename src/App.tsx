import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Modal from './components/Modal/Modal';
import CallbackForm from './components/CallbackForm/CallbackForm';
import ServicesSection from './components/ServicesSection/ServicesSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import WorksSection from './components/WorkSection/WorkSection';
import FAQ from './components/Faq';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';
import Presentation from './components/Presentation';
import BackToTop from './components/BackToTop';
import CookieConsent from './components/CookieConsent';
import AdminPanel from './components/AdminPanel';
import { initAOS } from './aos';

function App() {
  useEffect(() => {
    initAOS();
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header onCallClick={openModal} />

        <main className="flex-grow">
          <Hero onCallClick={openModal} />
          <FeaturesSection />
          <WorksSection />
          <ServicesSection />
          <Presentation />
          <FAQ onContactClick={openModal} />
          <ContactSection onCallClick={openModal} />
        </main>

        <Footer />
        <BackToTop />
        <CookieConsent />
        <AdminPanel />

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CallbackForm />
        </Modal>
      </div>
    </>
  );
}

export default App;




