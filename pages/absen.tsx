'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Absen() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Mengirim data absensi...');

  useEffect(() => {
    const nama = searchParams.get('nama') || '';
    const utusan = searchParams.get('utusan') || '';
    const pelatihan = searchParams.get('pelatihan') || '';

    const kirimAbsensi = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyDjj7m3DtNDre-DIa0f6UcluUuXV1JvW8FOzZdXp3s9-Qa36bMPxaa8JbHAr_PominMA/exec', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nama, utusan, pelatihan }),
        });

        if (response.ok) {
          setStatus('Absensi berhasil dicatat!');
        } else {
          setStatus('Gagal mencatat absensi.');
        }
      } catch (error) {
        setStatus('Terjadi kesalahan saat mengirim data.');
      }
    };

    if (nama && utusan && pelatihan) {
      kirimAbsensi();
    } else {
      setStatus('Data tidak lengkap.');
    }
  }, [searchParams]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold mb-2">Halaman Absensi</h1>
      <p>{status}</p>
    </div>
  );
}
