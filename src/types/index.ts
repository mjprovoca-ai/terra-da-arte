export type ArtworkStatus = "disponivel" | "vendido" | "em_analise" | "dominio_publico";

export interface Artist {
  id: string;
  nome: string;
  biografia: string;
  nacionalidade: string;
  periodoAtividade: string;
  movimentoPrincipal: string;
  urlFotoArtista: string;
  musicaEpoca?: string;
  modaEpoca?: string;
  contextoHistorico?: string;
}

export interface Artwork {
  id: string;
  titulo: string;
  urlDaImagem: string;
  poemaGerado: string;
  descricaoAnalitica: string;
  anoDeCriacao: number;
  dimensoes: string;
  status: ArtworkStatus;
  preco: number;
  dataDeUpload: string;
  artistaRef: string;
}

export interface DailyExperienceConfig {
  date: string;
  artistId: string;
  artistName: string;
  movement: string;
  learningBlocks: {
    title: string;
    content: string;
  }[];
}

export interface UserPoem {
  id: string;
  userId: string;
  artistId: string;
  artistName: string;
  threeWords: [string, string, string];
  feeling?: string;
  poem: string;
  createdAt: string;
  day: string;
}

export interface UserDailyRecord {
  userId: string;
  day: string;
  completed: boolean;
  poemId?: string;
  artistId: string;
  ephemeralShown: boolean;
}
