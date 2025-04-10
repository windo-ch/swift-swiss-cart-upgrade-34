
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PromoBanner from '../components/PromoBanner';

const Impressum = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-brings-dark mb-6">Impressum</h1>
          
          <div className="prose max-w-none text-gray-700">
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">Firmeadresse</h2>
            <p className="mb-6">
              Brings AG<br />
              Bahnhofstrasse 1<br />
              8001 Züri<br />
              Schwiiz
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">Kontakt</h2>
            <p className="mb-6">
              Telefon: +41 44 123 45 67<br />
              E-Mail: hallo@brings.ch<br />
              Website: www.brings.ch
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">Handelsregister</h2>
            <p className="mb-6">
              Handelsregisteramt Züri<br />
              Firmennummer: CHE-123.456.789<br />
              UID: CHE-123.456.789 MWST
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">Gschäftsleitung</h2>
            <p className="mb-6">
              Max Mustermann, CEO<br />
              Lisa Musterfrau, COO
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">Verantwortlich für de Inhalt</h2>
            <p className="mb-6">
              Max Mustermann<br />
              Brings AG<br />
              Bahnhofstrasse 1<br />
              8001 Züri<br />
              Schwiiz
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">Streitschlichtung</h2>
            <p className="mb-6">
              Mir sind weder bereit no verpflichtet, an Streitbeilegungsverfahre vor ere Verbraucherschlichtigsstell teilzneh.
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">Haftungsusschluss</h2>
            <p className="mb-4">
              Trotz sorgfältiger inhaltlicher Kontrolle übernehme mir kei Haftig für die Inhält vo externe Links.
              Für de Inhalt vo verlinkte Site sind usschliesslich dere Betriber verantwortlich.
            </p>
            
            <p className="text-sm text-gray-500 mt-6">
              Stand: 10. April 2025
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
