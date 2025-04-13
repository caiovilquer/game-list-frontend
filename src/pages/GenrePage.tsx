// src/pages/RankingPage.tsx
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
  const { id } = useParams();

  // Busca os jogos da lista, já ordenados pelo back-end (por posição)
  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await api.get<Game[]>(`/lists/${id}/games`);
        setGames(response.data);
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
      }
    }
    fetchGames();
  }, [id]);

  useEffect(() => {
    async function fetchGenre() {
      if (!id) return;

      try {
        const response = await api.get<Genre[]>(`/lists`);
        const foundGenre = response.data.find((g) => g.id === parseInt(id, 10));
        setGenre(foundGenre?.name || "Gênero não encontrado");
      } catch (error) {
        console.error("Erro ao buscar detalhes do gênero:", error);
        setGenre("Erro ao carregar gênero");
      }
    }
    fetchGenre();
  }, [id]);

  // Função chamada ao encerrar o drag-and-drop
  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    // Se não houver destino ou se o item foi solto na mesma posição, não faz nada
    if (!destination || source.index === destination.index) return;

    // Cria uma cópia da lista para reordenação
    const newGames = Array.from(games);
    const [movedGame] = newGames.splice(source.index, 1);
    newGames.splice(destination.index, 0, movedGame);

    // Atualiza o estado para refletir a nova ordem na interface
    setGames(newGames);

    // Envia a atualização para o back-end, conforme a lógica de reposicionamento
    try {
      await api.post(`/lists/${id}/replacement`, {
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    } catch (error) {
      console.error("Erro ao atualizar o ranking:", error);
      // Opcionalmente, se a requisição falhar, pode-se reverter a alteração local:
      setGames(games);
    }
  };

  return (
    <div>
      <h1>{genre}</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="games">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyle: "none", padding: 0, margin: 0 }}
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
                      style={{
                        ...provided.draggableProps.style,
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        backgroundColor: snapshot.isDragging
                          ? "#f0f0f0"
                          : "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: "#4a90e2",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                          marginRight: "16px",
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </div>
                      <Link
                        to={`/games/${game.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <img
                          src={game.imgUrl}
                          alt={game.title}
                          style={{ width: "80px", marginRight: "16px" }}
                        />
                        <div>
                          <h2 style={{ margin: 0 }}>{game.title}</h2>
                          <p style={{ margin: 0 }}>{game.shortDescription}</p>
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
