'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HapusSiswa() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/siswa?id=${id}`, {
        method: 'DELETE',
      }).then(() => {
        router.push('/daftar');
      });
    }
  }, [id]);

  return <p>Menghapus data...</p>;
}
