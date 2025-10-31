import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Properties from './components/Properties';
import Partnerships from './components/Partnerships';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import BackToTopButton from './components/BackToTopButton';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <Hero />
        <Stats />
        <Services />
        <Properties />
        <Partnerships />
        <Testimonials />
      </main>
      <Footer />
      <ChatWidget />
      <BackToTopButton />
    </div>
  );
};

export default App;