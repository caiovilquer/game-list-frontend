import React from 'react';
import { Link } from 'react-router-dom';

export function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-title text-game-primary mb-4">
          <span className="text-game-accent">{'<'}</span> 
          Como Funciona 
          <span className="text-game-accent">{'>'}</span>
        </h1>
        <p className="text-gray-300 text-lg">
          Um guia simples de como utilizar o GameList para catalogar seus jogos
        </p>
      </div>

      <div className="space-y-12">
        {/* Seção 1: Visão Geral */}
        <section className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:shadow-neon transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-game-primary/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-game-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-title text-game-secondary">Visão Geral</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            O GameList é uma aplicação para catalogar sua coleção de jogos. Você pode adicionar jogos,
            visualizar detalhes, categorizar por gênero e manter um registro organizado da sua biblioteca.
            A plataforma é simples de usar e foi projetada para amantes de jogos que desejam ter uma visão
            organizada de sua coleção.
          </p>
        </section>

        {/* Seção 2: Adicionando Jogos */}
        <section className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:shadow-neon transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-game-primary/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-game-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-title text-game-secondary">Adicionando Jogos</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Para adicionar um novo jogo à sua biblioteca, siga estes passos simples:
            </p>
            <ol className="list-decimal list-inside text-gray-300 space-y-2 ml-4">
              <li>Clique no botão <span className="text-game-accent font-semibold">"Adicionar Jogo"</span> na página principal</li>
              <li>Preencha o formulário com os detalhes do jogo (título, plataforma, ano, etc.)</li>
              <li>Adicione uma URL de imagem para a capa do jogo</li>
              <li>Escreva uma descrição curta e longa para o jogo</li>
              <li>Clique em <span className="text-game-accent font-semibold">"Salvar"</span> para adicionar o jogo à sua biblioteca</li>
            </ol>
            <div className="mt-4">
              <Link 
                to="/new" 
                className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Adicionar Jogo Agora
              </Link>
            </div>
          </div>
        </section>

        {/* Seção 3: Visualizando Detalhes */}
        <section className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:shadow-neon transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-game-primary/20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-game-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-title text-game-secondary">Visualizando Detalhes</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Clique em qualquer jogo na sua biblioteca para ver detalhes completos, incluindo:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4 ml-4">
            <li>Capa do jogo em alta resolução</li>
            <li>Informações como plataforma, gênero e ano de lançamento</li>
            <li>Pontuação do jogo</li>
            <li>Descrição detalhada</li>
            <li>Opções para editar ou remover o jogo da sua biblioteca</li>
          </ul>
        </section>

        {/* Chamada para ação */}
        <div className="text-center py-8">
          <h3 className="text-xl font-title text-game-accent mb-4">
            Pronto para começar?
          </h3>
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Ver Biblioteca de Jogos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
