import { useEffect, useState } from "react";
import api from "../services/api";
import { Game } from "../types/Game";
import { Link } from "react-router-dom";

export function GameList() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    api
      .get<Game[]>("/games")
      .then((response) => setGames(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Lista de Jogos</h1>
      <Link to="/new">
        <button style={{ marginBottom: "20px" }}>Cadastrar Novo Jogo</button>
      </Link>
      <ul>
        {games.map((game) => (
          <li key={game.id} style={{ marginBottom: "20px", listStyle: "none" }}>
            <Link
              to={`/games/${game.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h2>
                {game.title} ({game.year})
              </h2>
              <img
                src={game.imgUrl}
                alt={game.title}
                style={{ width: "120px", borderRadius: "10px" }}
              />
              <p>{game.shortDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
