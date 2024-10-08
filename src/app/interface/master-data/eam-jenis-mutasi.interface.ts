interface IJenisMutasi {
  id_ref_aset_jenis_mutasi: string;
  nama: string;
  status: number;
}

export const JenisMutasiField = {
  id_ref_aset_jenis_mutasi: undefined,
  nama: "",
  status: 1,
};

export type { IJenisMutasi };
