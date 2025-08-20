import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types/Game';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  // URL da imagem padrão caso não tenha uma
  const defaultImageUrl = '/images/default-game-cover.jpg';
  
  // Determina a cor do emblema baseado no gênero do jogo
  const getBadgeColor = (genre: string) => {
    const genreMap: Record<string, string> = {
      'Ação': 'bg-red-600',
      'RPG': 'bg-purple-600',
      'Aventura': 'bg-green-600',
      'Esporte': 'bg-yellow-600',
      'Estratégia': 'bg-blue-600',
      'Puzzle': 'bg-pink-600'
    };
    
    return genreMap[genre] || 'bg-gray-600';
  };

  return (
    <div className="card game-card bg-gray-800 rounded-lg overflow-hidden border border-gray-700 h-full w-full flex flex-col">
      <div className="relative overflow-hidden h-min flex-shrink-0">
        <img 
          src={game.imgUrl || defaultImageUrl} 
          alt={game.title} 
          className="game-cover w-full h-full object-fill transition-transform hover:scale-105 duration-500 rounded-t-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImageUrl;
          }}
        />
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/games/${game.id}`} className="block flex-1">
          <h3 className="game-title text-lg font-bold text-game-accent mb-2 hover:text-game-primary transition-colors">{game.title}</h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-sm">{game.year || 'Ano desconhecido'}</span>
          <span className="text-gray-300 text-sm bg-gray-700 px-2 py-1 rounded">{game.platform}</span>
        </div>
        
        <div className="mt-4 flex justify-center items-center">
          <Link 
            to={`/games/${game.id}`} 
            className="btn-primary text-sm px-3 py-1.5 rounded-md inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
