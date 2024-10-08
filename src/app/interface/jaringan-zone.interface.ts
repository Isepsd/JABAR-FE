import { IJaringan } from "./jaringan-lokasi.interface";

interface IJaringanZone {
  number: number,
  id_ref_lokasi: string,
  id_ref_jenis_lokasi: string,
  id: number,
  nama_lokasi: string,
  id_user_entri: string,
  id_user_update: string,
  kode_lokasi: string;
  alamat: string,
  parent_lokasi: any,
  status_listrik: TJaringan,
  tree_jaringan: TJaringan,
  status_penyulang: string,
  jenis_penyulang: string,
  coverage: string,
  kva: string,
  phase: string,
  jenis: number,
  jenis_jaringan: any,
  lat: number,
  lon: number,
  count_gardu: number,
  gardu_hubung: IJaringan,
  penyulang: IJaringan,
  id_gardu_hubung: any,
  id_penyulang: any,
  id_parent_lokasi: any,
  id_user_created: any;
  id_user_updated: any;
  gardu_induk: IJaringan,
  uid: IJaringan,
  up3_1: IJaringan,
  ulp_1: IJaringan,
  tgl_entri: any,
  tgl_update: any,
  panjang_jaringan: any,
  zona: any,
  zone: any,
  id_zone: any,
  jumlah_pelanggan: any,
  sinkron_data: any,
  id_i: any,
  id_v: any,
  id_p: any,
  id_amr: any,
  id_portal_ext: any,
  url_webservice: any,
  jenis_peralatan: any,
  fungsi_lokasi: any,
  id_pemilik: any,
  i_max: any,
  id_uid: any,
  rekon_beban: TJaringan,
  id_unit_induk: any,
  zona1: any,
  zona2: any,
  zona3: any,
  zona4: any,
  pemilik: any,
}

export const JaringanZoneField = {
  id_ref_lokasi: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_gardu_hubung: null,
  id_trafo_gi: null,
  zona: null,
  zone: null,
  id_penyulang: null,
  trafo_gi: null,
  nama_lokasi: '',
  kode_lokasi: '',
  alamat: '',
  id_zone: null,
  // lat: 0,
  // lon: 0,
  // coverage: 0,
  // kva: 0,

  jenis_peralatan: null,
  id_user_created: '',
  id_user_updated: '',
  jenis_jaringan: null,
  status_listrik: '1',
  status_penyulang: null,
  jenis_penyulang: null,
  panjang_jaringan: 0,
  id_uid: null,
  id_up3_1: null,
  id_ulp_1: null,
  sinkron_data: null,
  id_i: null,
  id_v: null,
  id_p: null,
  id_amr: null,
  id_portal_ext: null,
  url_webservice: null,
  fungsi_lokasi: null,
  id_pemilik: null,
  jumlah_pelanggan: 0,
  i_max: null,
  rekon_beban: '1',
  id_unit_induk: null,
  zona1: null,
  zona2: null,
  zona3: null,
  zona4: null,
  pemilik: null,
}

type TJaringan = 1 | 0;
// type TRekonBeban = 1 | 0;

export type { IJaringanZone };