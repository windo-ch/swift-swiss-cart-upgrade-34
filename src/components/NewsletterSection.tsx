
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const NewsletterSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Newsletter aameldig",
      description: "Merci für dini Aamäldig! Du wirsch bald vo üs höre.",
    });
  };

  return (
    <section className="py-12 bg-brings-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-brings-dark mb-3">Blib uf em Laufende</h2>
          <p className="text-gray-600 mb-6">
            Mäld dich für üse Newsletter a und erhalte exklusivi Aagebot, Rezept und Updates zu neue Produkt.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Dini E-Mail Adresse" 
              className="flex-grow border-brings-primary/20 focus-visible:ring-brings-primary"
              required
            />
            <Button type="submit" className="bg-brings-primary hover:bg-brings-primary/90 text-white whitespace-nowrap">
              Aamelde
            </Button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4">
            Mit dinere Aamäldig bisch iverstande, Marketing-Mitteilige vo üs z'erhalte.
            Du chasch dich jederzit abmelde.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
