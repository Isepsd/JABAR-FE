interface IAsetKategori {
  id_ref_aset_kategori: string;
  nama: string;
  status: number;
  id_ref_aset_group: string;
  il_1: number;
  il_2: number;
  il_3: number;
}

export const AsetKategoriField = {
  id_ref_aset_kategori: undefined,
  nama: "",
  status: 1,
  id_ref_aset_group: undefined,
  il_1: 0,
  il_2: 0,
  il_3: 0,
};

export type { IAsetKategori };
