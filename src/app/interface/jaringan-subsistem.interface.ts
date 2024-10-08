
interface IJaringanSubsistem {
  nama_lokasi: string;
  tree_jaringan: TJaringan;
  tgl_entri: any;
  tgl_update: any;
  id_ref_jenis_lokasi: any;
  id_user_created: any;
  id_user_updated: any;
  status_listrik: TJaringan;
  path1: string;
  path2: string;
  path3: string;
}

export const JaringanSubsistemField = {
  nama_lokasi: '',
  path1: null,
  path2: null,
  path3: null,
  tree_jaringan: 0,
  id_user_created: '',
  id_user_updated: '',
  id_ref_jenis_lokasi: null,
  tgl_entri: "",
  tgl_update: "",
  status_listrik: '1',
};

type TJaringan = 1 | 0;
export type { IJaringanSubsistem };
