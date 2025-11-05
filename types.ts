
// Fix: Removed self-import of 'Unit' which conflicted with the local declaration.
export type Unit = 'Pelotas' | 'Pedro Osório';

export interface Team {
  id: string;
  unidade: Unit;
  nome: string;
  pontos: number;
  descricao: string;
  foPositivos: string[];
  foNegativos: string[];
}

export interface Confronto {
  id: string;
  unidade: Unit;
  team1Id: string;
  team2Id: string;
  team1Score: number;
  team2Score: number;
  date: string;
  description: string;
}