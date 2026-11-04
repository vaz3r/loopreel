import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ExportRenderer from './SlideRenderer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ExportRenderer />
  </React.StrictMode>
);
