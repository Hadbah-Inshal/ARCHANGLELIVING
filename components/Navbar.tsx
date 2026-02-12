
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { useCart } from '../context/CartContext';
import logo from '../images/logo.jpeg';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    // If the hash is already set, hashchange won't fire. Scroll manually.
    if (window.location.hash === href && href.startsWith('#') && !href.startsWith('#/')) {
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Let the App-level hash handling do routing + scrolling.
    window.location.hash = href;
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md py-3 shadow-lg border-b border-red-900/30' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-black flex items-center justify-center">
            <img
              src={logo}
              alt="Archangel Living Logo"
              className="h-full w-full object-cover transform scale-150"
            />
          </div>
          <span className="font-oswald text-2xl font-bold tracking-tighter uppercase">ARCHANGEL<span className="text-red-600">LIVING</span></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-oswald uppercase tracking-widest text-sm hover:text-red-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#/cart"
            onClick={(e) => handleNavClick(e, '#/cart')}
            className="relative font-oswald uppercase tracking-widest text-sm hover:text-red-500 transition-colors"
            aria-label="Cart"
          >
            Cart
            {cart.itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.itemCount > 9 ? '9+' : cart.itemCount}
              </span>
            )}
          </a>
          <a 
            href="#/contact" 
            onClick={(e) => handleNavClick(e, '#/contact')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 font-oswald uppercase tracking-wider rounded-sm transition-all hover:scale-105 active:scale-95"
          >
            Join Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-black z-40 md:hidden transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-oswald text-3xl uppercase tracking-widest hover:text-red-600"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#/cart"
            onClick={(e) => handleNavClick(e, '#/cart')}
            className="font-oswald text-3xl uppercase tracking-widest hover:text-red-600"
          >
            Cart {cart.itemCount > 0 ? `(${cart.itemCount})` : ''}
          </a>
          <a
            href="#/contact"
            onClick={(e) => handleNavClick(e, '#/contact')}
            className="bg-red-600 text-white px-8 py-3 font-oswald text-xl uppercase tracking-wider"
          >
            Join Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
