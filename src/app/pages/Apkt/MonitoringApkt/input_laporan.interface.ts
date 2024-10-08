// import { IJaringan } from '@app/interface/jaringan-lokasi.interface';
import moment from 'moment';

// type Props = {
//   optionCurrentUser?: any;
//   // setAdd?: any
// };

interface InputLaporan {
  number: number;
  id: number;
  id_apkt_trans_jar: any;
  nama_laporan: any;
  tgl_laporan: any;
  jenis_laporan: any;
  parent_aset: any;
  feeder: any;
  lokasi:any;
  status_apkt_kirim_padam: any;
  status_laporan: any;
  status_data: any;
  id_lokasi:any;
  id_pusat:any;
  id_regional:any;
  id_pemilik:any;
  id_pengelola:any;
  id_uid:any;
  id_sub_pengelola:any;
  tgl_padam:any;
  no_apkt: any;
  nama_lokasi: any;
  kode_lokasi: any;
  id_parent_lokasi: any;
  fungsi_lokasi: any;
  id_ref_lokasi: any;
}

export const InputLaporanField  = {
  id_apkt_trans_jar: undefined,
  id_ref_lokasi: null,
  nama_laporan: null,
  tgl_laporan: moment().format("YYYY-MM-DD HH:mm:ss"),
  jenis_laporan: null,
  parent_aset: null,
  feeder: null,
  lokasi: null,
  status_apkt_kirim_padam: 0,
  status_laporan: 'open',
  status_data: 0,
  id_lokasi:null,
  id_pusat:null,
  id_regional:null,
  id_pemilik:null,
  id_pengelola:null,
  id_uid:null,
  id_sub_pengelola:null,
  tgl_padam:moment().format("YYYY-MM-DD HH:mm:ss"),
  no_apkt: null,
  nama_lokasi: null,
  kode_lokasi: null,
  id_parent_lokasi: null,
  fungsi_lokasi: null,
  // id_pusat:
  //     optionCurrentUser?.level == "PUSAT"
  //       ? optionCurrentUser?.id_unit_lokasi
  //       : null,
  //   id_regional:
  //     optionCurrentUser?.level == "REGIONAL"
  //       ? optionCurrentUser?.id_unit_lokasi
  //       : null,
  //   id_pemilik:
  //     optionCurrentUser?.level == "UNIT_INDUK"
  //       ? optionCurrentUser?.id_unit_lokasi
  //       : null,
  //   id_pengelola:
  //     optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
  //       ? optionCurrentUser?.id_unit_lokasi
  //       : null,
  //   id_uid:
  //     optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
  //       ? optionCurrentUser?.id_unit_lokasi
  //       : null,
  //   id_sub_pengelola:
  //     optionCurrentUser?.level == "ULP"
  //       ? optionCurrentUser?.id_unit_lokasi
  //       : null,
};

// type TJaringan = 1 | 0;

export type { InputLaporan };
