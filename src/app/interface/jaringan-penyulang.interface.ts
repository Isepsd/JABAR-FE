import { IJaringan } from '@app/interface/jaringan-lokasi.interface';

interface IJaringanPenyulang {
  number: number;
  id: number;
  nama_lokasi: string;
  kode_lokasi: string;
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
  id_gardu_hubung: any;
  id_gardu_induk: any;
  id_pembangkit: any;
  id_parent_lokasi: any;
  id_jenis_parent: any;
  id_ref_jenis_lokasi: any;
  id_user_created: any;
  id_user_updated: any;
  uid: IJaringan;
  up3_1: any;
  ulp_1: IJaringan;
  tgl_entri: any;
  tgl_update: any;
  id_ref_province: any;
  id_ref_regency: any;
  id_ref_district: any;
  i_max: any,
  id_i: any,
  id_v: any,
  id_p: any,
  id_amr: any,
  id_portal_ext: any,
  url_webservice: any,
  faktor_kali: any,
  id_dcc: any,
  id_pemilik: any,
  no_urut: any,
  jumlah_pelanggan: any,
  fungsi_lokasi: any,
  sinkron_data: any,
  jenis_peralatan: any,
  rekon_beban: TJaringan,
  panjang_jaringan: any,
  id_uid: any;
  id_up3_1: any;
  id_ulp_1: any;
  id_pusat: any;
  id_unit_induk: any;
  jenis_penyulang: any;
  jumlah_gardu: any;
  jenis_parent: any;
  dataSelected: any;

}

export const JaringanPenyulangField = {
  id_ref_lokasi: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_unit_pembangkit: null,
  id_pembangkit: null,
  id_gardu_induk: null,
  id_jenis_parent: null,
  id_trafo_gi: null,
  id_gardu_hubung: null,
  id_ref_province: process.env.ADM_PROVINCE,
  id_ref_regency: null,
  id_ref_district: null,
  id_pusat: null,
  id_unit_induk: null,
  nama_lokasi: null,
  kode_lokasi: '',
  alamat: '',
  lat: 0,
  lon: 0,
  coverage: '',
  panjang_jaringan: '',
  rekon_beban: '1',
  // phase: '',
  id_user_created: '',
  id_user_updated: '',
  jenis_jaringan: null,
  status_listrik: '1',
  status_penyulang: null,
  id_uid: null,
  id_up3_1: null,
  up3_1: null,
  id_ulp_1: null,
  i_max: null,
  id_i: null,
  id_v: null,
  id_p: null,
  id_amr: null,
  id_portal_ext: null,
  url_webservice: null,
  // faktor_kali: null,
  id_dcc: null,
  id_pemilik: null,
  no_urut: null,
  jenis_penyulang: null,
  jumlah_pelanggan: 0,
  fungsi_lokasi: null,
  sinkron_data: null,
  jenis_peralatan: null,
  jumlah_gardu: null,
  // ratio_ct: null,
  jenis_parent: null,
  gardu_induk: null,
  // ratio_vt: null,
  // jenis_penyulang: null,
};

type TJaringan = 1 | 0;

export type { IJaringanPenyulang };
