import { Routes, Route } from 'react-router-dom';
import { RenderPage } from './pages/RenderPage.js';

export default function App() {
  return (
    <Routes>
      <Route path="/render/:jobId/:slideIndex" element={<RenderPage />} />
      <Route path="*" element={<div style={{ padding: 40, fontFamily: 'Inter, sans-serif' }}><h1>Loopreel</h1><p>Content repurposing engine.</p></div>} />
    </Routes>
  );
}
