// import { IAsetKondisi } from "@app/interface/master-data/eam-aset-kondisi.interface";
// import { IAsetKategori } from "@app/interface/master-data/eam-aset-kategori.interface";
// import { IAsetRak } from "@app/interface/master-data/eam-aset-rak.interface";
// import { IAsetRuangan } from "@app/interface/master-data/eam-aset-ruangan.interface";
// import { IAsetLantai } from "@app/interface/master-data/eam-aset-lantai.interface";
// import { IJaringan } from "@app/interface/jaringan-lokasi.interface";
// import { IAsetStatus } from "@app/interface/master-data/eam-aset-status.interface";
// import { IBagian } from "@app/interface/master-data/eam-bagian.interface";
// import { IAsetManufaktur } from "@app/interface/master-data/eam-aset-manufaktur.interface";
// import { IAsetLevel } from "@app/interface/master-data/eam-aset-level.interface";
// import { IAsetJenis } from "@app/interface/master-data/eam-aset-jenis.interface";

interface IAset {
  id_ref_aset: string;
  id_ref_aset_parent: string;
  // ref_aset_parent: IAset;
  no_aset_int: string;
  id_ref_aset_group: string;
  id_ref_aset_kategori: string;
  // ref_aset_kategori: IAsetKategori;
  no_aset_ext: string;
  id_ref_aset_manufaktur: string;
  // ref_aset_manufaktur: IAsetManufaktur;
  model: string;
  tipe: string;
  tahun: number;
  no_seri: string;
  deskripsi: string;
  // id_trans_pm_level_1: string;
  // id_trans_pm_level_2: string;
  // id_trans_pm_level_3: string;
  lat: number;
  lon: number;
  id_ref_aset_status: string;
  // ref_aset_status: IAsetStatus;
  id_ref_aset_kondisi: string;
  // ref_aset_kondisi: IAsetKondisi;
  // jenis_aset: string;
  id_ref_lokasi_station: string;
  id_ref_lokasi_trafo: string;
  id_ref_lokasi_penyulang: string;
  id_ref_bagian: string;
  // ref_bagian: IBagian;
  //   ref_aset_level: IAsetLevel;
  //   id_trans_pm: number;
  //   id_aset_mutasi: number;
  //   id_ref_lokasi_1: IJaringan;
  //   id_ref_lokasi_2: IJaringan;
  //   id_ref_lokasi_3: IJaringan;
  //   id_ref_lokasi_4: IJaringan;
  //   ref_lokasi_1: IJaringan;
  //   ref_lokasi_2: IJaringan;
  //   ref_lokasi_3: IJaringan;
  //   ref_lokasi_4: IJaringan;
  //   id_ref_aset_rak: IAsetRak;
  //   ref_aset_lantai: IAsetLantai;
  //   ref_aset_ruangan: IAsetRuangan;
  //   id_ref_aset_jenis: IAsetJenis;
  //   ref_aset_jenis: IAsetJenis;
  //   id_ref_aset_level: IAsetLevel;
  //   id_ref_aset_lantai: IAsetLantai;
  //   id_ref_aset_ruangan: IAsetRuangan;
  //   ref_aset_rak: IAsetRak;
}
// export const AsetField = {
//   id_ref_aset: undefined,
//   id_ref_aset_parent: undefined,
//   no_aset_int: undefined,
//   id_ref_aset_group: undefined,
//   id_ref_aset_kategori: undefined,
//   no_aset_ext: undefined,
//   id_ref_aset_manufaktur: undefined,
//   model: undefined,
//   tipe: undefined,
//   tahun: undefined,
//   no_seri: undefined,
//   deskripsi: "",
//   lat: 0,
//   lon: 0,
//   id_ref_aset_status: undefined,
//   id_ref_aset_kondisi: undefined,
//   id_ref_lokasi_station: undefined,
//   id_ref_lokasi_trafo: undefined,
//   id_ref_lokasi_penyulang: undefined,
//   id_ref_bagian: undefined,
// };

export const AsetField = [
  "id_ref_aset",
  "id_ref_aset_parent",
  "no_aset_int",
  "id_ref_aset_group",
  "id_ref_aset_kategori",
  "no_aset_ext",
  "id_ref_aset_manufaktur",
  "model",
  "tipe",
  "tahun",
  "no_seri",
  "deskripsi",
  "lat",
  "lon",
  "id_ref_aset_status",
  "id_ref_aset_kondisi",
  "id_ref_lokasi_station",
  "id_ref_lokasi_trafo",
  "id_ref_lokasi_penyulang",
  "id_ref_bagian",
];

export type { IAset };
