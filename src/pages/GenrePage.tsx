import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import api from "../services/api";
import { Game } from "../types/Game";
import { Link, useParams } from "react-router-dom";
import { Genre } from "../types/Genre";

export function RankingPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [genre, setGenre] = useState<string>("Carregando...");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch games
        const gamesResponse = await api.get<Game[]>(`/lists/${id}/games`);
        setGames(gamesResponse.data);

        // Fetch genre name
        const genresResponse = await api.get<Genre[]>(`/lists`);
        const foundGenre = genresResponse.data.find(
          (g) => g.id === parseInt(id || "0", 10)
        );
        setGenre(foundGenre?.name || "Gênero não encontrado");

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    const newGames = Array.from(games);
    const [movedGame] = newGames.splice(source.index, 1);
    newGames.splice(destination.index, 0, movedGame);

    setGames(newGames);

    try {
      await api.post(`/lists/${id}/replacement`, {
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    } catch (error) {
      console.error("Erro ao atualizar o ranking:", error);
      setGames(games); // Revert to original state if API call fails
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="loading-indicator"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
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
      
      {/* Cabeçalho */}
      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-title text-game-accent glow-text flex items-center">
              <img src="/icons/trophy.svg" alt="Troféu" className="h-8 w-8 mr-3" />
              {genre}
            </h1>
            <div className="bg-gray-700 text-white text-xs font-medium px-3 py-1 rounded-full">
              Ranking por posição
            </div>
          </div>
          <p className="text-gray-400 mt-3">
            Arraste e solte para reordenar os jogos deste gênero por sua preferência
          </p>
        </div>
      </div>
      
      {/* Ranking */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="games">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {games.map((game, index) => (
                <Draggable
                  key={game.id.toString()}
                  draggableId={game.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 ${
                        snapshot.isDragging ? "shadow-neon scale-105" : "hover:border-purple-500/30"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-12 h-12 flex items-center justify-center font-title text-lg ${index < 3 ? 'bg-game-primary' : 'bg-gray-700'}`}>
                          {index + 1}
                        </div>
                        <Link
                          to={`/games/${game.id}`}
                          className="flex flex-1 overflow-hidden p-4"
                        >
                          <img
                            src={game.imgUrl}
                            alt={game.title}
                            className="h-16 w-28 object-cover rounded mr-4"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/default-game-cover.jpg';
                            }}
                          />
                          <div className="overflow-hidden">
                            <h2 className="text-game-accent font-medium text-lg truncate">{game.title}</h2>
                            <p className="text-gray-400 text-sm line-clamp-2">
                              {game.shortDescription}
                            </p>
                          </div>
                        </Link>
                        <div className="flex items-center mr-4">
                          <div className="flex items-center bg-gray-900 rounded-full px-3 py-1 text-sm">
                            <span className="mr-1">{game.score}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      
      {/* Instrução */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 mt-6 text-center">
        <p className="text-gray-400 text-sm flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-game-secondary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Arraste para reordenar os jogos - As alterações são salvas automaticamente
        </p>
      </div>
    </div>
  );
}
