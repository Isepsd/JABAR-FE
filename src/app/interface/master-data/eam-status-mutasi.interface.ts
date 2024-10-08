interface IStatusMutasi {
  id_ref_aset_mutasi_status: string;
  nama: string;
  status: number;
}

export const StatusMutasiField = {
  id_ref_aset_mutasi_status: undefined,
  nama: "",
  status: 1,
};

export type { IStatusMutasi };
