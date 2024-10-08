interface IHealthIndex {
  id_ref_hi: string;
  nama: string;
  bobot_awal: number;
  bobot_akhir: number;
  status: number;
}

export const HealthIndexField = {
  id_ref_hi: undefined,
  nama: "",
  bobot_awal: 0,
  bobot_akhir: 0,
  status: 1,
};

export type { IHealthIndex };
