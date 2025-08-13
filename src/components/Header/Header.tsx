import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  onCallClick: () => void;
}

const Header = ({ onCallClick }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1000);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 1000;
      setIsDesktop(isNowDesktop);
      if (isNowDesktop) closeMenu();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { href: '#hero', label: 'Главная' },
    { href: '#features', label: 'Преимущества' },
    { href: '#works', label: 'Работы' },
    { href: '#services', label: 'Услуги' },
    { href: '#presentation', label: 'Презентация' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Контакты' },
  ];

  const phoneNumbers = [
    { number: '+7 (495) 203-17-78', href: 'tel:+74952031778' },
    { number: '+7 (926) 743-29-09', href: 'tel:+79267432909' },
  ];
  
  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-md px-6 py-4 flex justify-between items-center transition-all duration-300">
      <a href="#hero" className="text-2xl font-bold text-sky-600 hover:opacity-80 transition">
        RezkaGidro
      </a>
  
      {isDesktop ? (
        <>
          <nav className="flex space-x-6 text-sm text-slate-700">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="hover:text-sky-600 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>
  
          <div className="ml-6 flex flex-row gap-4 text-sm text-slate-700 max-xl:flex-col max-xl:items-end">
            {phoneNumbers.map((phone) => (
              <a
                key={phone.number}
                href={phone.href}
                className="flex items-center gap-1 text-sky-600 hover:underline"
              >
                <Phone size={14} /> {phone.number}
              </a>
            ))}
          </div>
  
          <button
            onClick={onCallClick}
            className="ml-6 px-4 py-2 bg-sky-600 text-white rounded-full text-sm hover:bg-sky-700 transition-colors duration-200"
          >
            Заказать звонок
          </button>
        </>
      ) : (
        <>
          {/* Мобильное выравнивание телефонов */}
          <div className="flex flex-col items-center gap-1 text-xs text-sky-600 mr-3">
            {phoneNumbers.map((phone) => (
              <a
                key={phone.number}
                href={phone.href}
                className="flex items-center gap-1"
              >
                <Phone size={14} /> {phone.number}
              </a>
            ))}
          </div>
  
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-sky-600"
            aria-label="Открыть меню"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
  
          <div
            ref={menuRef}
            className={`absolute right-0 top-[55px] w-64 bg-white shadow-xl rounded-xl px-6 py-5 z-40 transform transition-all duration-300 ease-out ${
              menuOpen
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
            }`}
          >
            <nav className="flex flex-col gap-3 text-base text-slate-700">
              {navItems.map(({ href, label }, index) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="hover:text-sky-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-sky-50"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {label}
                </a>
              ))}
            </nav>
  
            <div className="mt-4 flex flex-col items-center gap-1 text-sky-600">
              {phoneNumbers.map((phone) => (
                <a
                  key={phone.number}
                  href={phone.href}
                  className="flex items-center gap-2 hover:underline"
                >
                  <Phone size={16} /> {phone.number}
                </a>
              ))}
            </div>
  
            <button
              onClick={() => {
                onCallClick();
                closeMenu();
              }}
              className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-full text-sm hover:bg-sky-700 transition-colors duration-200 w-full"
            >
              Заказать звонок
            </button>
          </div>
        </>
      )}
    </header>
  )};
  
  export default Header;
  





