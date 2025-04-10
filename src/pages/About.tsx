
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PromoBanner from '../components/PromoBanner';
import { MapPin, Clock, Truck, Award, Users, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-brings-dark text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Über Eus</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Mir bringed Züri schnell und zuverlässig Snacks und Getränk - wänn immer du willsch.
            </p>
          </div>
        </div>
        
        {/* Our Story */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold text-brings-dark mb-6">Üsi Gschicht</h2>
                <p className="text-gray-600 mb-4">
                  Brings isch 2023 in Züri entstande, wo mer gmerkt händ, dass es kei eifachi Möglichkeit git, schnell Snacks und Getränk z'bstelle, wänn mer spontan Bsuech überchunt oder en Filmabig plant.
                </p>
                <p className="text-gray-600 mb-4">
                  Mir händ mit eim Fahrer und wenige Produkt agfange, und sind jetzt stolz, ganz Züri mit üsem Service z'versorge. Üses Ziel isch, die schnellsti und zuverlässigsti Lieferig vo Snacks und Getränk i de Stadt z'si.
                </p>
                <p className="text-gray-600">
                  Mit Brings chasch sicher si, dass di Lieblings-Snacks und Getränk innerhalb vo 30 Minute bi dir sind - immer wenn du sie bruuchsch.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-brings-secondary/20 rounded-full blur-3xl transform -translate-x-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1519748771451-a94c596fad67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Brings Team" 
                  className="rounded-lg shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Values */}
        <div className="py-16 bg-brings-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-brings-dark text-center mb-12">Üsi Werte</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Clock size={40} className="text-brings-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Schnelligkeit</h3>
                <p className="text-gray-600">
                  Mir garantiered dir, dass dini Bstellig innerhalb vo 30 Minute bi dir isch. S'Lebe isch z'churz für langi Warteziite.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Award size={40} className="text-brings-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Qualität</h3>
                <p className="text-gray-600">
                  Mir verkaufed nur Produkt, wo mir selber gern händ. Qualität und Frische staht bi eus a erster Stelle.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Shield size={40} className="text-brings-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Zuverlässigkeit</h3>
                <p className="text-gray-600">
                  Du chasch dich uf eus verlah. Mir informiered dich über jede Schritt vo dinere Bstellig und sind immer für dich da.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Coverage Map */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1580601654452-f6a5bf6b9095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Züri Map" 
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold text-brings-dark mb-6">Liefergebiet</h2>
                <p className="text-gray-600 mb-4">
                  Aktuell liefered mir in alli Kreis vo de Stadt Züri. Vo Altstette bis Wollishofe, vo Oerlikon bis Witikon - mir sind überall für dich da.
                </p>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-center">
                    <MapPin size={20} className="text-brings-primary mr-2" />
                    <span>Kreis 1-12 in Züri</span>
                  </li>
                  <li className="flex items-center">
                    <Clock size={20} className="text-brings-primary mr-2" />
                    <span>Lieferzite: 10:00 - 22:00, 7 Tag in de Wuche</span>
                  </li>
                  <li className="flex items-center">
                    <Truck size={20} className="text-brings-primary mr-2" />
                    <span>Lieferig innerhalb vo 30 Minute</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team */}
        <div className="py-16 bg-brings-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-brings-dark mb-4">Üses Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Hinter Brings staht es Team us lideschaftliche Zürcherinne und Zürcher, wo dir de bescht Service wänd biete.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Team Member" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">Marco Meyer</h3>
                  <p className="text-gray-500">Co-Founder & CEO</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Team Member" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">Lisa Huber</h3>
                  <p className="text-gray-500">Co-Founder & COO</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Team Member" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">David Keller</h3>
                  <p className="text-gray-500">Head of Logistics</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Team Member" 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">Sarah Weber</h3>
                  <p className="text-gray-500">Marketing Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Join Us CTA */}
        <div className="py-16 bg-brings-primary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Werd Teil vom Brings Team</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Suchsch en spannendi Useforderig? Mir sind immer uf de Suech nach neue Talent für üses wachsende Team.
            </p>
            <a 
              href="#" 
              className="inline-block bg-white text-brings-primary font-bold px-8 py-3 rounded-xl hover:bg-brings-dark hover:text-white transition-colors"
            >
              Jobs aluege
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
