import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

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
    { href: '#features', label: 'Услуги' },
    { href: '#how', label: 'Как мы работаем' },
    { href: '#clients', label: 'Клиенты' },
    { href: '#works', label: 'Наши работы' },
    { href: '#contact', label: 'Контакты' },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-md px-6 py-4 flex justify-between items-center transition-all duration-300">
      <div className="text-2xl font-bold text-sky-600">RezkaGidro</div>

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
          <button
            onClick={onCallClick}
            className="ml-6 px-4 py-2 bg-sky-600 text-white rounded-full text-sm hover:bg-sky-700 transition"
          >
            Заказать звонок
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-sky-600"
            aria-label="Открыть меню"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div
            ref={menuRef}
            className={`absolute right-0 top-[55px] w-64 bg-white shadow-xl rounded-xl px-6 py-5 z-40 transform transition-all duration-300 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <nav className="flex flex-col gap-3 text-base text-slate-700">
              {navItems.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="hover:text-sky-600 transition"
                >
                  {label}
                </a>
              ))}
            </nav>
            <button
              onClick={() => {
                onCallClick();
                closeMenu();
              }}
              className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-full text-sm hover:bg-sky-700 transition w-full"
            >
              Заказать звонок
            </button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
