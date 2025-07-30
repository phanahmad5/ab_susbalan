'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function TambahSiswa() {
  const [nama, setNama] = useState('');
  const [utusan, setUtusan] = useState('');
  const [pelatihan, setPelatihan] = useState('PKL');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/siswa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, utusan, pelatihan }),
    });

    router.push('/daftar');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tambah Siswa</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
        <input placeholder="Utusan" value={utusan} onChange={(e) => setUtusan(e.target.value)} required />
        <select value={pelatihan} onChange={(e) => setPelatihan(e.target.value)}>
          <option value="PKL">PKL</option>
          <option value="SUSBALAN">SUSBALAN</option>
        </select>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
