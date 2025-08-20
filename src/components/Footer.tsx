import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-game-primary/30 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <img src="/icons/controller.svg" alt="Logo" className="h-8 w-8 mr-2" />
              <h3 className="font-title text-xl font-bold text-game-primary">GameList</h3>
            </Link>
            <p className="mt-3 text-gray-400 text-sm">
              Sua plataforma para gerenciar seus jogos favoritos de maneira simples e eficiente.
            </p>
          </div>
          
          <div>
            <h4 className="font-title text-lg mb-4 text-game-secondary">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-game-accent transition-colors duration-300">
                  Todos os Jogos
                </Link>
              </li>
              <li>
                <Link to="/new" className="text-gray-400 hover:text-game-accent transition-colors duration-300">
                  Adicionar Jogo
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-game-accent transition-colors duration-300">
                  Como Funciona
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-title text-lg mb-4 text-game-secondary">Contato</h4>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-game-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href="mailto:caio@vilquer.dev" className="text-gray-400 hover:text-game-accent transition-colors duration-300">
                caio@vilquer.dev
              </a>
            </div>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-game-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z" clipRule="evenodd" />
              </svg>
              <a href="https://github.com/caiovilquer" className="text-gray-400 hover:text-game-accent transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-game-accent mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <a href="https://linkedin.com/in/caio-vilquer" className="text-gray-400 hover:text-game-accent transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 GameList. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
