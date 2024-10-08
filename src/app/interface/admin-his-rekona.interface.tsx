
// ASET STATUS
interface IHisKalkulasi {
  number: number;
  id: number;
  status: TJaringan;
 
}

export const AdminHisKalkulasiField = {
  id_ref_lokasi: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_unit_pembangkit: null,
  id_pembangkit: null,
  id_gardu_induk: null,
  id_trafo_gi: null,
  id_penyulang: null,
  id_zone: null,
  id_section: null,
  id_segment: null,
  id_ref_province: process.env.ADM_PROVINCE,
  id_ref_regency: null,
  id_ref_district: null,
  nama_lokasi: '',
  alamat: '',
  lat: 0,
  lon: 0,
  coverage: 0,
  kva: 0,
  jumlah_pelanggan: 0,
  kode_lokasi: "",
  phase: '',
  id_user_created: '',
  id_user_updated: '',
  jenis_jaringan: null,
  status_listrik: '1',
  status_penyulang: null,
  id_uid: null,
  id_up3_1: null,
  id_ulp_1: null,
  fungsi_scada: null,
  jenis_gardu: null,
  ref_province: null,
  segment: null,
  section: null,
  zone: null,
  trafo_gi: null,
  path1: null,
  path2: null,
  path3: null,
};

type TJaringan = 1 | 0;

export type { IHisKalkulasi };
