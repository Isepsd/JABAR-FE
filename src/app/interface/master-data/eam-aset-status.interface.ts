interface IAsetStatus {
  id_ref_aset_status: string;
  nama: string;
  status: number;
}

export const AsetStatusField = {
  id_ref_aset_status: undefined,
  nama: "",
  status: 1,
};

export type { IAsetStatus };
