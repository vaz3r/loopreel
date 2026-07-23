import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Engine from './editor';
import ExportRenderer from './SlideRenderer';

function App() {
  const [slideData, setSlideData] = React.useState(() => window.__SLIDE_DATA);

  React.useEffect(() => {
    const handleUpdate = () => {
      setSlideData(window.__SLIDE_DATA);
    };
    window.addEventListener('slide-update', handleUpdate);
    return () => window.removeEventListener('slide-update', handleUpdate);
  }, []);

  if (typeof slideData !== 'undefined') {
    return <ExportRenderer />;
  }
  return <Engine />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
