import { GenreList, GameList } from "./GameList";

export function GamesPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="py-6">
        {/* Banner principal */}
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-purple-500/20 mb-12 shadow-lg animate-pulse-slow">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-transparent to-black/80"></div>
            <div className="relative z-10 py-12 px-8 md:px-16">
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-5xl font-title font-bold text-white mb-4">
                  <span className="text-game-accent">Game</span>
                  <span className="text-white">List</span>
                </h1>
                <p className="text-gray-300 text-lg mb-6">
                  Organize sua coleção de jogos, descubra novos títulos e compartilhe sua experiência gamer!
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 border-t border-purple-500/20 px-8 py-4 flex justify-between items-center">
            <p className="text-sm text-gray-400">Organize jogos por gênero, plataforma e muito mais!</p>
          </div>
        </div>
        
        {/* Gêneros e jogos */}
        <div className="space-y-16">
          <section>
            <GenreList />
          </section>
          
          <section>
            <GameList />
          </section>
        </div>
      </div>
    </div>
  );
}
