'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function Home() {
  const [nama, setNama] = useState('');
  const [utusan, setUtusan] = useState('');
  const [pelatihan, setPelatihan] = useState('');
  const [showQR, setShowQR] = useState(false);

  const BASE_URL = 'https://ab-susbalan.vercel.app';

  const generateURL = () => {
    return `/absen?nama=${encodeURIComponent(nama)}&utusan=${encodeURIComponent(utusan)}&pelatihan=${encodeURIComponent(pelatihan)}`;
  };

  const handleGenerate = () => {
    if (!nama || !utusan || !pelatihan) {
      alert('Harap lengkapi semua data!');
      return;
    }
    setShowQR(true);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">QR Absensi Generator</h1>

      <input
        type="text"
        placeholder="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        className="border w-full p-2 mb-2 rounded"
      />
      <input
        type="text"
        placeholder="Utusan"
        value={utusan}
        onChange={(e) => setUtusan(e.target.value)}
        className="border w-full p-2 mb-2 rounded"
      />
      <select
        value={pelatihan}
        onChange={(e) => setPelatihan(e.target.value)}
        className="border w-full p-2 mb-4 rounded"
      >
        <option value="">Pilih Pelatihan</option>
        <option value="Susbalan">Susbalan</option>
        <option value="PKL">PKL</option>
      </select>

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate QR
      </button>

      {showQR && (
        <div className="mt-6 text-center">
          <QRCode value={BASE_URL + generateURL()} />
          <p className="mt-2 text-sm text-gray-500 break-all">
            {BASE_URL + generateURL()}
          </p>
        </div>
      )}
    </div>
  );
}
