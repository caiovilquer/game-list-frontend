import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameList } from "./pages/GameList";
import { GameDetail } from "./pages/GameDetail";
import { GameForm } from "./pages/GameForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/games/:id" element={<GameDetail />} />
        <Route path="/new" element={<GameForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
