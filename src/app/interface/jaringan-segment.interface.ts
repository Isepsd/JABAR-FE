import { IJaringan } from './jaringan-lokasi.interface';

interface IJaringanSegment {
  number: number;
  id: number;
  nama_lokasi: string;
  alamat: string;
  parent_lokasi: any;
  status_listrik: TJaringan;
  tree_jaringan: TJaringan;
  status_penyulang: string;
  coverage: string;
  kva: string;
  phase: string;
  jenis: number;
  jenis_jaringan: any;
  lat: number;
  lon: number;
  count_gardu: number;
  unit_pembangkit: string;
  pembangkit: string;
  gardu_induk: IJaringan;
  trafo_gi: string;
  id_trafo_gi: any;
  id_penyulang: any;
  id_zone: any;
  id_section: any;
  id_parent_lokasi: any;
  id_ref_jenis_lokasi: any;
  id_user_created: any;
  id_user_updated: any;
  uid: IJaringan;
  up3_1: IJaringan;
  ulp_1: IJaringan;
  tgl_entri: any;
  tgl_update: any;
  id_ref_province: any;
  id_ref_regency: any;
  id_ref_district: any;
  panjang_jaringan: any;
  fungsi_lokasi: any;
  section: any;
  sinkron_data: any;
  path1: any;
  path2: any;
  path3: any;
  id_v: any;
  id_i: any;
  id_p: any;
  id_amr: any;
  id_portal_ext: any,
  url_webservice: any,
}

export const JaringanSegmentField = {
  id_ref_lokasi: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_unit_pembangkit: null,
  id_pembangkit: null,
  id_gardu_induk: null,
  id_trafo_gi: null,
  id_penyulang: null,
  id_ref_province: process.env.ADM_PROVINCE,
  id_ref_regency: null,
  id_ref_district: null,
  id_zone: null,
  id_section: null,
  nama_lokasi: '',
  alamat: '',
  lat: 0,
  lon: 0,
  coverage: 0,
  kva: 0,
  jumlah_pelanggan: 0,
  kode_gardu: null,
  phase: '',
  fungsi_lokasi: '',
  id_user_created: '',
  id_user_updated: '',
  jenis_jaringan: null,
  status_listrik: '1',
  status_penyulang: null,
  id_uid: null,
  id_up3_1: null,
  panjang_jaringan: 0,
  id_ulp_1: null,
  section: null,
  path1: null,
  path2: null,
  path3: null,
  sinkron_data: null,
  id_v: null,
  id_i: null,
  id_p: null,
  id_amr: null,
  id_portal_ext: null,
  url_webservice: null,
};

type TJaringan = 1 | 0;

export type { IJaringanSegment };
