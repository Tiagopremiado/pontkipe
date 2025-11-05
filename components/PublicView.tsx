import React, { useState, useMemo } from 'react';
import { Team, Unit, Confronto } from '../types';
import TeamCard from './TeamCard';
import ConfrontoCard from './ConfrontoCard';

interface PublicViewProps {
  teams: Team[];
  confrontos: Confronto[];
}

type ViewType = Unit | 'Classificação Geral' | 'Contra-Equipes';

const PublicView: React.FC<PublicViewProps> = ({ teams, confrontos }) => {
  const [activeView, setActiveView] = useState<ViewType>('Classificação Geral');

  const filteredAndSortedTeams = useMemo(() => {
    let newTeams = [...teams];
    if (activeView === 'Classificação Geral') {
      return newTeams.sort((a, b) => b.pontos - a.pontos);
    }
    if (activeView === 'Pelotas' || activeView === 'Pedro Osório') {
        return newTeams.filter(team => team.unidade === activeView);
    }
    return [];
  }, [teams, activeView]);

  const sortedConfrontos = useMemo(() => {
    return [...confrontos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [confrontos]);

  const navButtons: ViewType[] = ['Classificação Geral', 'Pelotas', 'Pedro Osório', 'Contra-Equipes'];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Bem-vindo à Dinâmica de Equipes da FOPE CIA 126!
            </h2>
            <p className="mt-4 text-lg text-gray-300">Acompanhe o desempenho e as observações de cada equipe.</p>
        </div>

      <div className="mb-8 p-1.5 bg-gray-800 rounded-lg flex flex-wrap justify-center gap-2">
        {navButtons.map(view => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${
              activeView === view
                ? 'bg-emerald-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {activeView !== 'Contra-Equipes' && (
        <>
            {filteredAndSortedTeams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedTeams.map((team, index) => (
                        <TeamCard 
                            key={team.id} 
                            team={team} 
                            rank={activeView === 'Classificação Geral' ? index + 1 : undefined} 
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-gray-400 text-xl">Nenhuma equipe encontrada para esta unidade.</p>
                </div>
            )}
        </>
      )}

      {activeView === 'Contra-Equipes' && (
         <div className="space-y-6">
            {sortedConfrontos.length > 0 ? (
                sortedConfrontos.map(confronto => (
                    <ConfrontoCard key={confronto.id} confronto={confronto} teams={teams} />
                ))
            ) : (
                <div className="text-center py-16">
                    <p className="text-gray-400 text-xl">Nenhum confronto registrado ainda.</p>
                </div>
            )}
         </div>
      )}
    </div>
  );
};

export default PublicView;
