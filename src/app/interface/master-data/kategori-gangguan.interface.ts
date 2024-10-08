interface IKategoriGangguan {
  id: string;
  nama: string;
}

export const KategoriGangguanField = {
  id: null,  // id field primary key harus ada ini perlu untuk update
  nama: '',
}

export type { IKategoriGangguan };