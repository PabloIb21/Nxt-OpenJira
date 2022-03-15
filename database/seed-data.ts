interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: lorem ipsum',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'En progreso: lorem ipsum 2',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Terminadas: lorem ipsum 3',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ]
}