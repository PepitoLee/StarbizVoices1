export interface AudioPreview {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  duration: string;
  durationSeconds: number;
  previewSrc?: string;
}

export const audioPreviewData: AudioPreview[] = [
  {
    id: 'preview-1',
    title: 'Tu hijo no es un robot roto (Es su Dopamina)',
    category: 'Neurociencia',
    categoryColor: 'bg-primary/15 text-primary-600',
    duration: '3:12',
    durationSeconds: 192,
    previewSrc: '/audio/dopamina-dra-elena.mp3',
  },
  {
    id: 'preview-2',
    title: 'Límites sin gritos: la técnica del disco rayado',
    category: 'Disciplina',
    categoryColor: 'bg-olive-100 text-olive-600',
    duration: '2:48',
    durationSeconds: 168,
  },
  {
    id: 'preview-3',
    title: 'Por qué tu hijo prefiere hablar con amigos',
    category: 'Conexión',
    categoryColor: 'bg-blue-50 text-blue-600',
    duration: '3:35',
    durationSeconds: 215,
  },
  {
    id: 'preview-4',
    title: 'Redes sociales: guía para no entrar en pánico',
    category: 'Digital',
    categoryColor: 'bg-purple-50 text-purple-600',
    duration: '2:55',
    durationSeconds: 175,
  },
];
