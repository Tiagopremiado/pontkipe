import React, { useState, useEffect, useCallback } from 'react';
import { Team, Confronto } from './types';
import { INITIAL_TEAMS, INITIAL_CONFRONTOS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import PublicView from './components/PublicView';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [confrontos, setConfrontos] = useState<Confronto[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const storedTeams = localStorage.getItem('fopeCia126Teams');
      setTeams(storedTeams ? JSON.parse(storedTeams) : INITIAL_TEAMS);
      
      const storedConfrontos = localStorage.getItem('fopeCia126Confrontos');
      setConfrontos(storedConfrontos ? JSON.parse(storedConfrontos) : INITIAL_CONFRONTOS);

    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
      setTeams(INITIAL_TEAMS);
      setConfrontos(INITIAL_CONFRONTOS);
    }
  }, []);

  useEffect(() => {
    if(teams.length > 0) {
      localStorage.setItem('fopeCia126Teams', JSON.stringify(teams));
    }
  }, [teams]);

  useEffect(() => {
    if(confrontos.length > 0) {
      localStorage.setItem('fopeCia126Confrontos', JSON.stringify(confrontos));
    }
  }, [confrontos]);
  
  const handleAdminAccess = useCallback(() => setIsAuthenticated(true), []);
  const handleLogout = useCallback(() => setIsAuthenticated(false), []);

  const addTeam = useCallback((teamData: Omit<Team, 'id'>) => {
    setTeams(prev => [...prev, { ...teamData, id: new Date().toISOString() }]);
  }, []);

  const updateTeam = useCallback((updatedTeam: Team) => {
    setTeams(prev => prev.map(t => (t.id === updatedTeam.id ? updatedTeam : t)));
  }, []);

  const deleteTeam = useCallback((id: string) => {
    setTeams(prev => prev.filter(t => t.id !== id));
  }, []);

  const addConfronto = useCallback((confrontoData: Omit<Confronto, 'id'>) => {
    setConfrontos(prev => [...prev, { ...confrontoData, id: new Date().toISOString() }]);
  }, []);

  const updateConfronto = useCallback((updatedConfronto: Confronto) => {
    setConfrontos(prev => prev.map(c => (c.id === updatedConfronto.id ? updatedConfronto : c)));
  }, []);

  const deleteConfronto = useCallback((id: string) => {
    setConfrontos(prev => prev.filter(c => c.id !== id));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow">
        {isAuthenticated ? (
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
