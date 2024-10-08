import { NO } from "../../_more.columns.config"

export const TOTAL_GANGGUAN_PER_BULAN_COLUMN = () => {
  return [
    ...NO(),
    // { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Bulan', accessor: 'bulan', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Tahun', accessor: 'tahun', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jumlah Gangguan', accessor: 'jml_ggn', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const LAMA_PADAM_PENYULANG_GANGGUAN_COLUMN = () => {
  return [
    ...NO(),
    // { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Area', accessor: 'area', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu Gangguan', accessor: 'waktu_gangguan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu Nyala Gangguan', accessor: 'waktu_nyala_gangguan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Menit Padam', accessor: 'menit_padam', minWidth: '150px', disableFilters: true, show: true },
  ]

  
}

export const TOTAL_LAMA_PADAM_PENYULANG_COLUMN = () => {
  return [
    ...NO(),
    // { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Area', accessor: 'area', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal', accessor: 'datum', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Nyala', accessor: 'datum_nyala', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Indikator Relay', accessor: 'indikator_relay', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Sebab Gangguan', accessor: 'sebab_gangguan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Keterangan Gangguan', accessor: 'keterangan_gangguan', minWidth: '150px', disableFilters: true, show: true },
  ]

  
}

export const LAMA_PADAM_PER_AREA_COLUMN = () => {
  return [
    ...NO(),
    // { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Area', accessor: 'area', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Menit Padam', accessor: 'gardu_induk', minWidth: '170px', disableFilters: true, show: true },
    ]

  
}

export const PADAM_5_MENIT_COLUMN = () => {
  return [
    ...NO(),
    // { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Area Jaringan', accessor: 'area', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Waktu Gangguan', accessor: 'waktu_gangguan', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Jam Nyala', accessor: 'jam_nyala', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Jenis Jaringan', accessor: 'jenis_jaringan', minWidth: '170px', disableFilters: true, show: true },
    ]

  
}

export const PADAM_5_MENIT_PER_AREA_COLUMN = () => {
  return [
    ...NO(),
    // { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Area Jaringan', accessor: 'area', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Jumlah', accessor: 'jumlah', minWidth: '170px', disableFilters: true, show: true },
    ]

  
}

export const PADAM_KURANG_5_MENIT_PER_AREA_COLUMN = () => {
  return [
    ...NO(),
    // { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Area', accessor: 'area', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Jumlah', accessor: 'jumlah', minWidth: '170px', disableFilters: true, show: true },
    ]

  
}

export const PADAM_TRAFO_DAN_PENYULANG_COLUMN = () => {
  return [
    ...NO(),
    // { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'No GGN', accessor: 'no_ggn', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Area', accessor: 'area', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'No Trafo', accessor: 'no_trafo', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'ID Trafo', accessor: 'id_trafo', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'GI', accessor: 'gi', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Jam Padam', accessor: 'jam_padam', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Jam Nyala', accessor: 'jam_nyala', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Lama Padam', accessor: 'lama_padam', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Ampere Trafo', accessor: 'ampere_trafo', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Ampere Penyulang', accessor: 'ampere_penyulang', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Penyebab GGN', accessor: 'penyebab_gangguan', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Sisi GGN', accessor: 'sisi_ggn', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'MVA Lost', accessor: 'mva_lost', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'KWH Lost', accessor: 'kwh_lost', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Daerah Padam', accessor: 'daerah_padam', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '170px', disableFilters: true, show: true },
    ]

  
}

export const DAFTAR_PADAM__PENYULANG_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'GI', accessor: 'gi', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'TRAFO GI', accessor: 'trafo_gi', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Area', accessor: 'area', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'PENYULANG', accessor: 'penyulang', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'NO GGN', accessor: 'no_ggn', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'TGL PADAM', accessor: 'tgl_padam', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'TGL NYALA', accessor: 'tgl_nyala', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'LAMA PADAM', accessor: 'lama_padam', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'AMPERE', accessor: 'ampere', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'INDIKATOR RELAY', accessor: 'indikator relay', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'L1', accessor: 'l1', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'L2', accessor: 'l2', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'L3', accessor: 'l3', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'L0', accessor: 'l0', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'DAERAH PADAM', accessor: 'daerah_padam', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'PENYEBAB PADAM', accessor: 'penyebab_padam', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'KETERANGAN', accessor: 'keterangan', minWidth: '170px', disableFilters: true, show: true },
    ]

  
}

export const KALI_TRIP_PER_PENYULANG_PER_BULAN_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'PENYULANG', accessor: 'penyulang', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'JUMLAH KALI TRIP', accessor: 'jml_kali_trip', minWidth: '170px', disableFilters: true, show: true },
  ]

  
}

export const GANGGUAN_PENYULANG_PER_INDIKASI_RELAY_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'KODE TRIP RELAY', accessor: 'kode_trip_relay', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'JUMLAH', accessor: 'jmlh', minWidth: '170px', disableFilters: true, show: true },
  ]

  
}

export const TOTAL_GANGGUAN_PER_AREA_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Area', accessor: 'area', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Kali Gangguan', accessor: 'kali_ggn', minWidth: '170px', disableFilters: true, show: true },
  ]

  
}

export const TOTAL_GANGGUAN_PER_GI_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'GI', accessor: 'area', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Jumlah', accessor: 'jumlah', minWidth: '170px', disableFilters: true, show: true },
  ]

  
}

export const TRIP_BERSAMAAN_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'GI', accessor: 'area', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Trafo', accessor: 'trafo', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'TGL GGN', accessor: 'tgl_ggn', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'INDK RELEI', accessor: 'indk_relei', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'L1', accessor: 'l1', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'L2', accessor: 'l2', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'L3', accessor: 'l3', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'L0', accessor: 'l0', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Merk Relei', accessor: 'merk_relei', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Tipe Relei', accessor: 'tipe_relei', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Jenis Jaringan', accessor: 'jenis_jaringan', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Sebab GGN', accessor: 'sebab_ggn', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'keterangan', accessor: 'keterangan', minWidth: '170px', disableFilters: true, show: true },
  ]

  
}

export const JUMLAH_GANGGUAN_PER_GI_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Tanggal Gangguan', accessor: 'tanggal_gangguan', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Jumlah Gangguan', accessor: 'jumlah_gangguan', minWidth: '170px', disableFilters: true, show: true },
  ]

  
}

export const HAR_GGN_VS_NON_GGN_COLUMN = () => {
  return [
    ...NO(),
    // { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Area', accessor: 'area', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'GI', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Ampere Keluar', accessor: 'ampere_keluar', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Indikator Relay', accessor: 'indikator_relay', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const OUTBOX_COLUMN = () => {
  return [
    ...NO(),
    // { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Kirim Ke', accessor: 'kirim_ke', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Nomor', accessor: 'nomor', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msg', accessor: 'msg', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Status Kirim', accessor: 'status_kirim', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Tgl Create', accessor: 'tgl_create', minWidth: '170px', disableFilters: true, show: true },
    ]

  
}