import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Game } from '../types/Game';

export function GameForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<Game, 'id'>>({
    title: '',
    genre: '',
    platform: '',
    year: new Date().getFullYear(),
    shortDescription: '',
    imgUrl: '',
    score: 0,
    longDescription: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/games', formData);
      alert('Jogo cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar jogo.');
    }
  };

  return (
    <div>
      <h1>Cadastrar Novo Jogo</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} required />
        <input type="text" name="genre" placeholder="Gênero" value={formData.genre} onChange={handleChange} required />
        <input type="text" name="platform" placeholder="Plataforma" value={formData.platform} onChange={handleChange} required />
        <input type="number" name="year" placeholder="Ano" value={formData.year} onChange={handleChange} required />
        <textarea name="shortDescription" placeholder="Descrição Curta" value={formData.shortDescription} onChange={handleChange} required />
        <textarea name="longDescription" placeholder="Descrição Longa" value={formData.longDescription} onChange={handleChange} required />
        <input type="number" name="score" placeholder="Nota" value={formData.score} onChange={handleChange} required />
        <input type="text" name="imgUrl" placeholder="URL da Imagem" value={formData.imgUrl} onChange={handleChange} required />
        <button type="submit" style={{ marginTop: '10px' }}>Cadastrar</button>
      </form>
    </div>
  );
}
