import { useEffect, useState } from 'react';
import api from '../services/api';
import { Game } from '../types/Game';

export function GameList() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    api.get<Game[]>('/games')
      .then(response => setGames(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Lista de Jogos</h1>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            {game.title} - {game.genre} ({game.platform})
          </li>
        ))}
      </ul>
    </div>
  );
}
