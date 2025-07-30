// pages/scan.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Scan() {
  const router = useRouter();

  useEffect(() => {
    const { data } = router.query;
    if (!data) return;

    const parsed = JSON.parse(decodeURIComponent(data as string));

    fetch('/api/absen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    })
      .then(() => alert('Absensi berhasil!'))
      .catch(() => alert('Gagal absen!'));
  }, [router.query]);

  return <p>Mengirim absensi ke Google Sheets...</p>;
}
