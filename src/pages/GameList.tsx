import { useEffect, useState } from "react";
import api from "../services/api";
import { Game } from "../types/Game";
import { Link } from "react-router-dom";
import { Genre } from "../types/Genre";

export function GenreList() {
  const [genre, setGenre] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get<Genre[]>("/lists")
      .then((response) => {
        setGenre(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-title text-game-primary glow-text">
          <span className="text-game-accent">{'<'}</span> 
          Gêneros de Jogos 
          <span className="text-game-accent">{'>'}</span>
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="loading-indicator"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {genre.map((genre) => (
            <Link 
              key={genre.id}
              to={`/generos/${genre.id}`} 
              className="bg-gray-800 border border-purple-500/20 rounded-lg p-4 transition-all duration-300 hover:border-purple-500/50 hover:shadow-neon hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-title text-game-accent">{genre.name}</h2>
                <div className="bg-game-primary/20 p-2 rounded-full">
                  <img 
                    src="/icons/controller-dpad.svg" 
                    alt="Controller" 
                    className="w-6 h-6"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-400">Ver jogos</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-game-secondary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

import GameCard from "../components/GameCard";

export function GameList() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get<Game[]>("/games")
      .then((response) => {
        setGames(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Filtrar jogos pela pesquisa
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-title text-game-primary mb-4 md:mb-0">
          <span className="text-game-accent">{'<'}</span> 
          Biblioteca de Jogos 
          <span className="text-game-accent">{'>'}</span>
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar jogos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-game-primary focus:border-transparent w-full md:w-60"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          
          <Link 
            to="/new" 
            className="btn-primary flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-neon w-full sm:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Adicionar Jogo
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="loading-indicator"></div>
        </div>
      ) : filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <img 
            src="/icons/trophy.svg" 
            alt="Sem resultados" 
            className="w-16 h-16 mx-auto mb-4 opacity-50"
          />
          <h3 className="text-xl font-title text-game-accent mb-2">
            Nenhum jogo encontrado
          </h3>
          <p className="text-gray-400">
            Tente outro termo de busca ou adicione novos jogos à sua biblioteca.
          </p>
        </div>
      )}
    </div>
  );
}
