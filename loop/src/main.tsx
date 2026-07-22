import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Engine from './editor';
import ExportRenderer from './SlideRenderer';

function App() {
  if (typeof window.__SLIDE_DATA !== 'undefined') {
    return <ExportRenderer />;
  }
  return <Engine />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
