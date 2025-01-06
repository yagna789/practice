import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM from react-dom/client (for React 18+)
import './index.css'; // Import global styles (from index.css)
import App from './App'; // Import your main App component

// Get the root DOM element (from index.html)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
