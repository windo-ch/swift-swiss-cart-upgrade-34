
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Emma Müller',
    location: 'Züri, ZH',
    rating: 5,
    content: 'D\'Produkt sind immer frisch und d\'Lieferig isch pünktlich. Ich find, d\'Websiite isch super eifach zum bediene!'
  },
  {
    id: 2,
    name: 'Michael Keller',
    location: 'Winterthur, ZH',
    rating: 4,
    content: 'Brings isch e Veränderig für üsi Familie im Alltag. Qualitativ hochstehendi Produkt und en excellente Kundeservice.'
  },
  {
    id: 3,
    name: 'Sarah Huber',
    location: 'Dübendorf, ZH',
    rating: 5,
    content: 'Ich schätze die grossi Uswal a biologische Produkt. D\'Qualität isch immer erstklassig und d\'Lieferig pünktlich.'
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-shop-light to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brings-dark mb-2">Was üsi Kunden säged</h2>
          <p className="text-gray-600">Nöd nur uf üs lose</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={16} 
                    className={i < testimonial.rating ? "fill-brings-secondary text-brings-secondary" : "text-gray-300"} 
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-medium text-brings-dark">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
