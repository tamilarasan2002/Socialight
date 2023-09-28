import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContaxtProvider } from './Contaxt/authContaxt';
import { ForgotContaxtProvider } from './Contaxt/forgotContaxt.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ForgotContaxtProvider>
    <AuthContaxtProvider>
        <App />
      </AuthContaxtProvider>
    </ForgotContaxtProvider>
  </React.StrictMode>
);

reportWebVitals();
