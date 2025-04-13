import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Game } from "../types/Game";
import styles from "../assets/styles/GameDetail.module.css";

export function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get<Game>(`/games/${id}`)
      .then((response) => {
        setGame(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!game) return <p>Jogo não encontrado.</p>;

  return (
    <div className={`page-container ${styles.container}`}>
      <div className={styles.gameHeader}>
        <div className={styles.imageContainer}>
          <img
            src={game.imgUrl}
            alt={game.title}
            className={styles.gameImage}
          />
        </div>
        <div>
          <h1 className={styles.title}>
            {game.title} ({game.year})
          </h1>
          <div className={styles.metadata}>
            <p className={styles.metaItem}>
              <span className={styles.label}>Gênero:</span> {game.genre}
            </p>
            <p className={styles.metaItem}>
              <span className={styles.label}>Plataforma:</span> {game.platform}
            </p>
            <p className={styles.metaItem}>
              <span className={styles.label}>Nota:</span>{" "}
              <span className={styles.score}>{game.score}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.description}>{game.longDescription}</div>
    </div>
  );
}
