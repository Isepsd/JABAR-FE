interface IBagian {
  id_ref_bagian: string;
  nama: string;
  status: number;
}

export const BagianField = {
  id_ref_bagian: undefined,
  nama: "",
  status: 1,
};

export type { IBagian };
