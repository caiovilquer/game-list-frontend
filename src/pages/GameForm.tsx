import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Game } from "../types/Game";
import { Genre } from "../types/Genre";
import styles from "../assets/styles/GameForm.module.css";

export function GameForm() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await api.get<Genre[]>("/lists");
        setGenres(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
        setLoading(false);
      }
    }
    fetchGenres();
  }, []);

  const [formData, setFormData] = useState<Omit<Game, "id">>({
    title: "",
    genre: "",
    platform: "",
    year: new Date().getFullYear(),
    shortDescription: "",
    longDescription: "",
    imgUrl: "",
    score: 0,
    listId: 1,
  });

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

    setFormData((prev) => ({
      ...prev,
      genre: selectedName,
      listId: selectedGenre ? selectedGenre.id : 0,
    }));
  };

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

  if (loading)
    return <p className={styles.carregando}>Carregando gêneros...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastrar Novo Jogo</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Gênero:</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleGenreChange}
            required
            className={styles.select}
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

        <div className={styles.formGroup}>
          <label className={styles.label}>Plataforma:</label>
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Ano:</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descrição curta:</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descrição longa:</label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>URL da Imagem:</label>
          <input
            type="text"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Score:</label>
          <input
            type="number"
            name="score"
            min="0"
            max="10"
            step="0.1"
            value={formData.score}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}
