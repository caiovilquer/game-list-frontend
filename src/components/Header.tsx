import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-game-primary/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src="/icons/controller.svg" alt="Logo" className="h-10 w-10 mr-3 animate-pulse" />
              <h1 className="font-title text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-game-primary to-game-secondary">
                GameList
              </h1>
            </Link>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
            <Link to="/" className="text-white hover:text-game-accent px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800">
              Jogos
            </Link>
            <Link to="/new" className="text-white hover:text-game-accent px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800">
              Cadastrar
            </Link>
            <Link to="/how-it-works" className="text-white hover:text-game-accent px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800">
              Como Funciona
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
