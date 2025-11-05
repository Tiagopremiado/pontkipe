import { Confronto, Team } from './types';

export const ADMIN_ACCESS_CODE = '84081447igp';

export const INITIAL_TEAMS: Team[] = [
  {
    id: '1',
    unidade: 'Pelotas',
    nome: 'Equipe Alfa',
    pontos: 120,
    descricao: 'Focada em liderança e estratégia.',
    foPositivos: ['Trabalho em equipe', 'Comunicação clara', 'Proatividade'],
    foNegativos: ['Gerenciamento de tempo']
  },
  {
    id: '2',
    unidade: 'Pelotas',
    nome: 'Equipe Bravo',
    pontos: 95,
    descricao: 'Especialistas em logística e execução.',
    foPositivos: ['Organização', 'Eficiência'],
    foNegativos: ['Atrasos ocasionais', 'Falta de documentação']
  },
  {
    id: '3',
    unidade: 'Pedro Osório',
    nome: 'Equipe Charlie',
    pontos: 150,
    descricao: 'Destaca-se pela inovação e criatividade.',
    foPositivos: ['Inovação', 'Resolução de problemas'],
    foNegativos: ['Riscos excessivos']
  },
  {
    id: '4',
    unidade: 'Pedro Osório',
    nome: 'Equipe Delta',
    pontos: 80,
    descricao: 'Resistência e perseverança em campo.',
    foPositivos: ['Perseverança', 'Força física'],
    foNegativos: ['Comunicação interna', 'Planejamento a longo prazo']
  }
];

export const INITIAL_CONFRONTOS: Confronto[] = [
    {
        id: 'c1',
        unidade: 'Pelotas',
        team1Id: '1',
        team2Id: '2',
        team1Score: 5,
        team2Score: 3,
        date: '2024-07-28',
        description: 'Desafio de Lógica e Estratégia'
    },
    {
        id: 'c2',
        unidade: 'Pedro Osório',
        team1Id: '3',
        team2Id: '4',
        team1Score: 7,
        team2Score: 7,
        date: '2024-07-29',
        description: 'Prova de Resistência Física'
    }
];
