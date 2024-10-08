interface IBobotPrioritas {
  id_ref_prioritas: string;
  nama: string;
  nilai_awal: number;
  nilai_akhir: number;
  keterangan: string;
  deskripsi: string;
}

export const BobotPrioritasField = {
  id_ref_prioritas: undefined,
  nama: "",
  nilai_awal: 0,
  nilai_akhir: 0,
  keterangan: "",
  deskripsi: "",
};

export type { IBobotPrioritas };
