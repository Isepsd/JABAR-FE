import moment from 'moment';
interface IInputRekapPadam {
  no_apkt: string,
  jam_padam: string,  // 2022-08-26T08:39:45.259Z
  id_ref_indikasi: string,  //Ref Ep Indikasi API
  beban_padam: string,
  penyebab: string,
  jenis_padam: string,
  r: string,
  s: string,
  t: string,
  n: string,
  fai_arus_ggn_hmi: string,
  keterangan: string,
  lbs_manual: string,
  jenis_peralatan: string,
  id_keypoint: string, // peralatan - belum pasti
  id_up3: string,
  id_ulp: string,
  jlh_gardu_padam: string,
  pelanggan_tm: string,
  pelanggan_vip: string,
  wilayah_padam: string, // from alamat ref lokasi
  id_ref_ep_cuaca: string, // Ref ep cuaca
  tanggal_gangguan: string, // Ref ep cuaca
}

export const EditRekapPadamField = {
  tanggal_gangguan:moment().format("YYYY-MM-DD"),
  time:moment().format("HH:mm:ss"),
  "id_ref_ep_cuaca": "",
  "up3_id": "",
  "penyulang_id": "",

  "trafo_id": "",
  "kode_j": "",
  "status": "",
  "kat_gangguan": "",
  "penyebab_gangguan_id": "",
  "jenis_gangguan": "",
  "titik_gangguan": "",
  "zone": "",
  "nama_proteksi": "",
  "proteksi_gangguan": "",
  "kendala_apkt": "",
  "fault_indikator": "",
  "gardukecil_id": "",
  "arah_gardu": "",
  "status_gangguan": "",
  "perform_gangguan": "",
  tanggal:moment().format("YYYY-MM-DD"),
  jam:moment().format("HH:mm:ss"), 
  "uraian": "",
  "peralatan": "",
  "arah_lokasi": "",
  "gardu_padam": "",
  "arus": "",
};

interface IUpdateRekapPadam {
  "id_trans_ep": number,
  "id_keypoint": number,
  "id_ref_ep_indikasi": number,
  "id_ref_ep_penyebab_ggn": number,
  "id_ref_ep_cuaca": number,
  "id_up3": number,
  "id_ulp": number,
  "id_penyulang_fdir": any,
  "id_user_update": number,
  "no_apkt": any,
  "type": any,
  "penyebab": string,
  "jenis_padam": string,
  "r": number,
  "s": number,
  "t":number,
  "n": number,
  "beban_padam": number,
  "indikator_kerja": string,
  "jenis_pemeliharaan": string,
  "gangguan_ditemukan": string,
  "keterangan_ggn":string,
  "status_penyulang_fdir": any,
  "keterangan_penyulang_fdir": any,
  "aco_kerja": any,
  "jam_padam": any,
  "jam_buka": any,
  "jam_tutup": any,
  "jam_trip": any,
  "jam_normal": any,
  "jml_ggn_tahun": number,
  "jml_ggn_bulan": number,
  "posting": boolean,
  "keterangan":string,
  "lbs_manual": string,
  "jenis_keypoint": string,
  "sepatetik_trip": string,
  "koordinasi_proteksi": string,
  "gagal_ar": string,
  "keterangan_proteksi": string,
  "id_ref_ep_ag_hmi": number,
  "id_ref_ep_kat_ggn": number,
  "id_status_proteksi": number,
  "id_ref_ep_petugas_1": number,
  "id_ref_ep_petugas_2": number,
  "id_ref_ep_petugas_3": number,
  "kendala_apkt": number,
}

export type { IInputRekapPadam, IUpdateRekapPadam };