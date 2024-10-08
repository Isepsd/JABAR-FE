interface IPenyebabGangguan {
  id: string;
  nama: string;
  id_ref_ep_kategori_ggn: string;
}

export const PenyebabGangguanField = {
  id:null, // id field primary key harus ada ini perlu untuk update
  nama: '',
  id_ref_ep_kategori_ggn: '',
}

export type { IPenyebabGangguan };
