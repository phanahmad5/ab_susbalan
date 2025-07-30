// pages/api/absen.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nama, utusan, pelatihan } = req.body;
    const waktu = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

    const data = {
      nama,
      utusan,
      pelatihan,
      tanggal: waktu.split(',')[0],
      jam: waktu.split(',')[1].trim(),
    };

    const webhookUrl = 'https://script.google.com/macros/s/AKfycbx4iW_Irrufb0QLcY5-oeleoOYWuOrGlQyx2ToRg9tH-AVdNdIvlH26cuhZemc7Zmpu_A/exec'; // Ganti dengan milikmu

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ error: 'Gagal absen' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
