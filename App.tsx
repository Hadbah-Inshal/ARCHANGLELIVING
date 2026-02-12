
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Shop from './pages/Shop';
import Classes from './pages/Classes';
import ProductDetails from './pages/ProductDetails';
import PlanDetails from './pages/PlanDetails';
import Cart from './pages/Cart';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const hash = currentHash || '#home';

    // "Pages" use the #/ prefix. For those, always go to top.
    if (hash.startsWith('#/')) {
      window.scrollTo(0, 0);
      return;
    }

    // Home section anchors (e.g. #shop). When coming from another page,
    // the anchor might not exist at the exact moment the hash changes.
    const id = hash.replace('#', '');
    if (!id) return;

    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, [currentHash]);

  const route = currentHash.startsWith('#/')
    ? currentHash.slice(2).split('?')[0]
    : '';

  useEffect(() => {
    setIsPageVisible(false);
    const id = window.setTimeout(() => {
      setIsPageVisible(true);
    }, 10);
    return () => window.clearTimeout(id);
  }, [route]);

  return (
    <div className="flex flex-col min-h-screen selection:bg-red-600/30 selection:text-red-500 scroll-smooth">
      <Navbar />
      
      <main
        className={`flex-grow overflow-x-hidden transition-opacity duration-500 ease-out ${
          isPageVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {route === 'checkout' ? (
          <Checkout key={currentHash} />
        ) : route === 'cart' ? (
          <Cart key={currentHash} />
        ) : route === 'shop' ? (
          <Shop key={currentHash} />
        ) : route === 'classes' ? (
          <Classes key={currentHash} />
        ) : route === 'contact' ? (
          <Contact key={currentHash} />
        ) : route === 'product' ? (
          <ProductDetails key={currentHash} />
        ) : route === 'plan' ? (
          <PlanDetails key={currentHash} />
        ) : (
          <Home key={currentHash} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
