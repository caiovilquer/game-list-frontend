import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { Game } from "../types/Game";

export function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const defaultImageUrl = '/images/default-game-cover.jpg';

  useEffect(() => {
    setLoading(true);
    api
      .get<Game>(`/games/${id}`)
      .then((response) => {
        if (response.data) {
          setGame(response.data);
        } else {
          console.error("No data returned from API");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching game details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="loading-indicator"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="text-center py-12">
        <img 
          src="/icons/controller.svg" 
          alt="Jogo não encontrado" 
          className="w-24 h-24 mx-auto mb-6 opacity-50"
        />
        <h2 className="text-2xl font-title text-game-accent mb-4">Jogo não encontrado</h2>
        <p className="text-gray-400 mb-8">O jogo que você está procurando não existe ou foi removido.</p>
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para a lista de jogos
        </Link>
      </div>
    );
  }

  // Função para criar estrelas com base na pontuação
  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const halfStar = score % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="w-6 h-6 text-game-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    
    if (halfStar) {
      stars.push(
        <svg key="half-star" className="w-6 h-6 text-game-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#4B5563" />
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Navegação e voltar */}
      <div className="mb-8">
        <Link 
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-game-accent transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para a lista
        </Link>
      </div>
      
      {/* Cabeçalho do jogo */}
      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg mb-8 pulse-glow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Imagem do jogo */}
          <div className="lg:col-span-1 relative overflow-hidden">
            <div className="w-full max-w-sm mx-auto">
              <img 
                src={game.imgUrl || defaultImageUrl} 
                alt={game.title}
                className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform hover:scale-105 duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultImageUrl;
                }}
              />
            </div>
            <div className="absolute bottom-2 left-2 lg:static lg:mt-4">
              <span className="inline-block bg-game-primary text-white text-sm font-bold px-3 py-1 rounded-md">
                {game.genre || 'Sem gênero'}
              </span>
            </div>
          </div>
          
          {/* Detalhes do jogo */}
          <div className="lg:col-span-2">
            <div className="flex flex-col h-full">
              <h1 className="text-3xl md:text-4xl font-title text-game-accent mb-2 glow-text">
                {game.title}
              </h1>
              
              <div className="mb-6">
                <p className="text-gray-400 text-lg">{game.year}</p>
              </div>
              
              <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
                <h3 className="text-xl font-title text-game-secondary mb-3">Detalhes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 mb-1">Plataforma</p>
                    <p className="text-white font-medium">{game.platform}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-1">Gênero</p>
                    <p className="text-white font-medium">{game.genre || 'Sem gênero'}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <p className="text-gray-400 mb-1">Avaliação</p>
                    <div className="flex items-center">
                      {renderStars(game.score)}
                      <span className="ml-2 text-white font-bold">{game.score}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resumo do jogo */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-title text-game-secondary mb-4">Resumo</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed">{game.shortDescription}</p>
        </div>
      </div>
      
      {/* Descrição do jogo */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
        <h2 className="text-2xl font-title text-game-secondary mb-4">Sobre o jogo</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed">{game.longDescription}</p>
        </div>
      </div>
    </div>
  );
}
