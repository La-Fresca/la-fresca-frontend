import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
// import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);
