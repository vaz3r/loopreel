import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Engine from './editor';
import RenderSlide from './RenderSlide';

function App() {
  if (typeof window.__SLIDE_DATA !== 'undefined') {
    return <RenderSlide />;
  }
  return <Engine />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
