'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import QRCode from 'react-qr-code';

export default function DetailSiswa() {
  const router = useRouter();
  const { id } = router.query;
  const [siswa, setSiswa] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch('/api/siswa')
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((s: any) => s.id === parseInt(id as string));
          setSiswa(found);
        });
    }
  }, [id]);

  if (!siswa) return <p>Memuat data...</p>;

  const data = {
    id: siswa.id,
    nama: siswa.nama,
    utusan: siswa.utusan,
    pelatihan: siswa.pelatihan,
  };

  const encoded = encodeURIComponent(JSON.stringify(data));
  const qrUrl = `https://ab-susbalan.vercel.app/scan?data=${encoded}`;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Detail Siswa</h1>
      <p><strong>Nama:</strong> {siswa.nama}</p>
      <p><strong>Utusan:</strong> {siswa.utusan}</p>
      <p><strong>Pelatihan:</strong> {siswa.pelatihan}</p>

      <div style={{ marginTop: '2rem' }}>
        <h2>QR Code:</h2>
        <QRCode value={qrUrl} size={180} />
        <p style={{ marginTop: '1rem' }}>
          
        </p>
      </div>
    </div>
  );
}
