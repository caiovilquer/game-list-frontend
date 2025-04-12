import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameList } from './pages/GameList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
