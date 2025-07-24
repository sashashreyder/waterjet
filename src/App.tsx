import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Modal from './components/Modal/Modal';
import CallbackForm from './components/CallbackForm/CallbackForm';
import ServicesSection from './components/ServicesSection/ServicesSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import ClientsSection from './components/ClientsSection/ClientsSections';
import WorksSection from './components/WorkSection/WorkSection';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';
import { initAOS } from './aos';

function App() {
  useEffect(() => {
    initAOS();
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onCallClick={openModal} />

      <main className="flex-grow">
        <Hero onCallClick={openModal} />
        <FeaturesSection />
        <WorksSection />
        <ServicesSection />
        <ClientsSection />     
        <ContactSection onCallClick={openModal} />
      </main>

      <Footer />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CallbackForm />
      </Modal>
    </div>
  );
}

export default App;




