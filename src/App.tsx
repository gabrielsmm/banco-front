import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Transferencias from './pages/Transferencias';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transferencias" element={<Transferencias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
