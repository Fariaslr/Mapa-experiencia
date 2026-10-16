export const feedExperiencias = [
  {
    id: 'post-001',
    autor: {
      id: 'user-lucas',
      nome: 'Lucas Farias',
      foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas'
    },
    local: {
      nome: 'Praia da Espera',
      cidade: 'Itacimirim, BA',
      latitude: -12.6186,
      longitude: -38.0519
    },
    avaliacao: {
      sabor: 4,
      ambiente: 5,
      comentario: 'Dia perfeito com água cristalina e quente. A porção de isca de peixe na barraca estava sensacional!'
    },
    data_visita: '2026-10-10T12:30:00Z',
    // Adicionamos a imagem do post (usando uma foto de praia como exemplo)
    imagem: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amigos_marcados: [
      {
        id: 'user-mel',
        nome: 'Mel Sá Barreto',
        foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mel'
      }
    ],
    social: {
      likes: 32, // Atualizado para Likes
      comentarios: [
        { autor: 'Carlos', texto: 'Lugar maravilhoso! Qual barraca vocês ficaram?' }
      ]
    }
  },
  {
    id: 'post-001',
    autor: {
      id: 'user-lucas',
      nome: 'Lucas Farias',
      foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas'
    },
    local: {
      nome: 'Praia da Espera',
      cidade: 'Itacimirim, BA',
      latitude: -12.6186,
      longitude: -38.0519
    },
    avaliacao: {
      sabor: 4,
      ambiente: 5,
      comentario: 'Dia perfeito com água cristalina e quente. A porção de isca de peixe na barraca estava sensacional!'
    },
    data_visita: '2026-10-10T12:30:00Z',
    // Adicionamos a imagem do post (usando uma foto de praia como exemplo)
    imagem: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amigos_marcados: [
      {
        id: 'user-mel',
        nome: 'Mel Sá Barreto',
        foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mel'
      }
    ],
    social: {
      likes: 32,
      comentarios: [
        { autor: 'Carlos', texto: 'Lugar maravilhoso! Qual barraca vocês ficaram?' }
      ]
    }
  }
];