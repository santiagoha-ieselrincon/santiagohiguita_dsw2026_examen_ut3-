
export interface Citation {
  documentId: string;
  title: string;
  excerpt: string;
}

export interface QuestionAnswer {
  answer: string;
  citation: Citation[];
}

export function answerQuestion(): QuestionAnswer {
  return {
    answer:
      'Respuesta simulada: consulta la documentación pública del centro.',
    citation: [
      {
        documentId: '11111111-1111-4111-8111-111111111111',
        title: 'Guía pública del centro',
        excerpt:
          'La información actualizada está disponible en los canales oficiales.',
      },
    ],
  };
}
