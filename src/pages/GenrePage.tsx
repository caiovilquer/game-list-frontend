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
import styles from "../assets/styles/GenrePage.module.css";

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

  if (loading) return <p className={styles.carregando}>Carregando...</p>;

  return (
    <div className={`page-container ${styles.container}`}>
      <h1 className={styles.title}>{genre}</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="games">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.gamesList}
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
                      className={`${styles.gameItem} ${
                        snapshot.isDragging ? styles.gameItemDragging : ""
                      }`}
                    >
                      <div className={styles.rankNumber}>{index + 1}</div>
                      <Link
                        to={`/games/${game.id}`}
                        className={styles.gameLink}
                      >
                        <img
                          src={game.imgUrl}
                          alt={game.title}
                          className={styles.gameImage}
                        />
                        <div className={styles.gameInfo}>
                          <h2 className={styles.gameTitle}>{game.title}</h2>
                          <p className={styles.gameDescription}>
                            {game.shortDescription}
                          </p>
                        </div>
                      </Link>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
