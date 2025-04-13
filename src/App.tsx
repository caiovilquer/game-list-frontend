import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameList } from "./pages/GameList";
import { GameDetail } from "./pages/GameDetail";
import { GameForm } from "./pages/GameForm";
import { RankingPage } from "./pages/GenrePage";
import { GamesPage } from "./pages/GamesPage";
import "./assets/styles/global.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GamesPage />} />
        <Route path="/games/:id" element={<GameDetail />} />
        <Route path="/new" element={<GameForm />} />
        <Route path="/generos/:id" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
