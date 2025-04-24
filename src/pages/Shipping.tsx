import React from 'react';
import Layout from '@/components/Layout';

const Shipping = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Shipping & Delivery</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Delivery Areas</h2>
            <p className="mb-4">
              Swift Swiss Cart currently delivers to all districts within the city of Zurich. 
              We're continuously expanding our service area to reach more customers.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Covered Districts:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
                <li>Zürich City Center</li>
                <li>Wiedikon</li>
                <li>Oerlikon</li>
                <li>Altstetten</li>
                <li>Seefeld</li>
                <li>Enge</li>
                <li>Wollishofen</li>
                <li>Höngg</li>
                <li>Albisrieden</li>
                <li>Schwamendingen</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Delivery Times</h2>
            <p className="mb-4">
              We pride ourselves on fast and reliable delivery services. Your convenience is our priority.
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">Order Type</th>
                    <th className="py-3 px-4 text-left">Delivery Time</th>
                    <th className="py-3 px-4 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4">Standard Delivery</td>
                    <td className="py-3 px-4">30-60 minutes</td>
                    <td className="py-3 px-4">Dependent on distance and current demand</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Priority Delivery</td>
                    <td className="py-3 px-4">20-40 minutes</td>
                    <td className="py-3 px-4">Additional fee applies</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Scheduled Delivery</td>
                    <td className="py-3 px-4">Selected time window</td>
                    <td className="py-3 px-4">Available up to 3 days in advance</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="mt-4 text-sm text-gray-600">
              * Delivery times may be affected during peak hours, adverse weather conditions, or special events.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Delivery Fees</h2>
            <p className="mb-4">
              Our delivery fees are transparent and calculated based on your location and order value.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-2">Standard Fees:</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Orders under CHF 30:</span> CHF 5.90 delivery fee</li>
                <li><span className="font-medium">Orders CHF 30-60:</span> CHF 3.90 delivery fee</li>
                <li><span className="font-medium">Orders over CHF 60:</span> Free delivery</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Additional Fees:</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Priority Delivery:</span> +CHF 4.90</li>
                <li><span className="font-medium">Scheduled Delivery:</span> +CHF 2.90</li>
                <li><span className="font-medium">Distant Districts:</span> +CHF 1.90 (applies to some outer districts)</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
            <p className="mb-4">
              Track your order in real-time through our easy-to-use tracking system:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Receive a tracking link via email after your order is confirmed</li>
              <li>Click the link to view your delivery status</li>
              <li>Watch as your delivery moves from our store to your door</li>
              <li>Get notified when your delivery is about to arrive</li>
            </ol>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Delivery Policies</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Age Verification</h3>
                <p>For age-restricted products (alcohol, etc.), the recipient must present valid ID proving they meet the legal age requirement.</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Contactless Delivery</h3>
                <p>We offer contactless delivery options. Please select this preference during checkout and provide any specific instructions.</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Failed Deliveries</h3>
                <p>If we're unable to deliver your order (no one home, unreachable location, etc.), we'll contact you to arrange a redelivery or pickup.</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Delivery Guarantee</h3>
                <p>If your delivery exceeds the promised delivery time by more than 15 minutes, you may be eligible for a delivery fee refund. Contact customer service for details.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping; 