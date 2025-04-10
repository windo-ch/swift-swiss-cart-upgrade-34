
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PromoBanner } from '../components/PromoBanner';

const Dateschutz = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-brings-dark mb-6">Dateschutz</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Brings AG nimmt de Schutz vo dine persönliche Date sehr ernst. 
              I dere Dateschutzerklärig informiere mir dich, wie mir mit dine Date umgönd.
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">1. Verantwortlicher</h2>
            <p className="mb-4">
              Verantwortlich für d'Erhäbig, Verarbitig und Nutzig vo persönliche Date isch:
              <br />
              Brings AG
              <br />
              Bahnhofstrasse 1
              <br />
              8001 Züri
              <br />
              Schwiiz
              <br />
              hallo@brings.ch
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">2. Art der erhobene Date</h2>
            <p className="mb-4">
              Mir erhäbed folgendi Date, wenn du üsi Website benutzisch:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name und Vorname</li>
              <li>Adresse</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummere</li>
              <li>Bestelldate (Produkt, Mängi, Pris)</li>
              <li>IP-Adresse</li>
              <li>Zuegriffsdatum und -ziit</li>
            </ul>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">3. Zweck der Dateverarbitig</h2>
            <p className="mb-4">
              Mir verarbeiited dini Date für folgendi Zweck:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Abwicklig vo Bestellige</li>
              <li>Kundeservice</li>
              <li>Marketing (falls du igwilligt häsch)</li>
              <li>Verbesserig vo üsem Agebot</li>
            </ul>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">4. Dini Rächt</h2>
            <p className="mb-4">
              Du häsch folgendi Rächt bezüglich dine persönliche Date:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Rächt uf Uskunft</li>
              <li>Rächt uf Berichtigung</li>
              <li>Rächt uf Löschig</li>
              <li>Rächt uf Ischränkig der Verarbeitig</li>
              <li>Rächt uf Widerruf vo diner Iwilligung</li>
            </ul>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">5. Kontakt</h2>
            <p className="mb-4">
              Wenn du Frage zum Dateschutz häsch oder dini Rächt usüebe wottsch, chasch du 
              üs per E-Mail an datenschutz@brings.ch oder per Post kontaktiere.
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

export default Dateschutz;
