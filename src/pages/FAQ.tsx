import React from 'react';
import Layout from '@/components/Layout';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const FAQ = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium">
              How do I place an order?
            </AccordionTrigger>
            <AccordionContent>
              You can place an order by browsing our product catalog, adding items to your cart, and proceeding to checkout. 
              You'll need to provide your delivery address and payment information to complete your purchase.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium">
              What areas do you deliver to?
            </AccordionTrigger>
            <AccordionContent>
              We currently deliver to all districts in Zurich city. You can select your district during checkout to verify service availability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium">
              How long does delivery take?
            </AccordionTrigger>
            <AccordionContent>
              Delivery times typically range from 30-60 minutes depending on your location and current demand. 
              You can track your order status in real-time after placing your order.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium">
              How does age verification work?
            </AccordionTrigger>
            <AccordionContent>
              For age-restricted products, we require verification of your age upon delivery. 
              Our delivery person will check your ID to ensure you meet the legal age requirement for purchasing such products.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium">
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent>
              We accept credit/debit cards, TWINT, and cash on delivery. All online payments are securely processed.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-medium">
              How can I track my order?
            </AccordionTrigger>
            <AccordionContent>
              After placing your order, you'll receive a confirmation with an order tracking link. 
              You can also find your order status in your account under "Order History."
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg font-medium">
              What is your return policy?
            </AccordionTrigger>
            <AccordionContent>
              If you're not satisfied with your order, please contact our customer service within 24 hours of delivery. 
              For perishable goods, we may offer a refund or replacement depending on the situation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger className="text-lg font-medium">
              Do I need to create an account to order?
            </AccordionTrigger>
            <AccordionContent>
              While creating an account provides benefits like order history and faster checkout, 
              you can also place orders as a guest. However, age-restricted products require an account with verified age.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Layout>
  );
};

export default FAQ; 