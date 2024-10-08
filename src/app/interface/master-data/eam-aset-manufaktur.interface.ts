interface IAsetManufaktur {
  id_ref_aset_manufaktur: string;
  nama: string;
  status: number;
}

export const AsetManufakturField = {
  id_ref_aset_manufaktur: undefined,
  nama: "",
  status: 1,
};

export type { IAsetManufaktur };
