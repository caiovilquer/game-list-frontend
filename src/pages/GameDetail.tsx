import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Game } from '../types/Game';

export function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    api.get<Game>(`/games/${id}`)
      .then(response => setGame(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!game) return <p>Carregando...</p>;

  return (
    <div>
        <h1>{game.title} ({game.year})</h1>
        <img src={game.imgUrl} alt={game.title} style={{ width: '200px' }} />
        <p><strong>Gênero:</strong> {game.genre}</p>
        <p><strong>Plataforma:</strong> {game.platform}</p>
        <p><strong>Nota:</strong> {game.score}</p>
        <p>{game.longDescription}</p>
    </div>
  );
}
