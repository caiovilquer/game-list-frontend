import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Game } from "../types/Game";

// Interface para o gênero, conforme o retorno do endpoint GET /lists
interface Genre {
  id: number;
  name: string;
}

export function GameForm() {
  const navigate = useNavigate();

  // Estado para armazenar os gêneros obtidos via GET /lists
  const [genres, setGenres] = useState<Genre[]>([]);

  // Carrega os gêneros ao montar o componente
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await api.get<Genre[]>("/lists");
        setGenres(response.data);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    }
    fetchGenres();
  }, []);

  // Estado do formulário com os campos atualizados
  const [formData, setFormData] = useState<Omit<Game, "id">>({
    title: "",
    genre: "",
    platform: "",
    year: new Date().getFullYear(),
    shortDescription: "",
    longDescription: "", // Novo campo para long description
    imgUrl: "",
    score: 0, // Novo campo para score
    listId: 1, // ID da lista padrão
  });

  // Função para lidar com alterações nos inputs e selects
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" || name === "score" ? Number(value) : value,
    }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const selectedGenre = genres.find((g) => g.name === selectedName);

    // Atualiza o estado com o nome e com o id correspondente, se encontrado
    setFormData((prev) => ({
      ...prev,
      genre: selectedName,
      listId: selectedGenre ? selectedGenre.id : 0,
    }));
  };

  // Função de submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/games", formData);
      alert("Jogo cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar jogo.");
    }
  };

  return (
    <div>
      <h1>Cadastrar Novo Jogo</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <label style={{ width: "120px", marginRight: "10px" }}>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <label style={{ width: "120px", marginRight: "10px" }}>Gênero:</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleGenreChange}
            required
            style={{ flex: 1 }}
          >
            <option value="" disabled>
              Selecione um gênero
            </option>
            {genres.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <label style={{ width: "120px", marginRight: "10px" }}>
            Plataforma:
          </label>
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <label style={{ width: "120px", marginRight: "10px" }}>Ano:</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <label style={{ width: "120px", marginRight: "10px" }}>
            Descrição curta:
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <label style={{ width: "120px", marginRight: "10px" }}>
            Descrição longa:
          </label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <label style={{ width: "120px", marginRight: "10px" }}>
            URL da Imagem:
          </label>
          <input
            type="text"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <label style={{ width: "120px", marginRight: "10px" }}>Score:</label>
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        <button
          type="submit"
          style={{ marginTop: "10px", padding: "8px", alignSelf: "flex-end" }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
