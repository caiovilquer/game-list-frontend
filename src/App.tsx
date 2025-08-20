import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameList } from "./pages/GameList";
import { GameDetail } from "./pages/GameDetail";
import { GameForm } from "./pages/GameForm";
import { GamesPage } from "./pages/GamesPage";
import { HowItWorks } from "./pages/HowItWorks";
import { RankingPage } from "./pages/GenrePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<GamesPage />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/new" element={<GameForm />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/generos/:id" element={<RankingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
