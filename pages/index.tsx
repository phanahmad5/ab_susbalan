'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function Home() {
  const [nama, setNama] = useState('');
  const [utusan, setUtusan] = useState('');
  const [pelatihan, setPelatihan] = useState('PKL');

  const json = JSON.stringify({ nama, utusan, pelatihan });
  const encoded = encodeURIComponent(json);
  const url = `https://ab-susbalan.vercel.app/scan?data=${encoded}`; // Ganti URL dengan domain kamu

  return (
    <div style={{ padding: 20 }}>
      <h1>Generate QR Code Siswa</h1>
      <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama" /><br />
      <input value={utusan} onChange={(e) => setUtusan(e.target.value)} placeholder="Utusan" /><br />
      <select value={pelatihan} onChange={(e) => setPelatihan(e.target.value)}>
        <option value="PKL">PKL</option>
        <option value="SUSBALAN">SUSBALAN</option>
      </select>
      {nama && utusan && (
        <>
          <h3>QR Code:</h3>
          <QRCode value={url} />
        </>
      )}
    </div>
  );
}
