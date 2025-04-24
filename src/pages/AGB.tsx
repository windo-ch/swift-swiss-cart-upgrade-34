
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AGB = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-brings-dark mb-6">Allgemeini Gschäftsbedingige</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Die folgendi Allgemeini Gschäftsbedingige (AGB) gältet für alli Gschäftsbeziehige zwüsche 
              de Brings AG und üsne Kunden.
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">1. Gältigsbereich</h2>
            <p className="mb-4">
              Die AGB regled s'Rächtsverhältnis zwüsche de Brings AG und em Kunde.
              Mit de Bestellig akzeptiert de Kunde die vorliegende AGB.
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">2. Vertragsabschluss</h2>
            <p className="mb-4">
              De Vertragsabschluss chunnt zstand, wenn de Kunde sini Bestellig über üsi Website ufgit
              und mir d'Bestellig mit ere Bestellbestätigung per E-Mail bestätiget.
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">3. Pris und Zahligsbedinige</h2>
            <p className="mb-4">
              Alli Pris sind in Schwizer Franke (CHF) und beinhaltet d'Mehrwertsteuer.
              Lieferchoschte werdet separat usgwise und bim Bestellvorgang azeigt.
            </p>
            <p className="mb-4">
              Zahlig isch möglich per:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Kreditcharte (Visa, Mastercard)</li>
              <li>Debitcharte (Maestro, V Pay)</li>
              <li>Twint</li>
              <li>PostFinance</li>
              <li>Rächnig (ab em zweite Bstell)</li>
            </ul>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">4. Lieferig</h2>
            <p className="mb-4">
              Mir liefered i alli Kreis vo de Stadt Züri innerhalb vo 30 Minute.
              D'Lieferig findet vo Mäntig bis Sunntig vo 11:00 bis 24:00 Uhr statt.
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">5. Widerrufsrächt</h2>
            <p className="mb-4">
              Ufgrund vo de Verderblichkeit vo üsne Produkt bestaht kei gsetzlichs Widerrufsrächt.
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">6. Haftung</h2>
            <p className="mb-4">
              Mir haftet nöd für Schäde, wo dur e unsachgemässi Lagerig oder Verwendig vo üsne Produkt entstönd.
            </p>
            
            <h2 className="text-xl font-bold text-brings-dark mt-6 mb-3">7. Schlussbestimmige</h2>
            <p className="mb-4">
              Gältet schwizeriscs Rächt unter Usschluss vom UN-Kaufrächt.
              Grichtstand isch Züri, Schwiiz.
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

export default AGB;
