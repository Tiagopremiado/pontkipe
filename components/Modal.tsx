
import React, { useState, useEffect } from 'react';
import { Team, Unit } from '../types';
import { CloseIcon, PlusIcon, DeleteIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (team: Omit<Team, 'id'> | Team) => void;
  team: Team | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, team }) => {
  const [formData, setFormData] = useState<Omit<Team, 'id'>>({
    nome: '',
    unidade: 'Pelotas',
    pontos: 0,
    descricao: '',
    foPositivos: [],
    foNegativos: []
  });

  const [foPositivoInput, setFoPositivoInput] = useState('');
  const [foNegativoInput, setFoNegativoInput] = useState('');

  useEffect(() => {
    if (team) {
      setFormData(team);
    } else {
      setFormData({
        nome: '',
        unidade: 'Pelotas',
        pontos: 0,
        descricao: '',
        foPositivos: [],
        foNegativos: []
      });
    }
  }, [team, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'pontos' ? parseInt(value) || 0 : value }));
  };

  const addFo = (type: 'foPositivos' | 'foNegativos') => {
    const value = type === 'foPositivos' ? foPositivoInput : foNegativoInput;
    if (value.trim()) {
      setFormData(prev => ({ ...prev, [type]: [...prev[type], value.trim()] }));
      if (type === 'foPositivos') setFoPositivoInput('');
      else setFoNegativoInput('');
    }
  };
  
  const removeFo = (type: 'foPositivos' | 'foNegativos', index: number) => {
    setFormData(prev => ({ ...prev, [type]: prev[type].filter((_, i) => i !== index) }));
  };

  const handleSave = () => {
    if (!formData.nome) {
      alert("O nome da equipe é obrigatório.");
      return;
    }
    onSave(team ? { ...formData, id: team.id } : formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{team ? 'Editar Equipe' : 'Criar Nova Equipe'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <CloseIcon />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Nome da Equipe</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Unidade</label>
                <select name="unidade" value={formData.unidade} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
                  <option>Pelotas</option>
                  <option>Pedro Osório</option>
                </select>
              </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-300">Descrição/Objetivo</label>
                <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={3} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-emerald-400">F.O+</h3>
              <div className="flex gap-2 mt-1">
                <input type="text" value={foPositivoInput} onChange={e => setFoPositivoInput(e.target.value)} placeholder="Adicionar força positiva" className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-emerald-500" />
                <button onClick={() => addFo('foPositivos')} className="bg-emerald-600 text-white p-2 rounded-md hover:bg-emerald-700"><PlusIcon /></button>
              </div>
              <ul className="mt-2 space-y-1">
                {formData.foPositivos.map((fo, i) => <li key={i} className="flex justify-between items-center bg-gray-700 p-2 rounded-md text-sm"><span className="text-emerald-300">{fo}</span><button onClick={() => removeFo('foPositivos', i)} className="text-red-400 hover:text-red-600"><DeleteIcon className="w-4 h-4" /></button></li>)}
              </ul>
            </div>
             <div>
              <h3 className="text-lg font-medium text-red-400">F.O-</h3>
              <div className="flex gap-2 mt-1">
                <input type="text" value={foNegativoInput} onChange={e => setFoNegativoInput(e.target.value)} placeholder="Adicionar força negativa" className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-emerald-500" />
                <button onClick={() => addFo('foNegativos')} className="bg-emerald-600 text-white p-2 rounded-md hover:bg-emerald-700"><PlusIcon /></button>
              </div>
              <ul className="mt-2 space-y-1">
                {formData.foNegativos.map((fo, i) => <li key={i} className="flex justify-between items-center bg-gray-700 p-2 rounded-md text-sm"><span className="text-red-300">{fo}</span><button onClick={() => removeFo('foNegativos', i)} className="text-red-400 hover:text-red-600"><DeleteIcon className="w-4 h-4" /></button></li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 px-6 py-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
