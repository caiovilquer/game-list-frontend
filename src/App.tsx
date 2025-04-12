import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameList } from './pages/GameList';
import { GameDetail } from './pages/GameDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/games/:id" element={<GameDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
