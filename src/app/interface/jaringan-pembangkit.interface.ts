interface IJaringanPembangkit {
  number: number,
  id: number,
  nama_lokasi: string,
  alamat: string,
  id_parent_lokasi: string,
  status_listrik: TJariangan,
  id_unit_pembangkit: any;
  id_ref_jenis_lokasi: any,
  id_ref_jenis_pembangkit: any,
  tree_jaringan: any;
  jenis_jaringan: number,
  lat: number,
  lon: number,
  tgl_entri: any,
  tgl_update: any,
  id_user_created: any;
  id_user_updated: any;
  id_ref_province: any,
  id_ref_regency: any,
  id_ref_district: any,
  no_urut: any,
  path1: any,
  path2: any,
  path3: any,
  unit_induk: any,
  id_unit_induk: any,
  sinkron_data: any,
}

export const JarianganPembangkitField = {
  id_ref_lokasi: null,
  id_ref_jenis_lokasi: null,
  id_parent_lokasi: null,
  id_unit_pembangkit: null,
  id_ref_jenis_pembangkit: null,
  id_ref_province: process.env.ADM_PROVINCE,
  id_ref_regency: null,
  id_ref_district: null,
  nama_lokasi: '',
  alamat: '',
  lat: 0,
  lon: 0,
  id_user_created: '',
  id_user_updated: '',
  jenis_jaringan: null,
  no_urut: null,
  status_listrik: '1',
  path1: null,
  path2: null,
  path3: null,
  id_i: null,
  id_v: null,
  id_p: null,
  id_amr: null,
  id_portal_ext: null,
  unit_induk: null,
  id_unit_induk: null,
  sinkron_data: null,
}

type TJariangan = 1 | 0;

export type { IJaringanPembangkit };
