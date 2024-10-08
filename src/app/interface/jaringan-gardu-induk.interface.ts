import { IJaringan } from '@app/interface/jaringan-lokasi.interface';
// ASET STATUS
interface IJaringanGarduInduk {
  number: number,
  id: number,
  jenis: number,
  id_parent_lokasi: number,
  id_unit_pembangkit: number,
  id_pembangkit: number,
  parent_lokasi: IJaringan,
  nama_lokasi: string,
  tree_jaringan: TJariangan,
  alamat: string,
  lat: number,
  lon: number,
  status_listrik: TJariangan,
  tgl_entri: any,
  tgl_update: any,
  unit_pembangkit: any,
  id_ref_jenis_lokasi: any,
  id_user_created: any;
  id_user_updated: any;
  id_ref_province: any;
  id_ref_regency: any;
  id_ref_district: any;
  jenis_gi?: any;
  fungsi_scada: any;
  kode_lokasi: any;
  up2b: any;
  jenis_layanan: any;
  ref_province: any;
  ref_regency: any;
  ref_district: any;
  path1: any;
  path2: any;
  path3: any;
  id_amr: any;
  id_portal_ext: any;
  url_webservice: any;
  id_v: any;
  id_p: any;
  id_i: any;
  rekon_beban: any;
  id_unit_induk: any;
  unit_induk: any;
  sinkron_data: any;
}

export const JarianganGarduIndukField = {
  id_ref_lokasi: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_unit_pembangkit: null,
  id_pembangkit: null,
  id_ref_province: process.env.ADM_PROVINCE,
  id_ref_regency: null,
  id_ref_district: null,
  id_up2b: null,
  jenis_layanan: null,
  nama_lokasi: '',
  kode_lokasi: '',
  alamat: '',
  lat: 0,
  lon: 0,
  id_user_created: '',
  id_user_updated: '',
  jenis_gi: null,
  path1: null,
  path2: null,
  path3: null,
  id_amr: null,
  id_portal_ext: null,
  url_webservice: null,
  id_v: null,
  id_p: null,
  id_i: null,
  status_listrik: 0,
  rekon_beban: 0,
  fungsi_scada: '',
  id_unit_induk: null,
  unit_induk: null,
  sinkron_data: null,
};

type TJariangan = 1 | 0;

export type { IJaringanGarduInduk };
