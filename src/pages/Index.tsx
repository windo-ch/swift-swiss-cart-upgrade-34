
import React from 'react';
import Layout from '@/components/Layout';

const Index = () => {
  return (
    <Layout>
      {/* Empty index page since we're handling the flow with InitialFlowHandler */}
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-brings-primary mb-4">Willkommen bei Brings</h1>
          <p className="text-gray-600 mb-6">Din Liefer-Service für Snacks und Getränk</p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
