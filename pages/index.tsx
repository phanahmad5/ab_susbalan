'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function Home() {
  const [nama, setNama] = useState('');
  const [utusan, setUtusan] = useState('');
  const [pelatihan, setPelatihan] = useState('Susbalan');

  const baseUrl = 'https://ab-susbalan.vercel.app/absen';
  const qrValue = `${baseUrl}?nama=${encodeURIComponent(nama)}&utusan=${encodeURIComponent(utusan)}&pelatihan=${encodeURIComponent(pelatihan)}`;

  return (
    <main style={{ padding: 20 }}>
      <h1>Generator QR Absen</h1>

      <div style={{ marginBottom: 10 }}>
        <label>Nama: </label>
        <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Utusan: </label>
        <input type="text" value={utusan} onChange={(e) => setUtusan(e.target.value)} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Pelatihan: </label>
        <select value={pelatihan} onChange={(e) => setPelatihan(e.target.value)}>
          <option value="Susbalan">Susbalan</option>
          <option value="PKL">PKL</option>
        </select>
      </div>

      {nama && utusan && (
        <>
          <p>QR Code untuk absen:</p>
          <QRCode value={qrValue} />
          <p>Link: <a href={qrValue} target="_blank" rel="noopener noreferrer">{qrValue}</a></p>
        </>
      )}
    </main>
  );
}
