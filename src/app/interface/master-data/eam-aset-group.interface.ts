interface IAsetGroup {
  id_ref_aset_group: string;
  nama: string;
  status: number;
}

export const AsetGroupField = {
  id_ref_aset_group: undefined,
  nama: "",
  status: 1,
};

export type { IAsetGroup };
