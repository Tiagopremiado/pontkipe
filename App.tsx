import React, { useState, useEffect } from 'react';
import { Team, Confronto } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import PublicView from './components/PublicView';

const App: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [confrontos, setConfrontos] = useState<Confronto[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
        try {
            const storedTeams = localStorage.getItem('teams');
            const storedConfrontos = localStorage.getItem('confrontos');
            const storedAdmin = sessionStorage.getItem('isAdmin');

            if (storedTeams && storedConfrontos) {
                setTeams(JSON.parse(storedTeams));
                setConfrontos(JSON.parse(storedConfrontos));
            } else {
                const response = await fetch('/db.json');
                const data = await response.json();
                setTeams(data.teams);
                setConfrontos(data.confrontos);
            }
            if(storedAdmin === 'true') {
                setIsAdmin(true);
            }
        } catch (error) {
            console.error("Failed to load data", error);
            // Fallback to empty state in case of error
            setTeams([]);
            setConfrontos([]);
        } finally {
            setIsLoaded(true);
        }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if(isLoaded){
        try {
            localStorage.setItem('teams', JSON.stringify(teams));
            localStorage.setItem('confrontos', JSON.stringify(confrontos));
        } catch (error) {
            console.error("Failed to save data to storage", error);
        }
    }
  }, [teams, confrontos, isLoaded]);

  const handleAdminAccess = () => {
    setIsAdmin(true);
    sessionStorage.setItem('isAdmin', 'true');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('isAdmin');
  };
  
  // Team CRUD
  const addTeam = (team: Omit<Team, 'id'>) => {
    setTeams(prev => [...prev, { ...team, id: new Date().toISOString() }]);
  };
  const updateTeam = (updatedTeam: Team) => {
    setTeams(prev => prev.map(t => t.id === updatedTeam.id ? updatedTeam : t));
  };
  const deleteTeam = (id: string) => {
    setTeams(prev => prev.filter(t => t.id !== id));
    setConfrontos(prev => prev.filter(c => c.team1Id !== id && c.team2Id !== id));
  };

  // Confronto CRUD
  const addConfronto = (confronto: Omit<Confronto, 'id'>) => {
    setConfrontos(prev => [...prev, { ...confronto, id: new Date().toISOString() }]);
  };
  const updateConfronto = (updatedConfronto: Confronto) => {
    setConfrontos(prev => prev.map(c => c.id === updatedConfronto.id ? updatedConfronto : c));
  };
  const deleteConfronto = (id: string) => {
    setConfrontos(prev => prev.filter(c => c.id !== id));
  };

  if(!isLoaded) {
    return <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white text-xl">Carregando dados...</div>
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {isAdmin ? (
          <AdminPanel 
            teams={teams}
            confrontos={confrontos}
            addTeam={addTeam}
            updateTeam={updateTeam}
            deleteTeam={deleteTeam}
            addConfronto={addConfronto}
            updateConfronto={updateConfronto}
            deleteConfronto={deleteConfronto}
            onLogout={handleLogout}
          />
        ) : (
          <PublicView teams={teams} confrontos={confrontos} />
        )}
      </main>
      <Footer onAdminAccess={handleAdminAccess} />
    </div>
  );
};

export default App;