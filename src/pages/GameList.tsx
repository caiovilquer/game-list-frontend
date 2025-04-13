import { useEffect, useState } from "react";
import api from "../services/api";
import { Game } from "../types/Game";
import { Link } from "react-router-dom";
import { Genre } from "../types/Genre";
import genreStyles from "../assets/styles/GenreList.module.css";
import gameStyles from "../assets/styles/GameList.module.css";

export function GenreList() {
  const [genre, setGenre] = useState<Genre[]>([]);

  useEffect(() => {
    api
      .get<Genre[]>("/lists")
      .then((response) => setGenre(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={`page-container ${genreStyles.container}`}>
      <h1 className={genreStyles.title}>Lista de Jogos</h1>
      <ul className={genreStyles.genreList}>
        {genre.map((genre) => (
          <button key={genre.id} className={genreStyles.genreButton}>
            <Link to={`/generos/${genre.id}`} className={genreStyles.genreLink}>
              <h2 className={genreStyles.genreName}>{genre.name}</h2>
            </Link>
          </button>
        ))}
      </ul>
    </div>
  );
}

export function GameList() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    api
      .get<Game[]>("/games")
      .then((response) => setGames(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={`${gameStyles.container}`}>
      <div className={gameStyles.headerContainer}>
        <h2 className={gameStyles.sectionTitle}>Todos os Jogos</h2>
        <Link to="/new" className={gameStyles.addButton}>
          <span className={gameStyles.addIcon}>+</span>
          <span className={gameStyles.addText}>Adicionar Jogo</span>
        </Link>
      </div>
      <ul className={gameStyles.gamesList}>
        {games.map((game) => (
          <li key={game.id} className={gameStyles.gameItem}>
            <Link to={`/games/${game.id}`} className={gameStyles.gameLink}>
              <h2 className={gameStyles.gameTitle}>
                {game.title} ({game.year})
              </h2>
              <img
                src={game.imgUrl}
                alt={game.title}
                className={gameStyles.gameImage}
              />
              <p className={gameStyles.gameDescription}>
                {game.shortDescription}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
