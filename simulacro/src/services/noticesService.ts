import { randomUUID } from 'node:crypto';

export interface Notice {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface NoticeChanges {
  title?: string;
  description?: string;
}

// Datos en memoria
const notices: Notice[] = [
  {
    id: '0x4b',
    title: 'Acceso no permitido',
    description: 'El usuario ha realizado un intento de acceso para un recurso al que no puede acceder',
    createdAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: '0x53v',
    title: 'Modificaión inválida',
    description: 'Se han realizado cambios que compremeten el sistema. Se ha revertido a la versión anterior',
    createdAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: '0x2o',
    title: 'Modificación aceptada',
    description: 'Se han guardado los cambios realizados',
    createdAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: '0x11c',
    title: 'Iniciado proceso de verificación',
    description: 'Petición de verificación iniciada. Recibirá una respuesta en su canal de comunicación preferido',
    createdAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: '0x4k',
    title: 'Borrado no permitido',
    description: 'El borrado del archivo no puede realizarse',
    createdAt: '2026-09-01T08:00:00.000Z',
  },
];

export function list(page: number, limit: number) {
  const start = (page - 1) * limit;

  return {
    data: notices.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total: notices.length,
    },
  };
}

export function getById(id: string): Notice | undefined {
  return notices.find((notice) => notice.id === id);
}

export function create(title: string, description: string): Notice {
  const notice: Notice = {
    id: randomUUID(),
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  notices.push(notice);

  return notice;
}

export function update(
  id: string,
  changes: NoticeChanges,
): Notice | undefined {
  const notice = getById(id);

  if (!notice) {
    return undefined;
  }

  if (changes.title !== undefined) {
    notice.title = changes.title;
  }

  if (changes.description !== undefined) {
    notice.description = changes.description;
  }

  return notice;
}
