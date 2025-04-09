
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterSection = () => {
  return (
    <section className="py-12 bg-shop-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-shop-dark mb-3">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for exclusive offers, recipes, and updates on new products.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow border-shop-primary/20 focus-visible:ring-shop-primary"
              required
            />
            <Button type="submit" className="bg-shop-primary hover:bg-shop-primary/90 text-white whitespace-nowrap">
              Subscribe
            </Button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to receive marketing communications from us.
            You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
