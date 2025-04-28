import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add global error handler for debugging
const originalConsoleError = console.error;
console.error = function(...args) {
  // Add a timestamp and marker for error logging
  console.log("🚨 ERROR CAUGHT at", new Date().toISOString());
  originalConsoleError.apply(console, args);
};

// Add initialization logging
console.log("🔄 Application initialization starting", new Date().toISOString());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log("🔄 React render called", new Date().toISOString());
