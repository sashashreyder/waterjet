const Footer = () => {
    return (
      <footer className="bg-slate-800 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} Резка-Гидро. Все права защищены.</p>
          <div className="mt-4 md:mt-0 text-sm space-x-4">
            <a href="#features" className="hover:underline">Услуги</a>
            <a href="#works" className="hover:underline">Наши работы</a>
            <a href="#contact" className="hover:underline">Контакты</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
  