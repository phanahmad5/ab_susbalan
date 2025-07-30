'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import DataTable from 'react-data-table-component';

export default function DaftarSiswa() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/siswa')
      .then((res) => res.json())
      .then(setData);
  }, []);

  const columns = [
    {
      name: 'Nama',
      selector: (row: any) => row.nama,
      sortable: true,
    },
    {
      name: 'Utusan',
      selector: (row: any) => row.utusan,
      sortable: true,
    },
    {
      name: 'Pelatihan',
      selector: (row: any) => row.pelatihan,
      sortable: true,
    },
    {
      name: 'QR Code',
      cell: (row: any) => {
        const json = JSON.stringify({
          nama: row.nama,
          utusan: row.utusan,
          pelatihan: row.pelatihan,
        });
        const encoded = encodeURIComponent(json);
        const qrUrl = `https://ab-susbalan.vercel.app/scan?data=${encoded}`;
        return <QRCode value={qrUrl} size={60} />;
      },
    },
    {
      name: 'Aksi',
      cell: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href={`/detail?id=${row.id}`}>
            <button style={buttonStyle}>Detail</button>
          </Link>
          <Link href={`/hapus?id=${row.id}`}>
            <button style={{ ...buttonStyle, backgroundColor: '#e11d48' }}>Hapus</button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Daftar Siswa</h1>
        <Link href="/tambah">
          <button style={buttonStyle}>+ Tambah Siswa</button>
        </Link>
      </div>

      {data.length === 0 ? (
        <p>Belum ada data siswa.</p>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
          responsive
        />
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
