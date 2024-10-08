interface IAsetRuangan {
  id_ref_aset_ruangan: string;
  nama: string;
  status: number;
  id_pusat: string;
  id_regional: string;
  id_pemilik: string;
  id_pengelola: string;
  id_sub_pengelola: string;
}

export const AsetRuanganField = {
  id_ref_aset_ruangan: undefined,
  nama: "",
  status: 1,
  id_pusat: undefined,
  id_regional: undefined,
  id_pemilik: undefined,
  id_pengelola: undefined,
  id_sub_pengelola: undefined,
};

export type { IAsetRuangan };
