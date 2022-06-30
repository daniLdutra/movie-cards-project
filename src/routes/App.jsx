import { Home } from '../pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Details } from '../pages/Details/details';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
