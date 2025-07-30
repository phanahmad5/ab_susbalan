import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const siswa = await prisma.siswa.findMany();
    return res.status(200).json(siswa);
  }

  if (req.method === 'POST') {
    const { nama, utusan, pelatihan } = req.body;

    const siswa = await prisma.siswa.create({
      data: { nama, utusan, pelatihan },
    });

    return res.status(201).json(siswa);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    await prisma.siswa.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: 'Siswa deleted' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
