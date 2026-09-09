export interface ChapterMeta {
  id: string;
  epoch: string;
  title: string;
  period: string;
  themeColor: string;
  status: 'active' | 'archived';
}

export const AVAILABLE_CHAPTERS: ChapterMeta[] = [
  {
    id: 'imperialism-xix',
    epoch: 'Época I',
    title: 'Imperialismo e a Partilha da África',
    period: '1870 — 1914',
    themeColor: '#9e2a2b',
    status: 'active',
  },
  {
    id: 'thermodynamics-entropy',
    epoch: 'Época II',
    title: 'A Máquina Térmica e a Flecha do Tempo',
    period: '1824 — 1900',
    themeColor: '#c69b3f',
    status: 'archived',
  },
  {
    id: 'feudal-crisis',
    epoch: 'Época III',
    title: 'A Peste, a Fome e a Ruptura Servil',
    period: '1347 — 1453',
    themeColor: '#4d6a79',
    status: 'archived',
  },
];
