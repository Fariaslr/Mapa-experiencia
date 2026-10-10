import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST({ request }) {
  const dados = await request.json();
  
  // Guarda o novo local na base de dados
  const novoLocal = await prisma.local.create({
    data: {
      nome: dados.nome,
      latitude: dados.latitude,
      longitude: dados.longitude
    }
  });

  return json(novoLocal, { status: 201 });
}