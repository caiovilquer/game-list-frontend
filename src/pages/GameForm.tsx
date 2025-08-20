import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Game } from "../types/Game";
import { Genre } from "../types/Genre";

export function GameForm() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    
    try {
      await api.post("/games", formData);
      
      // Exibe animação de sucesso
      const successElement = document.getElementById('success-message');
      if (successElement) {
        successElement.classList.remove('hidden');
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      
      // Exibe animação de erro
      const errorElement = document.getElementById('error-message');
      if (errorElement) {
        errorElement.classList.remove('hidden');
        setTimeout(() => {
          errorElement.classList.add('hidden');
        }, 3000);
      }
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
    <div className="max-w-3xl mx-auto">
      {/* Navegação de volta */}
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
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
        <h1 className="text-3xl font-title text-game-primary flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-game-accent" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Cadastrar Novo Jogo
        </h1>
        <p className="text-gray-400 mt-2">Preencha os campos abaixo para adicionar um jogo à sua coleção</p>
      </div>
      
      {/* Formulário */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-game-secondary font-title mb-2">Título</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-game-primary focus:border-transparent"
                placeholder="Ex: The Legend of Zelda"
              />
            </div>
            
            <div>
              <label className="block text-game-secondary font-title mb-2">Gênero</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleGenreChange}
                required
                className="input w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-game-primary focus:border-transparent"
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
            
            <div>
              <label className="block text-game-secondary font-title mb-2">Plataforma</label>
              <input
                type="text"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                required
                className="input w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-game-primary focus:border-transparent"
                placeholder="Ex: Nintendo Switch"
              />
            </div>
            
            <div>
              <label className="block text-game-secondary font-title mb-2">Ano</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="input w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-game-primary focus:border-transparent"
                placeholder="Ex: 2023"
              />
            </div>
          </div>
          
          {/* URL da imagem */}
          <div>
            <label className="block text-game-secondary font-title mb-2">URL da Imagem</label>
            <input
              type="text"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleChange}
              className="input w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-game-primary focus:border-transparent"
              placeholder="Cole o endereço da imagem (opcional)"
            />
            <p className="text-gray-500 text-xs mt-1">Deixe em branco para usar a imagem padrão</p>
          </div>
          
          {/* Score */}
          <div>
            <label className="block text-game-secondary font-title mb-2">Nota (0-10)</label>
            <input
              type="range"
              name="score"
              min="0"
              max="5"
              step="0.1"
              value={formData.score}
              onChange={handleChange}
              required
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-game-primary"
            />
            <div className="flex justify-between text-gray-400 text-sm mt-1">
              <span>0</span>
              <span className="text-game-accent font-bold">{formData.score.toFixed(1)}</span>
              <span>10</span>
            </div>
          </div>
          
          {/* Descrições */}
          <div>
            <label className="block text-game-secondary font-title mb-2">Descrição Curta</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              rows={2}
              className="input w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-game-primary focus:border-transparent"
              placeholder="Um breve resumo do jogo"
            />
          </div>
          
          <div>
            <label className="block text-game-secondary font-title mb-2">Descrição Completa</label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              required
              rows={5}
              className="input w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-game-primary focus:border-transparent"
              placeholder="Descreva o jogo com mais detalhes"
            />
          </div>
          
          {/* Botões */}
          <div className="flex justify-end space-x-4 mt-8">
            <Link 
              to="/"
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            >
              Cancelar
            </Link>
            <button 
              type="submit"
              disabled={submitting}
              className="btn-primary flex items-center px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-neon disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cadastrando...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Cadastrar Jogo
                </>
              )}
            </button>
          </div>
        </form>
        
        {/* Mensagem de sucesso */}
        <div id="success-message" className="hidden fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 animate-bounce">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Jogo cadastrado com sucesso!
          </div>
        </div>
        
        {/* Mensagem de erro */}
        <div id="error-message" className="hidden fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 animate-bounce">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Erro ao cadastrar jogo. Tente novamente.
          </div>
        </div>
      </div>
    </div>
  );
}
