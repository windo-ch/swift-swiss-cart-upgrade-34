
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Emma Thompson',
    location: 'Seattle, WA',
    rating: 5,
    content: 'The produce is always fresh and delivery is consistently on time. I love how easy the website is to navigate!'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Portland, OR',
    rating: 4,
    content: 'SwiftGrocery has been a game-changer for our busy family. Quality products and excellent customer service.'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    location: 'Vancouver, BC',
    rating: 5,
    content: 'I appreciate the wide selection of organic options. The quality is always top-notch and I can count on timely delivery.'
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-shop-light to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-shop-dark mb-2">What Our Customers Say</h2>
          <p className="text-gray-600">Don't just take our word for it</p>
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
                    className={i < testimonial.rating ? "fill-shop-secondary text-shop-secondary" : "text-gray-300"} 
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-medium text-shop-dark">{testimonial.name}</p>
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
