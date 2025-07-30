'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import QRCode from 'react-qr-code';

export default function DaftarSiswa() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/siswa')
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Daftar Siswa</h1>

      {data.length === 0 ? (
        <p>Belum ada data siswa.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {data.map((item) => {
            const json = JSON.stringify({
              nama: item.nama,
              utusan: item.utusan,
              pelatihan: item.pelatihan,
            });
            const encoded = encodeURIComponent(json);
            const qrUrl = `https://ab-susbalan.vercel.app/scan?data=${encoded}`;

            return (
              <li
                key={item.id}
                style={{
                  marginBottom: '2rem',
                  padding: '1rem',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}
              >
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>{item.nama}</strong> - {item.utusan} - {item.pelatihan}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <QRCode value={qrUrl} size={100} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link href={`/detail?id=${item.id}`}>
                      <button style={buttonStyle}>Detail</button>
                    </Link>
                    <Link href={`/hapus?id=${item.id}`}>
                      <button style={{ ...buttonStyle, backgroundColor: '#e11d48' }}>Hapus</button>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  fontSize: '0.9rem',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#4f46e5',
  color: '#fff',
};
