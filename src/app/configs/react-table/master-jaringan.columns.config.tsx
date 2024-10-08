import { SelectColumnFilter } from "@app/components/ReactTable/ReactTableFilter"
import React from "react"
import { ACTION_COLUMN, NO } from "./_more.columns.config"
// import { DATETIME_JQWidget, NO_JQWidget } from "./_more-jqwidget.column.config"


export const GI_COLUMNS = () => {
  return [
    { Header: 'Nama Gardu Induk', accessor: 'nama', show: true },
    { Header: 'Alamat', accessor: 'alamat', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', show: true },
    { Header: 'UP3', accessor: 'up3', show: true },
    { Header: 'ULP', accessor: 'ulp', show: true }
  ]
}

export const ZONE_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kode Zona', accessor: 'kode_zona', minWidth: '150px', show: true },
    { Header: 'Kode Feeder', accessor: 'kode_feeder', minWidth: '150px', show: true },
    { Header: 'Nama Zona', accessor: 'nama_zona', minWidth: '150px', show: true },
    { Header: 'Alamat Zona', accessor: 'alamat_zona', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true }
  ]
}

export const SECTION_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kode Section', accessor: 'kode_section', minWidth: '150px', show: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '150px', show: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true },
    { Header: 'Kode Zona', accessor: 'kode_zona', minWidth: '150px', show: true },
    { Header: 'Kode Feeder', accessor: 'kode_feeder', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true }
  ]
}

export const SEGMENT_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kode Segment', accessor: 'kode_segment', minWidth: '150px', show: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '150px', show: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true },
    { Header: 'Kode Zona', accessor: 'kode_zona', minWidth: '150px', show: true },
    { Header: 'Kode Feeder', accessor: 'kode_feeder', minWidth: '150px', show: true },
    { Header: 'Kode Section', accessor: 'kode_section', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true }
  ]
}

export const TRAFO_GI_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kode Trafo', accessor: 'kode_trafo', minWidth: '120px', show: true },
    { Header: 'Kode Gardu', accessor: 'kode_gardu', minWidth: '120px', show: true },
    { Header: 'Kode GI', accessor: 'kode_gi', minWidth: '120px', show: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '120px', show: true },
    { Header: 'Alamat Trafo', accessor: 'alamat_trafo', minWidth: '120px', show: true },
    { Header: 'Jenis Trafo', accessor: 'jenis_trafo', minWidth: '120px', show: true },
    { Header: 'PHASE', accessor: 'phase', minWidth: '120px', show: true },
    { Header: 'Total Daya (KVA)', accessor: 'total_daya', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true }
  ]
}

export const TRAFO_GI_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'id_ref_lokasi', type: 'string' },
      { name: 'parent_lokasi', type: 'string' },
      { name: 'id_unit_induk', type: 'string' },
      { name: 'nama', type: 'string' },
      { name: 'pemilik', type: 'string' },
      { name: 'kapasitas', type: 'string' },
      { name: 'sub_sistem', type: 'string' },
      { name: 'id_pemilik', type: 'string' },
      { name: 'jenis_layanan', type: 'string' },
      { name: 'def_pengukuran_teg_primer', type: 'string' },
      { name: 'def_pengukuran_teg_sekunder', type: 'string' },
      { name: 'def_nilai_cosq', type: 'string' },
      { name: 'sinkron_data', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'id_i', type: 'string' },
      { name: 'id_v', type: 'string' },
      { name: 'id_p', type: 'string' },
      { name: 'id_amr', type: 'string' },
      { name: 'id_portal_ext', type: 'string' },
      { name: 'url_webservice', type: 'string' },
      { name: 'status_trafo', type: 'string' },
      { name: 'rekon_beban', type: 'string' },
      { name: 'status', type: 'string' },

    ],
    columngroups: [
      { text: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
      { text: 'Mapping AMR', align: 'center', name: 'mappingamr' },
      { text: 'Mapping Portal External', align: 'center', name: 'mappingexternal' }
    ],
    columns: [
      { text: 'No', datafield: 'number', width: 50, },
      { text: 'Trafo', datafield: 'nama', width: 200, },
      { text: 'Gardu Induk', datafield: 'parent_lokasi', width: 200, },
      { text: 'Unit Induk', datafield: 'id_unit_induk', width: 200, },
      { text: 'Pengelola', datafield: 'pemilik', width: 200, },
      { text: 'Kapasitas (MVA)', datafield: 'kapasitas', width: 150, },
      { text: 'Subsistem', datafield: 'sub_sistem', width: 200, },
      { text: 'Status Trafo', datafield: 'status_trafo', width: 200, },
      // // { text: 'Pemilik', datafield: 'id_pemilik', width: 100, },
      { text: 'Jenis Layanan', datafield: 'jenis_layanan', width: 200, },
      { text: 'Teg. Primer (kV)', datafield: 'def_pengukuran_teg_primer', width: 200, },
      { text: 'Teg. Sekunder (kV)', datafield: 'def_pengukuran_teg_sekunder', width: 200, },
      { text: 'COS PHI', datafield: 'def_nilai_cosq', width: 200, },
      { text: 'Sinkron Data', datafield: 'sinkron_data', width: 200, },
      { text: 'Path1', datafield: 'path1', columngroup: 'mappingscada', width: 200, },
      { text: 'Path2', datafield: 'path2', columngroup: 'mappingscada', width: 200, },
      { text: 'Path3', datafield: 'path3', columngroup: 'mappingscada', width: 200, },
      { text: 'ID I(Arus)', datafield: 'id_i', columngroup: 'mappingscada', width: 200, },
      { text: 'ID V(Tegangan)', datafield: 'id_v', columngroup: 'mappingscada', width: 200, },
      { text: 'ID P(Daya)', datafield: 'id_p', columngroup: 'mappingscada', width: 200, },
      { text: 'ID AMR', datafield: 'id_amr', columngroup: 'mappingamr', width: 200, },
      { text: 'ID Portal EXT', datafield: 'id_portal_ext', columngroup: 'mappingexternal', width: 200, },
      { text: 'URL Webservice', datafield: 'url_webservice', columngroup: 'mappingexternal', width: 200, },
      { text: 'Rekon Beban', datafield: 'rekon_beban', width: 100, editable: false, columntype: 'checkbox', filtertype: 'bool' },
      { text: 'Status Aktif', datafield: 'status_listrik', width: 80, editable: false, columntype: 'checkbox', filtertype: 'bool' },
    ],
  };
}


export const TRAFO_GI_COLUMNS_GRID = () => ({
  datafields: [
    { name: 'parent_lokasi', type: 'string' },
    { name: 'nama', type: 'string' },
    { name: 'pemilik', type: 'string' },
    { name: 'kapasitas', type: 'string' },
    { name: 'nama_sub_sistem', type: 'string' },
    { name: 'id_pemilik', type: 'string' },
    { name: 'jenis_layanan', type: 'string' },
    { name: 'def_pengukuran_teg_primer', type: 'string' },
    { name: 'def_pengukuran_teg_sekunder', type: 'string' },
    { name: 'def_nilai_cosq', type: 'string' },
    { name: 'sinkron_data', type: 'string' },
    { name: 'path1', type: 'string' },
    { name: 'path2', type: 'string' },
    { name: 'path3', type: 'string' },
    { name: 'id_unit_induk', type: 'string' },
    { name: 'id_i', type: 'string' },
    { name: 'id_v', type: 'string' },
    { name: 'id_p', type: 'string' },
    { name: 'id_amr', type: 'string' },
    { name: 'id_portal_ext', type: 'string' },
    { name: 'url_webservice', type: 'string' },
    { name: 'status_trafo', type: 'string' },
    { name: 'rekon_beban', type: 'string' },
    { name: 'status', type: 'string' },
  ],
  columnGroups: [
    { label: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
    { label: 'Mapping AMR', align: 'center', name: 'mappingamr' },
    { label: 'Mapping Portal External', align: 'center', name: 'mappingexternal' }
  ],
  columns: [
    { label: 'No', dataField: 'number', width: 50, },
    { label: 'Trafo', dataField: 'nama', width: 200, },
    { label: 'Gardu Induk', dataField: 'parent_lokasi', width: 200, },
    { label: 'Unit Induk', dataField: 'id_unit_induk', width: 200, },
    { label: 'Pengelola', dataField: 'pemilik', width: 200, },
    { label: 'Kapasitas (MVA)', dataField: 'kapasitas', width: 150, },
    { label: 'Sub Sistem', dataField: 'nama_sub_sistem', width: 200, },
    // { label: 'Pemilik', dataField: 'id_pemilik', width: 100, },
    { label: 'Jenis Layanan', dataField: 'jenis_layanan', width: 200, },
    { label: 'Teg. Primer (kV)', dataField: 'def_pengukuran_teg_primer', width: 200, },
    { label: 'Teg. Sekunder (kV)', dataField: 'def_pengukuran_teg_sekunder', width: 200, },
    { label: 'COS PHI', dataField: 'def_nilai_cosq', width: 200, },
    { label: 'Sinkron Data', dataField: 'sinkron_data', width: 200, },
    { label: 'Path1', dataField: 'path1', columnGroup: 'mappingscada', width: 200, },
    { label: 'Path2', dataField: 'path2', columnGroup: 'mappingscada', width: 200, },
    { label: 'Path3', dataField: 'path3', columnGroup: 'mappingscada', width: 200, },
    { label: 'ID I(Arus)', dataField: 'id_i', columnGroup: 'mappingscada', width: 200, },
    { label: 'ID V(Tegangan)', dataField: 'id_v', columnGroup: 'mappingscada', width: 200, },
    { label: 'ID P(Daya)', dataField: 'id_p', columnGroup: 'mappingscada', width: 200, },
    { label: 'ID AMR', dataField: 'id_amr', columnGroup: 'mappingamr', width: 200, },
    { label: 'ID Portal EXT', dataField: 'id_portal_ext', columnGroup: 'mappingexternal', width: 200, },
    { label: 'URL Webservice', dataField: 'url_webservice', columnGroup: 'mappingexternal', width: 200, },
    { label: 'Status Trafo', dataField: 'status_trafo', width: 200, },
    { label: 'Rekon Beban', dataField: 'rekon_beban', width: 100, template: 'checkBox' },
    { label: 'Status Aktif', dataField: 'status_listrik', width: 80, template: 'checkBox' }
  ]
});

export const GARDU_DISTRIBUSI_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'No Gardu Dist', accessor: 'no_gardu_dist', minWidth: '150px', show: true },
    { Header: 'Kode Feeder', accessor: 'kode_feeder', minWidth: '150px', show: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '150px', show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true },
    { Header: 'Jumlah Pelanggan', accessor: 'jumlah_pelamggan', minWidth: '150px', show: true },
    { Header: 'Total Daya (KVA)', accessor: 'total_daya', minWidth: '150px', show: true },
    { Header: 'Jumlah Jurusan', accessor: 'jumlah_jurusan', minWidth: '150px', show: true },
    { Header: 'Jenis Trafo', accessor: 'jenis_trafo', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true }
  ]
}

export const TRAFO_GD_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kode Trafo', accessor: 'kode_trafo', minWidth: '150px', show: true },
    { Header: 'Kode Gardu', accessor: 'kode_gardu', minWidth: '150px', show: true },
    { Header: 'Kode GI', accessor: 'kode_gi', minWidth: '150px', show: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '150px', show: true },
    { Header: 'Alamat Trafo', accessor: 'alamat', minWidth: '150px', show: true },
    { Header: 'Jenis Trafo', accessor: 'jenis_trafo', minWidth: '150px', show: true },
    { Header: 'PHASE', accessor: 'phase', minWidth: '150px', show: true },
    { Header: 'Total Daya (KVA)', accessor: 'total_daya', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true }
  ]
}
export const PENYULANG_COLUMN_GRID = () => ({
  datafields: [
    { name: 'number', type: 'number' },
    { name: 'gardu_induk', type: 'string' },
    { name: 'parent_lokasi', type: 'string' },
    { name: 'kode_lokasi', type: 'string' },
    { name: 'nama', type: 'string' },
    { name: 'coverage', type: 'string' },
    { name: 'panjang_jaringan', type: 'string' },
    { name: 'jenis_jaringan', type: 'string' },
    { name: 'jenis_peralatan', type: 'string' },
    { name: 'status_penyulang', type: 'string' },
    { name: 'uid', type: 'string' },
    { name: 'up3_1', type: 'string' },
    { name: 'ulp_1', type: 'string' },
    { name: 'count_gardu', type: 'string' },
    { name: 'i_max', type: 'string' },
    { name: 'jumlah_pelanggan', type: 'string' },
    { name: 'dcc', type: 'string' },
    { name: 'id_pemilik', type: 'string' },
    { name: 'fungsi_lokasi', type: 'string' },
    { name: 'id_i', type: 'string' },
    { name: 'id_v', type: 'string' },
    { name: 'id_p', type: 'string' },
    { name: 'id_amr', type: 'string' },
    { name: 'id_portal_ext', type: 'string' },
    { name: 'url_webservice', type: 'string' },
    { name: 'path1', type: 'string' },
    { name: 'path2', type: 'string' },
    { name: 'path3', type: 'string' },
    { name: 'rekon_beban', type: 'string' },
    { name: 'status_listrik', type: 'string' },
  ],
  columnGroups: [
    {
      label: 'Mapping SCADA',
      align: 'center',
      name: 'mappingscada'
    },
    {
      label: 'Mapping AMR',
      align: 'center',
      name: 'mappingamr'
    },
    {
      label: 'Mapping Portal External',
      align: 'center',
      name: 'mappingportalex'
    }
  ],

  columns: [
    // { label: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
    { label: 'NO', dataField: 'number', width: 50, },
    { label: 'Kode Penyulang', dataField: 'kode_lokasi', width: 200, },
    { label: 'Nama Penyulang', dataField: 'nama', width: 200, },
    { label: 'Gardu Induk', dataField: 'gardu_induk', width: 200, },
    { label: 'Trafo/Pembangkit/GH', dataField: 'parent_lokasi', width: 200, },
    { label: 'Coverage', dataField: 'coverage', width: 200, },
    { label: 'Panjang Jaringan', dataField: 'panjang_jaringan', width: 200, },
    { label: 'Jenis Jaringan', dataField: 'jenis_jaringan', width: 200, },
    { label: 'Jenis Peralatan', dataField: 'jenis_peralatan', width: 200, },
    { label: 'Status Penyulang', dataField: 'status_penyulang', width: 200, },
    { label: 'Unit Induk', dataField: 'uid', width: 200, },
    { label: 'UP3', dataField: 'up3_1', width: 200, },
    { label: 'ULP', dataField: 'ulp_1', width: 200, },
    { label: 'Jumlah Gardu', dataField: 'count_gardu', width: 200, },
    { label: 'I Max (A)', dataField: 'i_max', width: 200, },
    { label: 'Total Pelanggan', dataField: 'jumlah_pelanggan', width: 200, },
    { label: 'DCC', dataField: 'dcc', width: 200, },
    // { label: 'Pemilik', dataField: 'pemilik', width: 200,  },
    { label: 'Fungsi Lokasi', dataField: 'fungsi_lokasi', width: 200, },

    { label: 'Path1', columnGroup: 'mappingscada', dataField: 'path1', width: 150, },
    { label: 'Path2', columnGroup: 'mappingscada', dataField: 'path2', width: 150, },
    { label: 'Path3', columnGroup: 'mappingscada', dataField: 'path3', width: 150, },
    { label: 'ID I(Arus)', columnGroup: 'mappingscada', dataField: 'id_i', width: 150, },
    { label: 'ID V(Tegangan)', columnGroup: 'mappingscada', dataField: 'id_v', width: 150, },
    { label: 'ID P(Daya)', columnGroup: 'mappingscada', dataField: 'id_p', width: 150, },

    { label: 'ID AMR', columnGroup: 'mappingamr', dataField: 'id_amr', width: 150, },

    { label: 'ID Portal EXT', columnGroup: 'mappingportalex', dataField: 'id_portal_ext', width: 150, },
    { label: 'URL Webservice', columnGroup: 'mappingportalex', dataField: 'url_webservice', width: 150, },

    { label: 'Rekon Beban', dataField: 'rekon_beban', width: 100, template: 'checkBox' },
    { label: 'Status', dataField: 'status_listrik', width: 80, template: 'checkBox' },

  ]
});


export const PENYULANG_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kode Feeder', accessor: 'kode_feeder', minWidth: '150px', show: true },
    { Header: 'Nama Feeder', accessor: 'nama_feeder', minWidth: '150px', show: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '150px', show: true },
    { Header: 'Kode Gardu Induk', accessor: 'kode_gi', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '150px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true },
    { Header: 'Terakhir Update', accessor: 'last_update', minWidth: '150px', show: true },
  ]
}

export const GARDU_HUBUNG_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'No Aset', accessor: 'no_aset', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Gardu', accessor: 'gardu', minWidth: '250px', show: true, disableFilters: true },
    { Header: 'Fungsi Gardu', accessor: 'fungsi_gardu', minWidth: '150px', show: true },
    { Header: 'Fungsi SCADA', accessor: 'fungsi_scada', minWidth: '150px', show: true },
    { Header: 'GI', accessor: 'gi', minWidth: '150px', show: true },
    { Header: 'Feeder', accessor: 'feeder', minWidth: '170px', show: true },
    { Header: 'Zone', accessor: 'zone', minWidth: '170px', show: true },
    { Header: 'Section', accessor: 'section', minWidth: '150px', show: true },
    { Header: 'Segment', accessor: 'segment', minWidth: '150px', show: true },
    ...ACTION_COLUMN(),
  ]
}

export const UNIT_PEMBANGKIT = () => {
  return [
    ...NO(),
    { Header: 'Nama Unit Pembangkit', accessor: 'nama', minWidth: '250px', show: true, disableFilters: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Tree Jaringan', accessor: 'tree_jaringan', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}

export const UNIT_PEMBANGKIT_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'status_listrik', type: 'string' },
      { name: 'tree_jaringan', type: 'string' },
      { name: 'lat', type: 'number' },
      { name: 'lon', type: 'number' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Unit Induk', datafield: 'unit_induk', width: '10%', editable: false, },
      { text: 'Nama Unit Pembangkit', datafield: 'nama', width: '10%', editable: false, },
      { text: 'Alamat', datafield: 'alamat', width: '15%', editable: false, },
      { text: 'Path1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'Path2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'Path3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Latitude', datafield: 'lat', width: '10%', editable: false, },
      { text: 'Longitude', datafield: 'lon', width: '10%', editable: false, },
      { text: 'Status Aktif', datafield: 'status_listrik', width: '10%', editable: false, columntype: 'checkbox', filtertype: 'bool' },
      { text: 'Tree Jaringan', datafield: 'tree_jaringan', width: '10%', editable: false, columntype: 'checkbox', filtertype: 'bool' }

    ],
  };
};

export const UNIT_PEMBANGKIT_COLUMN_GRID = () => ({
  datafields: [
    { name: 'number', type: 'number' },
    { name: 'nama', type: 'string' },
    { name: 'alamat', type: 'string' },
    { name: 'id_unit_induk', type: 'string' },
    { name: 'path1', type: 'string' },
    { name: 'path2', type: 'string' },
    { name: 'path3', type: 'string' },
    { name: 'status_listrik', type: 'string' },
    { name: 'tree_jaringan', type: 'string' },
    { name: 'lat', type: 'number' },
    { name: 'lon', type: 'number' },
  ],

  columns: [
    // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
    { label: 'NO', dataField: 'number', width: '5%' },
    { label: 'Unit Induk', dataField: 'id_unit_induk', width: '10%' },
    { label: 'Nama Unit Pembangkit', dataField: 'nama', width: '10%' },
    { label: 'Alamat', dataField: 'alamat', width: '15%' },
    { label: 'Path1', dataField: 'path1', width: '10%' },
    { label: 'Path2', dataField: 'path2', width: '10%' },
    { label: 'Path3', dataField: 'path3', width: '10%' },
    { label: 'Status Aktif', dataField: 'status_listrik', width: '10%', template: 'checkBox' },
    // { label: 'Tree Jaringan', dataField: 'tree_jaringan', width: '10%' ,template: 'checkBox' },
    { label: 'Latitude', dataField: 'lat', width: '10%' },
    { label: 'Longitude', dataField: 'lon', width: '10%' },

  ],
});
export const UNIT_PEMBANGKIT_COLUMN_GRID_list = () => ({
  datafields: [
    { name: 'number', type: 'number' },
    { name: 'nama', type: 'string' },
    { name: 'alamat', type: 'string' },
    { name: 'path1', type: 'string' },
    { name: 'path2', type: 'string' },
    { name: 'path3', type: 'string' },
    { name: 'status_listrik', type: 'string' },
    { name: 'tree_jaringan', type: 'string' },
    { name: 'lat', type: 'number' },
    { name: 'lon', type: 'number' },
  ],

  columns: [
    // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
    { label: 'NO', dataField: 'number', width: '5%' },
    { label: 'Nama Unit Pembangkit', dataField: 'nama', width: '10%' },
    { label: 'Alamat', dataField: 'alamat', width: '15%' },
    { label: 'Path1', dataField: 'path1', width: '10%' },
    { label: 'Path2', dataField: 'path2', width: '10%' },
    { label: 'Path3', dataField: 'path3', width: '10%' },
    { label: 'Status Aktif', dataField: 'status_listrik', width: '10%', template: 'checkBox' },
    { label: 'Tree Jaringan', dataField: 'tree_jaringan', width: '10%', template: 'checkBox' },
    { label: 'Latitude', dataField: 'lat', width: '10%' },
    { label: 'Longitude', dataField: 'lon', width: '10%' },

  ],
});



export const PEMBANGKIT_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Nama Pembangkit', accessor: 'nama', minWidth: '250px', show: true, disableFilters: true },
    // { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'No Urut Cell', accessor: 'no_urut', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Unit Pembangkit', accessor: 'parent_lokasi', minWidth: '250px', show: true, disableFilters: true },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true, },
    {
      Header: 'Mapping SCADA', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'ID I(Arus)', accessor: 'id_i', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'ID V(Tegangan)', accessor: 'id_v', minWidth: '140px', show: true, disableFilters: true, },
        { Header: 'ID P(Daya)', accessor: 'id_p', minWidth: '120px', show: true, disableFilters: true, },
      ]
    },
    {
      Header: 'Mapping AMR', accessor: '', minWidth: '150px', show: true, disableFilters: true, columns: [
        { Header: 'ID AMR', accessor: 'id_amr', minWidth: '150px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: 'Mapping Portal External', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'ID Portal EXT', accessor: 'id_portal_ext', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'URL Webservice', accessor: 'url_webservice', minWidth: '150px', show: true, disableFilters: true, },
      ]
    },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const PEMBANGKIT_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama_lokasi', type: 'string' },
      { name: 'unit_induk', type: 'string' },
      { name: 'parent_lokasi', type: 'string' },
      { name: 'lat', type: 'string' },
      { name: 'lon', type: 'string' },
      { name: 'id_i', type: 'string' },
      { name: 'id_v', type: 'string' },
      { name: 'id_p', type: 'string' },
      { name: 'id_amr', type: 'string' },
      { name: 'id_portal_ext', type: 'string' },
      { name: 'url_webservice', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'status_listrik', type: 'string' },

    ],
    columngroups: [
      { text: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
      { text: 'Mapping AMR', align: 'center', name: 'mappingamr' },
      { text: 'Mapping Portal External', align: 'center', name: 'mappingportalex' },
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Unit Induk', datafield: 'unit_induk', width: 200, editable: false, },
      { text: 'Nama Pembangkit', datafield: 'nama_lokasi', width: 200, editable: false, },
      { text: 'Unit Pembangkit', datafield: 'parent_lokasi', width: 200, editable: false, },
      { text: 'Latitude', datafield: 'lat', width: 200, editable: false, },
      { text: 'Longitude', datafield: 'lon', width: 200, editable: false, },

      { text: 'Path1', columngroup: 'mappingscada', datafield: 'path1', width: 150, editable: false, },
      { text: 'Path2', columngroup: 'mappingscada', datafield: 'path2', width: 150, editable: false, },
      { text: 'Path3', columngroup: 'mappingscada', datafield: 'path3', width: 150, editable: false, },
      { text: 'ID I(Arus)', columngroup: 'mappingscada', datafield: 'id_i', width: 150, editable: false, },
      { text: 'ID V(Tegangan)', columngroup: 'mappingscada', datafield: 'id_v', width: 150, editable: false, },
      { text: 'ID P(Daya)', columngroup: 'mappingscada', datafield: 'id_p', width: 150, editable: false, },

      { text: 'ID AMR', columngroup: 'mappingamr', datafield: 'id_amr', width: 150, editable: false, },

      { text: 'ID Portal EXT', columngroup: 'mappingportalex', datafield: 'id_portal_ext', width: 150, editable: false, },
      { text: 'URL Webservice', columngroup: 'mappingportalex', datafield: 'url_webservice', width: 150, editable: false, },

      { text: 'Status Aktif', datafield: 'status_listrik', width: 80, editable: false, columntype: 'checkbox', filtertype: 'bool' },

    ]
  }
}


export const PEMBANGKIT_COLUMN_GRID = () => ({
  datafields: [
    { name: 'number', type: 'number' },
    { name: 'nama_lokasi', type: 'string' },
    { name: 'id_unit_induk', type: 'string' },
    { name: 'parent_lokasi', type: 'string' },
    { name: 'lat', type: 'string' },
    { name: 'lon', type: 'string' },
    { name: 'id_i', type: 'string' },
    { name: 'id_v', type: 'string' },
    { name: 'id_p', type: 'string' },
    { name: 'id_amr', type: 'string' },
    { name: 'id_portal_ext', type: 'string' },
    { name: 'url_webservice', type: 'string' },
    { name: 'path1', type: 'string' },
    { name: 'path2', type: 'string' },
    { name: 'path3', type: 'string' },
    { name: 'status_listrik', type: 'string' },
  ],
  columnGroups: [
    { label: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
    { label: 'Mapping AMR', align: 'center', name: 'mappingamr' },
    { label: 'Mapping Portal External', align: 'center', name: 'mappingportalex' },
  ],
  columns: [
    // { label: 'trans_id_kinerja', dataField: 'trans_id_kinerja', width: 120, editable: false, },
    { label: 'NO', dataField: 'number', width: 50, },
    { label: 'Unit Induk', dataField: 'id_unit_induk', width: 200, },
    { label: 'Nama Pembangkit', dataField: 'nama_lokasi', width: 200, },
    { label: 'Unit Pembangkit', dataField: 'parent_lokasi', width: 200, },
    { label: 'Latitude', dataField: 'lat', width: 200, },
    { label: 'Longitude', dataField: 'lon', width: 200, },

    { label: 'Path1', columnGroup: 'mappingscada', dataField: 'path1', width: 150, },
    { label: 'Path2', columnGroup: 'mappingscada', dataField: 'path2', width: 150, },
    { label: 'Path3', columnGroup: 'mappingscada', dataField: 'path3', width: 150, },
    { label: 'ID I(Arus)', columnGroup: 'mappingscada', dataField: 'id_i', width: 150, },
    { label: 'ID V(Tegangan)', columnGroup: 'mappingscada', dataField: 'id_v', width: 150, },
    { label: 'ID P(Daya)', columnGroup: 'mappingscada', dataField: 'id_p', width: 150, },

    { label: 'ID AMR', columnGroup: 'mappingamr', dataField: 'id_amr', width: 150, },

    { label: 'ID Portal EXT', columnGroup: 'mappingportalex', dataField: 'id_portal_ext', width: 150, },
    { label: 'URL Webservice', columnGroup: 'mappingportalex', dataField: 'url_webservice', width: 150, },

    { label: 'Status Aktif', dataField: 'status_listrik', width: 80, template: 'checkBox', },

  ]
});



export const GARDU_INDUK = () => {
  return [
    ...NO(),
    { Header: 'Kode Gardu Induk', accessor: 'kode_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Nama Gardu Induk', accessor: 'nama', minWidth: '250px', show: true, disableFilters: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis GI', accessor: 'jenis_gi', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Fungsi SCADA', accessor: 'fungsi_scada', minWidth: '130px', show: true, disableFilters: true },
    { Header: 'Unit Pembangkit', accessor: 'unit_pembangkit', minWidth: '150px', show: true, disableFilters: true }, // , Filter: SelectColumnFilter, filterOutside: true, filterType: 'unit-pembangkit'
    { Header: 'Pembangkit', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'UP2B', accessor: 'up2b', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Rekon Beban', accessor: 'rekon_beban', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}

export const GARDU_INDUK_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'kode_lokasi', type: 'string' },
      { name: 'jenis_layanan', type: 'string' },
      { name: 'unit_induk', type: 'string' },
      { name: 'nama_lokasi', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'jenis_gi', type: 'string' },
      { name: 'fungsi_scada', type: 'string' },
      { name: 'parent_lokasi', type: 'string' },
      { name: 'up2b', type: 'string' },
      { name: 'lat', type: 'string' },
      { name: 'lon', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'id_i', type: 'string' },
      { name: 'id_v', type: 'string' },
      { name: 'id_p', type: 'string' },
      { name: 'id_amr', type: 'string' },
      { name: 'id_portal_ext', type: 'string' },
      { name: 'url_webservice', type: 'string' },
      { name: 'rekon_beban', type: 'string' },
      { name: 'status_listrik', type: 'string' },
    ],
    columngroups: [
      { text: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
      { text: 'Mapping AMR', align: 'center', name: 'mappingamr' },
      { text: 'Mapping Portal External', align: 'center', name: 'mappingexternal' }
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Pembangkit', datafield: 'parent_lokasi', width: 200, editable: false, },
      { text: 'UP2B', datafield: 'up2b', width: 200, editable: false, },
      { text: 'Unit Induk', datafield: 'unit_induk', width: 200, editable: false, },
      { text: 'Kode Gardu Induk', datafield: 'kode_lokasi', width: 200, editable: false, },
      { text: 'Nama Gardu Induk', datafield: 'nama_lokasi', width: 200, editable: false, },
      { text: 'Jenis Layanan', datafield: 'jenis_layanan', width: 200, editable: false, },
      { text: 'Jenis GI', datafield: 'jenis_gi', width: 200, editable: false, },
      // { text: 'Pemilik', datafield: 'pemilik', width: 200, editable: false, },

      { text: 'Path1', datafield: 'path1', width: 200, editable: false, columngroup: 'mappingscada' },
      { text: 'Path2', datafield: 'path2', width: 200, editable: false, columngroup: 'mappingscada' },
      { text: 'Path3', datafield: 'path3', width: 200, editable: false, columngroup: 'mappingscada' },
      { text: 'ID I(Arus)', datafield: 'id_i', width: 200, editable: false, columngroup: 'mappingscada' },
      { text: 'ID V(Tegangan)', datafield: 'id_v', width: 200, editable: false, columngroup: 'mappingscada' },
      { text: 'ID P(Daya)', datafield: 'id_p', width: 200, editable: false, columngroup: 'mappingscada' },
      { text: 'ID AMR', datafield: 'id_amr', width: 200, editable: false, columngroup: 'mappingamr' },
      { text: 'ID Portal Ext', datafield: 'id_portal_ext', width: 200, editable: false, columngroup: 'mappingexternal' },
      { text: 'URL Webservice', datafield: 'url_webservice', width: 200, editable: false, columngroup: 'mappingexternal' },
      { text: 'Alamat', datafield: 'alamat', width: 200, editable: false, },
      { text: 'Latitude', datafield: 'lat', width: 200, editable: false, },
      { text: 'Longitude', datafield: 'lon', width: 200, editable: false, },
      { text: 'Status Aktif', datafield: 'status_listrik', width: 80, editable: false, columntype: 'checkbox', filtertype: 'bool' },
      { text: 'Rekon Beban', datafield: 'rekon_beban', width: 120, editable: false, columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
};

export const GARDU_INDUK_COLUMN_GRID = () => ({
  datafields: [
    { name: 'number', type: 'number' },
    { name: 'kode_lokasi', type: 'string' },
    { name: 'jenis_layanan', type: 'string' },
    { name: 'id_unit_induk', type: 'string' },
    { name: 'nama_lokasi', type: 'string' },
    { name: 'alamat', type: 'string' },
    { name: 'jenis_gi', type: 'string' },
    { name: 'fungsi_scada', type: 'string' },
    { name: 'unit_pembangkit', type: 'string' },
    { name: 'parent_lokasi', type: 'string' },
    { name: 'up2b', type: 'string' },
    { name: 'lat', type: 'string' },
    { name: 'lon', type: 'string' },
    { name: 'path1', type: 'string' },
    { name: 'path2', type: 'string' },
    { name: 'path3', type: 'string' },
    { name: 'rekon_beban', type: 'string' },
    { name: 'status_listrik', type: 'string' },
    { name: 'pemilik', type: 'string' },
  ],
  columnGroups: [
    { label: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
    { label: 'Mapping AMR', align: 'center', name: 'mappingamr' },
    { label: 'Mapping Portal External', align: 'center', name: 'mappingportalex' },
  ],
  columns: [
    // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
    { label: 'NO', dataField: 'number', width: 50, },
    { label: 'Pembangkit', dataField: 'parent_lokasi', width: 200, },
    { label: 'UP2B', dataField: 'up2b', width: 200, },
    { label: 'Unit Induk', dataField: 'id_unit_induk', width: 200, },
    { label: 'Kode Gardu Induk', dataField: 'kode_lokasi', width: 200, },
    { label: 'Nama Gardu Induk', dataField: 'nama_lokasi', width: 200, },
    { label: 'Jenis Layanan', dataField: 'jenis_layanan', width: 200, },
    { label: 'Jenis GI', dataField: 'jenis_gi', width: 200, },
    { label: 'Pemilik', dataField: 'pemilik', width: 200, },

    //  { label: 'Fungsi SCADA', dataField: 'fungsi_scada', width: 200, },
    //  { label: 'Unit Pembangkit', dataField: 'unit_pembangkit', width: 200, },


    { label: 'Path1', columnGroup: 'mappingscada', dataField: 'path1', width: 150, },
    { label: 'Path2', columnGroup: 'mappingscada', dataField: 'path2', width: 150, },
    { label: 'Path3', columnGroup: 'mappingscada', dataField: 'path3', width: 150, },
    { label: 'ID I(Arus)', columnGroup: 'mappingscada', dataField: 'id_i', width: 150, },
    { label: 'ID V(Tegangan)', columnGroup: 'mappingscada', dataField: 'id_v', width: 150, },
    { label: 'ID P(Daya)', columnGroup: 'mappingscada', dataField: 'id_p', width: 150, },

    { label: 'ID AMR', columnGroup: 'mappingamr', dataField: 'id_amr', width: 150, },

    { label: 'ID Portal EXT', columnGroup: 'mappingportalex', dataField: 'id_portal_ext', width: 150, },
    { label: 'URL Webservice', columnGroup: 'mappingportalex', dataField: 'url_webservice', width: 150, },

    { label: 'Rekon Beban', dataField: 'rekon_beban', width: 120, template: 'checkBox' },
    { label: 'Status Aktif', dataField: 'status_listrik', width: 80, template: 'checkBox' },
    { label: 'Alamat', dataField: 'alamat', width: 200, },
    { label: 'Latitude', dataField: 'lat', width: 200, },
    { label: 'Longitude', dataField: 'lon', width: 200, },
  ],
});



export const TRAFO_GI = () => {
  return [
    ...NO(),
    { Header: 'Gardu Induk', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Trafo', accessor: 'nama', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Coverage', accessor: 'coverage', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'No Urut Cell', accessor: 'no_urut', minWidth: '120px', show: true, disableFilters: true, },
    { Header: 'Kapasitas (MVA)', accessor: 'kapasitas', minWidth: '160px', show: true, disableFilters: true, },
    { Header: 'Sub Sistem', accessor: 'nama_sub_sistem', minWidth: '180px', show: true, disableFilters: true, },
    // { Header: 'Pemilik', accessor: 'pemilik', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Jenis Layanan', accessor: 'jenis_layanan', minWidth: '120px', show: true, disableFilters: true, },
    // { Header: 'I Max', accessor: 'i_max', minWidth: '100px', show: true, disableFilters: true, },
    // { Header: 'Ration CT', accessor: 'ratio_ct', minWidth: '100px', show: true, disableFilters: true, },
    // { Header: 'Ration TV', accessor: 'ratio_vt', minWidth: '100px', show: true, disableFilters: true, },
    // { Header: 'FK Meter', accessor: 'fk_meter', minWidth: '100px', show: true, disableFilters: true, },
    // { Header: 'FK Meter Pembanding', accessor: 'fk_meter_pembanding', minWidth: '150px', show: true, disableFilters: true, },
    // { Header: 'Primer Tegangan Max', accessor: 'primer_tegangan_max', minWidth: '150px', show: true, disableFilters: true, },
    // { Header: 'Primer Tegangan min', accessor: 'primer_tegangan_min', minWidth: '150px', show: true, disableFilters: true, },
    // { Header: 'Sekunder Tegangan max', accessor: 'sekunder_tegangan_max', minWidth: '150px', show: true, disableFilters: true, },
    // { Header: 'Sekunder Tegangan min', accessor: 'sekunder_tegangan_min', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Teg. Primer (kV)', accessor: 'def_pengukuran_teg_primer', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Teg. Sekunder (kV)', accessor: 'def_pengukuran_teg_sekunder', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'COS PHI', accessor: 'def_nilai_cosq', minWidth: '90px', show: true, disableFilters: true, },
    { Header: 'Sinkron Data', accessor: 'sinkron_data', minWidth: '120px', show: true, disableFilters: true, },

    {
      Header: 'Mapping SCADA', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'ID I(Arus)', accessor: 'id_i', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'ID V(Tegangan)', accessor: 'id_v', minWidth: '140px', show: true, disableFilters: true, },
        { Header: 'ID P(Daya)', accessor: 'id_p', minWidth: '120px', show: true, disableFilters: true, },
      ]
    },
    {
      Header: 'Mapping AMR', accessor: '', minWidth: '150px', show: true, disableFilters: true, columns: [
        { Header: 'ID AMR', accessor: 'id_amr', minWidth: '150px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: 'Mapping Portal External', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'ID Portal EXT', accessor: 'id_portal_ext', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'URL Webservice', accessor: 'url_webservice', minWidth: '150px', show: true, disableFilters: true, },
      ]
    },
    { Header: 'Status Trafo', accessor: 'status_trafo', minWidth: '120px', show: true, disableFilters: true, },
    { Header: 'Rekon Beban', accessor: 'rekon_beban', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },

    // { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true, },
    // { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}
export const ZONE = () => {
  return [
    ...NO(),
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Penyulang', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Kode Recloser/OG', accessor: 'kode_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Nama Recloser/OG', accessor: 'nama', minWidth: '180px', show: true, disableFilters: true },
    { Header: 'Zona', accessor: 'zona', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Coverage', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Panjang Jaringan', accessor: 'panjang_jaringan', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis Jaringan', accessor: 'jenis_jaringan', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Status Penyulang', accessor: 'status_penyulang', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis Penyulang', accessor: 'jenis_peralatan', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Fungsi Lokasi', accessor: 'fungsi_lokasi', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Pemilik', accessor: 'pemilik', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Arus Max (A)', accessor: 'i_max', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Total Pelanggan', accessor: 'jumlah_pelanggan', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'UP3/UP2D', accessor: 'up3_1', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: true, },
    {
      Header: 'Mapping SCADA', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'ID I(Arus)', accessor: 'id_i', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'ID V(Tegangan)', accessor: 'id_v', minWidth: '140px', show: true, disableFilters: true, },
        { Header: 'ID P(Daya)', accessor: 'id_p', minWidth: '120px', show: true, disableFilters: true, },
      ]
    },
    {
      Header: 'Mapping AMR', accessor: '', minWidth: '150px', show: true, disableFilters: true, columns: [
        { Header: 'ID AMR', accessor: 'id_amr', minWidth: '150px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: 'Mapping Portal External', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'ID Portal EXT', accessor: 'id_portal_ext', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'URL Webservice', accessor: 'url_webservice', minWidth: '150px', show: true, disableFilters: true, },
      ]
    },
    { Header: 'Rekon Beban', accessor: 'rekon_beban', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const ZONE_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'parent_lokasi', type: 'string' },
      { name: 'kode_lokasi', type: 'string' },
      { name: 'nama_lokasi', type: 'string' },
      { name: 'zona', type: 'string' },
      // { name: 'zone', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'panjang_jaringan', type: 'string' },
      { name: 'jenis_jaringan', type: 'string' },
      { name: 'jenis_peralatan', type: 'string' },
      { name: 'status_penyulang', type: 'string' },
      { name: 'fungsi_lokasi', type: 'string' },
      { name: 'pemilik', type: 'string' },
      { name: 'i_max', type: 'string' },
      { name: 'jumlah_pelanggan', type: 'string' },
      { name: 'uid', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'ulp_1', type: 'string' },
      { name: 'id_i', type: 'string' },
      { name: 'id_v', type: 'string' },
      { name: 'id_p', type: 'string' },
      { name: 'id_amr', type: 'string' },
      { name: 'id_portal_ext', type: 'string' },
      { name: 'url_webservice', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'rekon_beban', type: 'string' },
      { name: 'status_listrik', type: 'string' },

    ],
    columngroups: [
      { text: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
      { text: 'Mapping AMR', align: 'center', name: 'mappingamr' },
      { text: 'Mapping Portal External', align: 'center', name: 'mappingportalex' },
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Gardu Induk', datafield: 'gardu_induk', width: 200, editable: false, },
      { text: 'Penyulang', datafield: 'parent_lokasi', width: 200, editable: false, },
      { text: 'Kode Recloser/OG', datafield: 'kode_lokasi', width: 200, editable: false, },
      { text: 'Nama Recloser/OG', datafield: 'nama_lokasi', width: 200, editable: false, },
      { text: 'Zona', datafield: 'zona', width: 200, editable: false, },
      { text: 'Coverage', datafield: 'alamat', width: 200, editable: false, },
      { text: 'Panjang Jaringan', datafield: 'panjang_jaringan', width: 200, editable: false, },
      { text: 'Jenis Jaringan', datafield: 'jenis_jaringan', width: 200, editable: false, },
      { text: 'Status Penyulang', datafield: 'status_penyulang', width: 200, editable: false, },
      { text: 'Jenis Penyulang', datafield: 'jenis_penyulang', width: 200, editable: false, },
      { text: 'Jenis Peralatan', datafield: 'jenis_peralatan', width: 200, editable: false, },
      { text: 'Fungsi Lokasi', datafield: 'fungsi_lokasi', width: 200, editable: false, },
      { text: 'Pemilik', datafield: 'pemilik', width: 200, editable: false, },
      // { text: 'Pemilik', datafield: 'pemilik', width: 200, editable: false, },
      { text: 'Arus Max (A)', datafield: 'i_max', width: 200, editable: false, },
      { text: 'Total Pelanggan', datafield: 'jumlah_pelanggan', width: 200, editable: false, },
      { text: 'Unit Induk', datafield: 'uid', width: 200, editable: false, },
      { text: 'UP3', datafield: 'up3_1', width: 200, editable: false, },
      { text: 'ULP', datafield: 'ulp_1', width: 200, editable: false, },

      { text: 'Path1', columngroup: 'mappingscada', datafield: 'path1', width: 150, editable: false, },
      { text: 'Path2', columngroup: 'mappingscada', datafield: 'path2', width: 150, editable: false, },
      { text: 'Path3', columngroup: 'mappingscada', datafield: 'path3', width: 150, editable: false, },
      { text: 'ID I(Arus)', columngroup: 'mappingscada', datafield: 'id_i', width: 150, editable: false, },
      { text: 'ID V(Tegangan)', columngroup: 'mappingscada', datafield: 'id_v', width: 150, editable: false, },
      { text: 'ID P(Daya)', columngroup: 'mappingscada', datafield: 'id_p', width: 150, editable: false, },

      { text: 'ID AMR', columngroup: 'mappingamr', datafield: 'id_amr', width: 150, editable: false, },

      { text: 'ID Portal EXT', columngroup: 'mappingportalex', datafield: 'id_portal_ext', width: 150, editable: false, },
      { text: 'URL Webservice', columngroup: 'mappingportalex', datafield: 'url_webservice', width: 150, editable: false, },

      { text: 'Rekon Beban', datafield: 'rekon_beban', width: 100, editable: false, columntype: 'checkbox', filtertype: 'bool' },
      { text: 'Status Aktif', datafield: 'status_listrik', width: 80, editable: false, columntype: 'checkbox', filtertype: 'bool' },

    ]
  }
}
export const ZONE_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'parent_lokasi', type: 'string' },
      { name: 'kode_lokasi', type: 'string' },
      { name: 'nama_lokasi', type: 'string' },
      { name: 'zona', type: 'string' },
      { name: 'zone', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'panjang_jaringan', type: 'string' },
      { name: 'jenis_jaringan', type: 'string' },
      { name: 'jenis_peralatan', type: 'string' },
      { name: 'status_penyulang', type: 'string' },
      { name: 'fungsi_lokasi', type: 'string' },
      { name: 'id_pemilik', type: 'string' },
      { name: 'i_max', type: 'string' },
      { name: 'jumlah_pelanggan', type: 'string' },
      { name: 'uid', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'ulp_1', type: 'string' },
      { name: 'id_i', type: 'string' },
      { name: 'id_v', type: 'string' },
      { name: 'id_p', type: 'string' },
      { name: 'id_amr', type: 'string' },
      { name: 'id_portal_ext', type: 'string' },
      { name: 'url_webservice', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'rekon_beban', type: 'string' },
      { name: 'status_listrik', type: 'string' },

    ],
    columnGroups: [
      { label: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
      { label: 'Mapping AMR', align: 'center', name: 'mappingamr' },
      { label: 'Mapping Portal External', align: 'center', name: 'mappingportalex' },
    ],
    columns: [
      // { label: 'trans_id_kinerja', dataField: 'trans_id_kinerja', width: 120, editable: false, },
      { label: 'NO', dataField: 'number', width: 50 },
      { label: 'Gardu Induk', dataField: 'gardu_induk', width: 200 },
      { label: 'Penyulang', dataField: 'parent_lokasi', width: 200 },
      { label: 'Kode Recloser/OG', dataField: 'kode_lokasi', width: 200 },
      { label: 'Nama Recloser/OG', dataField: 'nama_lokasi', width: 200 },
      { label: 'Zona', dataField: 'zona', width: 200 },
      { label: 'Coverage', dataField: 'alamat', width: 200 },
      { label: 'Panjang Jaringan', dataField: 'panjang_jaringa n', width: 200 },
      { label: 'Jenis Jaringan', dataField: 'jenis_jaringan', width: 200 },
      { label: 'Jenis Pemutus', dataField: 'status_penyulang', width: 200 },
      // { label: 'Jenis Penyulang', dataField: 'jenis_peralatan', width: 200 },
      { label: 'Fungsi Lokasi', dataField: 'fungsi_lokasi', width: 200 },
      // { label: 'Pemilik', dataField: 'pemilik', width: 200 },
      // { label: 'Arus Max (A)', dataField: 'i_max', width: 200 },
      // { label: 'Total Pelanggan', dataField: 'jumlah_pelanggan', width: 200 },
      // { label: 'Unit Induk', dataField: 'uid', width: 200 },
      { label: 'UP3', dataField: 'up3_1', width: 200 },
      { label: 'ULP', dataField: 'ulp_1', width: 200 },

      { label: 'Path1', columnGroup: 'mappingscada', dataField: 'path1', width: 150 },
      { label: 'Path2', columnGroup: 'mappingscada', dataField: 'path2', width: 150 },
      { label: 'Path3', columnGroup: 'mappingscada', dataField: 'path3', width: 150 },
      { label: 'ID I(Arus)', columnGroup: 'mappingscada', dataField: 'id_i', width: 150 },
      { label: 'ID V(Tegangan)', columnGroup: 'mappingscada', dataField: 'id_v', width: 150 },
      { label: 'ID P(Daya)', columnGroup: 'mappingscada', dataField: 'id_p', width: 150 },

      { label: 'ID AMR', columnGroup: 'mappingamr', dataField: 'id_amr', width: 150 },

      { label: 'ID Portal EXT', columnGroup: 'mappingportalex', dataField: 'id_portal_ext', width: 150 },
      { label: 'URL Webservice', columnGroup: 'mappingportalex', dataField: 'url_webservice', width: 150 },

      { label: 'Rekon Beban', dataField: 'rekon_beban', width: 100, template: 'checkBox' },
      { label: 'Status Aktif', dataField: 'status_listrik', width: 80, template: 'checkBox' },

    ]
  }
}

export const SECTION = () => {
  return [
    ...NO(),
    { Header: 'Nama Section', accessor: 'nama', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Coverage', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Panjang Jaringan', accessor: 'panjang_jaringan', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Trafo GI', accessor: 'trafo_gi', minWidth: '150px', show: true, disableFilters: true },

    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Zone', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'UP3', accessor: 'up3_1', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: true, },
    // { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true, },
    // { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const SECTION_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'panjang_jaringan', type: 'string' },
      { name: 'status_listrik', type: 'string' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'trafo_gi', type: 'string' },
      { name: 'penyulang', type: 'string' },
      { name: 'parent_lokasi', type: 'string' },
      { name: 'unit_induk', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'ulp_1', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },



    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Nama Section', datafield: 'nama', width: '10%', editable: false, },
      // { text: 'Path1', datafield: 'path1', width: 150, editable: false, },
      // { text: 'Path2', datafield: 'path2', width: 150, editable: false, },
      // { text: 'Path3', datafield: 'path3', width: 150, editable: false, },
      { text: 'Gardu Induk', datafield: 'gardu_induk', width: '10%', editable: false, },
      { text: 'Trafo GI', datafield: 'trafo_gi', width: '10%', editable: false, },
      { text: 'Penyulang', datafield: 'penyulang', width: '10%', editable: false, },
      { text: 'Zone', datafield: 'parent_lokasi', width: '10%', editable: false, },
      { text: 'Coverage', datafield: 'alamat', width: '10%', editable: false, },
      { text: 'Panjang Jaringan', datafield: 'panjang_jaringan', width: '5%', editable: false, },
      { text: 'Unit Induk', datafield: 'unit_induk', width: '8%', editable: false, },
      { text: 'UP3', datafield: 'up3_1', width: '8%', editable: false, },
      { text: 'ULP', datafield: 'ulp_1', width: '7%', editable: false, },
      { text: 'Status Aktif', datafield: 'status_listrik', width: '9%', editable: false, columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
};
export const SECTION_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'panjang_jaringan', type: 'string' },
      { name: 'status_listrik', type: 'string' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'trafo_gi', type: 'string' },
      { name: 'penyulang', type: 'string' },
      { name: 'parent_lokasi', type: 'string' },
      { name: 'unit_induk', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'ulp_1', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },



    ],
    columnGroups: [
      {
        label: 'Mapping SCADA',
        align: 'center',
        name: 'mappingscada'
      },
      // {
      //   label: 'Mapping AMR',
      //   align: 'center',
      //   name: 'mappingamr'
      // },
      // {
      //   label: 'Mapping Portal External',
      //   align: 'center',
      //   name: 'mappingportalex'
      // }
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { label: 'NO', dataField: 'number', width: 50 },
      { label: 'Nama Section', dataField: 'nama', width: 150 },
      { label: 'Coverage', dataField: 'alamat', width: 150 },
      { label: 'Panjang Jaringan', dataField: 'panjang_jaringan', width: 150 },
      { label: 'Gardu Induk', dataField: 'gardu_induk', width: 150 },
      { label: 'Trafo GI', dataField: 'trafo_gi', width: 150 },
      { label: 'Penyulang', dataField: 'penyulang', width: 150 },
      { label: 'Zone', dataField: 'parent_lokasi', width: 150 },
      { label: 'Unit Induk', dataField: 'unit_induk', width: 180 },
      { label: 'UP3', dataField: 'up3_1', width: 180 },
      { label: 'ULP', dataField: 'ulp_1', width: 180 },
      { label: 'Path1', columnGroup: 'mappingscada', dataField: 'path1', width: 150, },
      { label: 'Path2', columnGroup: 'mappingscada', dataField: 'path2', width: 150, },
      { label: 'Path3', columnGroup: 'mappingscada', dataField: 'path3', width: 150, },
      { label: 'Status Aktif', dataField: 'status_listrik', width: 80, template: 'checkBox' },

    ],
  };
};


export const SEGMENT = () => {
  return [
    ...NO(),
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Kode Gardu', accessor: 'kode_gardu', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Coverage', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Panjang Jaringan', accessor: 'panjang_jaringan', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Jumlah Pelanggan', accessor: 'jumlah_pelanggan', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Total Daya (kVa)', accessor: 'kva', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },
    // { Header: 'Unit Pembangkit', accessor: 'unit_pembangkit', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Pembangkit', accessor: 'pembangkit', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Trafo GI', accessor: 'trafo_gi', minWidth: '150px', show: true, disableFilters: true },

    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Zone', accessor: 'zone', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Section', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'UP3', accessor: 'up3_1', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: true, },
    // { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true, },
    // { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const SEGMENT_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'kode_gardu', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'panjang_jaringan', type: 'string' },
      { name: 'status_listrik', type: 'string' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'trafo_gi', type: 'string' },
      { name: 'penyulang', type: 'string' },
      { name: 'zone', type: 'string' },
      { name: 'parent_lokasi', type: 'string' },
      { name: 'uid', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'ulp_1', type: 'string' },
      { name: 'id_i', type: 'string' },
      { name: 'id_v', type: 'string' },
      { name: 'id_p', type: 'string' },
      { name: 'id_amr', type: 'string' },
      { name: 'id_portal_ext', type: 'string' },
      { name: 'url_webservice', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
    ],
    columngroups: [
      { text: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
      { text: 'Mapping AMR', align: 'center', name: 'mappingamr' },
      { text: 'Mapping Portal External', align: 'center', name: 'mappingexternal' }
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Nama', datafield: 'nama', width: 150, editable: false, },
      { text: 'Kode Gardu', datafield: 'kode_gardu', width: 150, editable: false, },
      { text: 'Gardu Induk', datafield: 'gardu_induk', width: 150, editable: false, },
      { text: 'Trafo GI', datafield: 'trafo_gi', width: 150, editable: false, },
      { text: 'Penyulang', datafield: 'penyulang', width: 150, editable: false, },
      { text: 'Zone', datafield: 'zone', width: 150, editable: false, },
      { text: 'Section', datafield: 'parent_lokasi', width: 150, editable: false, },
      { text: 'Coverage', datafield: 'alamat', width: 150, editable: false, },
      { text: 'Panjang Jaringan', datafield: 'panjang_jaringan', width: 150, editable: false, },
      // { text: 'Path1', datafield: 'path1', width: 150, editable: false, },
      // { text: 'Path2', datafield: 'path2', width: 150, editable: false, },
      // { text: 'Path3', datafield: 'path3', width: 150, editable: false, },
      { text: 'Unit Induk', datafield: 'unit_induk', width: 180, editable: false, },
      { text: 'UP3', datafield: 'up3_1', width: 180, editable: false, },
      { text: 'ULP', datafield: 'ulp_1', width: 180, editable: false, },
      { text: 'Path1', columngroup: 'mappingscada', datafield: 'path1', width: 150, editable: false, },
      { text: 'Path2', columngroup: 'mappingscada', datafield: 'path2', width: 150, editable: false, },
      { text: 'Path3', columngroup: 'mappingscada', datafield: 'path3', width: 150, editable: false, },
      { text: 'ID I(Arus)', columngroup: 'mappingscada', datafield: 'id_i', width: 150, editable: false, },
      { text: 'ID V(Tegangan)', columngroup: 'mappingscada', datafield: 'id_v', width: 150, editable: false, },
      { text: 'ID P(Daya)', columngroup: 'mappingscada', datafield: 'id_p', width: 150, editable: false, },
      { text: 'ID AMR', columngroup: 'mappingamr', datafield: 'id_amr', width: 150, editable: false, },
      { text: 'ID Portal EXT', columngroup: 'mappingportalex', datafield: 'id_portal_ext', width: 150, editable: false, },
      { text: 'URL Webservice', columngroup: 'mappingportalex', datafield: 'url_webservice', width: 150, editable: false, },
      { text: 'Status Aktif', datafield: 'status_listrik', width: 80, editable: false, columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
};
export const SEGMENT_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'kode_gardu', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'panjang_jaringan', type: 'string' },
      { name: 'status_listrik', type: 'string' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'trafo_gi', type: 'string' },
      { name: 'penyulang', type: 'string' },
      { name: 'zone', type: 'string' },
      { name: 'parent_lokasi', type: 'string' },
      { name: 'uid', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'ulp_1', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },



    ],
    columns: [
      // { label: 'trans_id_kinerja', dataField: 'trans_id_kinerja', width: 120, editable: false, },
      { label: 'NO', dataField: 'number', width: 50 },
      { label: 'Nama', dataField: 'nama', width: 150 },
      { label: 'Kode Gardu', dataField: 'kode_gardu', width: 150 },
      { label: 'Coverage', dataField: 'alamat', width: 150 },
      { label: 'Panjang Jaringan', dataField: 'panjang_jaringan', width: 150 },
      { label: 'Path1', dataField: 'path1', width: 150 },
      { label: 'Path2', dataField: 'path2', width: 150 },
      { label: 'Path3', dataField: 'path3', width: 150 },
      { label: 'Status Aktif', dataField: 'status_listrik', width: 80, template: 'checkBox' },
      { label: 'Gardu Induk', dataField: 'gardu_induk', width: 150 },
      { label: 'Trafo GI', dataField: 'trafo_gi', width: 150 },
      { label: 'Penyulang', dataField: 'penyulang', width: 150 },
      { label: 'Zone', dataField: 'zone', width: 150 },
      { label: 'Section', dataField: 'parent_lokasi', width: 150 },
      { label: 'Unit Induk', dataField: 'unit_induk', width: 180 },
      { label: 'UP3', dataField: 'up3_1', width: 180 },
      { label: 'ULP', dataField: 'ulp_1', width: 180 },

    ],
  };
};

export const PENYULANG = () => {
  return [
    ...NO(),
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Trafo/Pembangkit/GH', accessor: 'parent_lokasi', minWidth: '90px', show: true, disableFilters: true },
    { Header: 'Kode Penyulang', accessor: 'kode_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Nama Penyulang', accessor: 'nama', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Coverage', accessor: 'coverage', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Panjang Jaringan', accessor: 'panjang_jaringan', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'No Urut Cell', accessor: 'no_urut', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Jenis Jaringan', accessor: 'jenis_jaringan', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Jenis Penyulang', accessor: 'jenis_peralatan', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Status Penyulang', accessor: 'status_penyulang', minWidth: '180px', show: true, disableFilters: true, },

    { Header: 'Unit Induk', accessor: 'uid', minWidth: '250px', show: true, disableFilters: true, },
    { Header: 'UP3', accessor: 'up3_1', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'Jumlah Gardu', accessor: 'count_gardu', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'I Max (A)', accessor: 'i_max', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Total Pelanggan', accessor: 'jumlah_pelanggan', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'DCC', accessor: 'dcc', minWidth: '100px', show: true, disableFilters: true, },
    // { Header: 'Pemilik', accessor: 'pemilik', minWidth: '100px', show: true, disableFilters: true, },

    { Header: 'Fungsi Lokasi', accessor: 'fungsi_lokasi', minWidth: '150px', show: true, disableFilters: true, },
    {
      Header: 'Mapping SCADA', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'ID I(Arus)', accessor: 'id_i', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'ID V(Tegangan)', accessor: 'id_v', minWidth: '140px', show: true, disableFilters: true, },
        { Header: 'ID P(Daya)', accessor: 'id_p', minWidth: '120px', show: true, disableFilters: true, },
      ]
    },
    {
      Header: 'Mapping AMR', accessor: '', minWidth: '150px', show: true, disableFilters: true, columns: [
        { Header: 'ID AMR', accessor: 'id_amr', minWidth: '150px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: 'Mapping Portal External', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'ID Portal EXT', accessor: 'id_portal_ext', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'URL Webservice', accessor: 'url_webservice', minWidth: '150px', show: true, disableFilters: true, },
      ]
    },

    { Header: 'Rekon Beban', accessor: 'rekon_beban', minWidth: '120px', show: true, disableFilters: true, },
    { Header: 'Status', accessor: 'status', minWidth: '50px', show: true, disableFilters: true, },

    ...ACTION_COLUMN(),
  ]
}

export const PENYULANG_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'parent_lokasi', type: 'string' },
      { name: 'kode_lokasi', type: 'string' },
      { name: 'nama', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'panjang_jaringan', type: 'string' },
      { name: 'jenis_jaringan', type: 'string' },
      { name: 'jenis_peralatan', type: 'string' },
      { name: 'status_penyulang', type: 'string' },
      { name: 'unit_induk', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'ulp_1', type: 'string' },
      { name: 'count_gardu', type: 'string' },
      { name: 'i_max', type: 'string' },
      { name: 'jumlah_pelanggan', type: 'string' },
      { name: 'dcc', type: 'string' },
      { name: 'id_pemilik', type: 'string' },
      { name: 'fungsi_lokasi', type: 'string' },
      { name: 'id_i', type: 'string' },
      { name: 'id_v', type: 'string' },
      { name: 'id_p', type: 'string' },
      { name: 'id_amr', type: 'string' },
      { name: 'id_portal_ext', type: 'string' },
      { name: 'url_webservice', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'rekon_beban', type: 'string' },
      { name: 'status_listrik', type: 'string' },
      { name: 'unit_induk', type: 'string' },

    ],
    columngroups: [
      { text: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
      { text: 'Mapping AMR', align: 'center', name: 'mappingamr' },
      { text: 'Mapping Portal External', align: 'center', name: 'mappingportalex' },
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Kode Penyulang', datafield: 'kode_lokasi', width: 200, editable: false, },
      { text: 'Nama Penyulang', datafield: 'nama', width: 200, editable: false, },
      { text: 'Gardu Induk', datafield: 'gardu_induk', width: 200, editable: false, },
      { text: 'Trafo/Pembangkit/GH', datafield: 'parent_lokasi', width: 200, editable: false, },
      { text: 'Alamat', datafield: 'alamat', width: 200, editable: false, },
      { text: 'Panjang Jaringan', datafield: 'panjang_jaringan', width: 200, editable: false, },
      { text: 'Jenis Jaringan', datafield: 'jenis_jaringan', width: 200, editable: false, },
      { text: 'Jenis Peralatan', datafield: 'jenis_peralatan', width: 200, editable: false, },
      { text: 'Status Penyulang', datafield: 'status_penyulang', width: 200, editable: false, },
      { text: 'Jenis Penyulang', datafield: 'jenis_penyulang', width: 200, editable: false, },
      { text: 'Unit Induk', datafield: 'unit_induk', width: 200, editable: false, },
      { text: 'UP3', datafield: 'up3_1', width: 200, editable: false, },
      { text: 'ULP', datafield: 'ulp_1', width: 200, editable: false, },
      { text: 'Jumlah Gardu', datafield: 'count_gardu', width: 200, editable: false, },
      { text: 'I Max (A)', datafield: 'i_max', width: 200, editable: false, },
      { text: 'Total Pelanggan', datafield: 'jumlah_pelanggan', width: 200, editable: false, },
      { text: 'DCC', datafield: 'dcc', width: 200, editable: false, },
      // { text: 'Pemilik', datafield: 'pemilik', width: 200, editable: false, },
      { text: 'Fungsi Lokasi', datafield: 'fungsi_lokasi', width: 200, editable: false, },

      { text: 'Path1', columngroup: 'mappingscada', datafield: 'path1', width: 150, editable: false, },
      { text: 'Path2', columngroup: 'mappingscada', datafield: 'path2', width: 150, editable: false, },
      { text: 'Path3', columngroup: 'mappingscada', datafield: 'path3', width: 150, editable: false, },
      { text: 'ID I(Arus)', columngroup: 'mappingscada', datafield: 'id_i', width: 150, editable: false, },
      { text: 'ID V(Tegangan)', columngroup: 'mappingscada', datafield: 'id_v', width: 150, editable: false, },
      { text: 'ID P(Daya)', columngroup: 'mappingscada', datafield: 'id_p', width: 150, editable: false, },

      { text: 'ID AMR', columngroup: 'mappingamr', datafield: 'id_amr', width: 150, editable: false, },

      { text: 'ID Portal EXT', columngroup: 'mappingportalex', datafield: 'id_portal_ext', width: 150, editable: false, },
      { text: 'URL Webservice', columngroup: 'mappingportalex', datafield: 'url_webservice', width: 150, editable: false, },

      { text: 'Rekon Beban', datafield: 'rekon_beban', width: 100, editable: false, columntype: 'checkbox', filtertype: 'bool' },
      { text: 'Status', datafield: 'status_listrik', width: 80, editable: false, columntype: 'checkbox', filtertype: 'bool' },

    ]
  }
}


export const PENYULANG_MODAL_COLUMN = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true },
    { Header: 'Trafo GI', accessor: 'parent', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis Jaringan', accessor: 'jenis_jaringan', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Status Penyulang', accessor: 'status_penyulang', minWidth: '180px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}
export const GARDU_HUBUNG = () => {
  return [
    ...NO(),
    { Header: 'GI/Penyulang', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Kode Gardu Hubung', accessor: 'kode', minWidth: '200px', show: true, disableFilters: true },
    { Header: 'Nama Gardu Hubung', accessor: 'nama', minWidth: '200px', show: true, disableFilters: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis Gardu', accessor: 'jenis_gardu', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Fungsi SCADA', accessor: 'fungsi_scada', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true, }, {
      Header: 'Mapping SCADA', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'ID I(Arus)', accessor: 'id_i', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'ID V(Tegangan)', accessor: 'id_v', minWidth: '140px', show: true, disableFilters: true, },
        { Header: 'ID P(Daya)', accessor: 'id_p', minWidth: '120px', show: true, disableFilters: true, },
      ]
    },
    {
      Header: 'Mapping AMR', accessor: '', minWidth: '150px', show: true, disableFilters: true, columns: [
        { Header: 'ID AMR', accessor: 'id_amr', minWidth: '150px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: 'Mapping Portal External', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'ID Portal EXT', accessor: 'id_portal_ext', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'URL Webservice', accessor: 'url_webservice', minWidth: '150px', show: true, disableFilters: true, },
      ]
    },
    { Header: 'Rekon Beban', accessor: 'rekon_beban', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}
export const GARDU_HUBUNG_COLUMNS_JQ = () => {
  return {
    datafields: [
      { name: 'parent_lokasi', type: 'string' },
      { name: 'kode', type: 'string' },
      { name: 'nama', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'jenis_gardu', type: 'string' },
      { name: 'fungsi_scada', type: 'string' },
      { name: 'lat', type: 'string' },
      { name: 'lon', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'id_i', type: 'string' },
      { name: 'id_v', type: 'string' },
      { name: 'id_p', type: 'string' },
      { name: 'id_amr', type: 'string' },
      { name: 'id_portal_ext', type: 'string' },
      { name: 'url_webservice', type: 'string' },
      { name: 'rekon_beban', type: 'string' },
      { name: 'status', type: 'string' },


    ],
    columngroups: [
      { text: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
      { text: 'Mapping AMR', align: 'center', name: 'mappingamr' },
      { text: 'Mapping Portal External', align: 'center', name: 'mappingexternal' }
    ],
    columns: [
      { text: 'No', datafield: 'number', width: 40 },
      { text: 'GI/Penyulang', datafield: 'parent_lokasi', width: 150 },
      { text: 'Kode Gardu Hubung', datafield: 'kode', width: 150 },
      { text: 'Nama Gardu Hubung', datafield: 'nama', width: 200 },
      { text: 'Alamat', datafield: 'alamat', width: 150 },
      { text: 'Jenis Gardu', datafield: 'jenis_gardu', width: 100 },
      { text: 'Fungsi Scada', datafield: 'fungsi_scada', width: 100 },
      { text: 'Latitude', datafield: 'lat', width: 100 },
      { text: 'Longitude', datafield: 'lon', width: 100 },
      { text: 'Path1', datafield: 'path1', columngroup: 'mappingscada', width: 100 },
      { text: 'Path2', datafield: 'path2', columngroup: 'mappingscada', width: 100 },
      { text: 'Path3', datafield: 'path3', columngroup: 'mappingscada', width: 100 },
      { text: 'ID I(Arus)', datafield: 'id_i', columngroup: 'mappingscada', width: 100 },
      { text: 'ID V(Tegangan)', datafield: 'id_v', columngroup: 'mappingscada', width: 100 },
      { text: 'ID P(Daya)', datafield: 'id_p', columngroup: 'mappingscada', width: 100 },
      { text: 'ID AMR', datafield: 'id_amr', columngroup: 'mappingamr', width: 100 },
      { text: 'ID Portal EXT', datafield: 'id_portal_ext', columngroup: 'mappingexternal', width: 100 },
      { text: 'URL Webservice', datafield: 'url_webservice', columngroup: 'mappingexternal', width: 100 },
      { text: 'Rekon Beban', datafield: 'rekon_beban', width: 100, columntype: 'checkbox', filtertype: 'bool' },
      { text: 'Status Aktif', datafield: 'status', width: 80, columntype: 'checkbox', filtertype: 'bool' },



    ],
  };
}
export const GARDU_HUBUNG_DETAIL = () => {
  return [
    ...NO(),
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Jenis', accessor: 'id_ref_lokasi_child', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}
export const GARDU_DISTRIBUSI = () => {
  return [
    ...NO(),
    { Header: 'Kode Gardu', accessor: 'kode_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Nama Gardu', accessor: 'nama', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '300px', show: true, disableFilters: true },
    // { Header: 'Coverage', accessor: 'coverage', minWidth: '300px', show: true, disableFilters: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '120px', show: true, disableFilters: true, },
    { Header: 'Jenis Gardu', accessor: 'jenis_gardu', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Fungsi SCADA', accessor: 'fungsi_scada', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Trafo GI', accessor: 'trafo_gi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Zone', accessor: 'zone', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Section', accessor: 'section', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Segment', accessor: 'segment', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '200px', show: true, disableFilters: true, },
    { Header: 'UP3', accessor: 'up3_1', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'Latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const GARDU_DISTRIBUSI_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'kode_lokasi', type: 'string' },
      { name: 'nama', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'no_tiang', type: 'string' },
      { name: 'jenis_gardu', type: 'string' },
      { name: 'fungsi_scada', type: 'string' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'trafo_gi', type: 'string' },
      { name: 'penyulang', type: 'string' },
      { name: 'zone', type: 'string' },
      { name: 'section', type: 'string' },
      { name: 'segment', type: 'string' },
      { name: 'unit_induk', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'ulp_1', type: 'string' },
      { name: 'lat', type: 'string' },
      { name: 'lon', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'status_listrik', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Kode Gardu', datafield: 'kode_lokasi', width: 150, editable: false, },
      { text: 'Nama Gardu', datafield: 'nama', width: 150, editable: false, },
      { text: 'Alamat', datafield: 'alamat', width: 180, editable: false, },
      { text: 'No Tiang', datafield: 'no_tiang', width: 150, editable: false, },
      { text: 'Jenis Gardu', datafield: 'jenis_gardu', width: 100, editable: false, },
      { text: 'Fungsi SCADA', datafield: 'fungsi_scada', width: 150, editable: false, },
      { text: 'Gardu Induk', datafield: 'gardu_induk', width: 150, editable: false, },
      { text: 'Trafo GI', datafield: 'trafo_gi', width: 150, editable: false, },
      { text: 'Penyulang', datafield: 'penyulang', width: 150, editable: false, },
      { text: 'Zone', datafield: 'zone', width: 150, editable: false, },
      { text: 'Section', datafield: 'section', width: 150, editable: false, },
      { text: 'Segment', datafield: 'segment', width: 150, editable: false, },
      { text: 'Unit Induk', datafield: 'unit_induk', width: 180, editable: false, },
      { text: 'UP3', datafield: 'up3_1', width: 180, editable: false, },
      { text: 'ULP', datafield: 'ulp_1', width: 180, editable: false, },
      { text: 'Latitude', datafield: 'lat', width: 180, editable: false, },
      { text: 'Longitude', datafield: 'lon', width: 180, editable: false, },
      // { text: 'Path1', datafield: 'path1', width: 180, editable: false, },
      // { text: 'Path2', datafield: 'path2', width: 180, editable: false, },
      // { text: 'Path3', datafield: 'path3', width: 180, editable: false, },
      { text: 'Status Aktif', datafield: 'status_listrik', width: 80, editable: false, columntype: 'checkbox', filtertype: 'bool' },


    ],
  };
};

export const PENGAMANAN_SUTM = () => {
  return [
    ...NO(),
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Trafo GI', accessor: 'trafo_gi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Kode KP', accessor: 'kode', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Nama KP', accessor: 'nama', minWidth: '250px', show: true, disableFilters: true },
    { Header: 'Fungsi Lokasi', accessor: 'fungsi_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis Peralatan', accessor: 'jenis_peralatan', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Fungsi SCADA', accessor: 'fungsi_scada', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Zona', accessor: 'zona', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis Gardu', accessor: 'jenis_gardu', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Coverage', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Panjang Jaringan', accessor: 'panjang_jaringan', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Jumlah Pelanggan', accessor: 'jumlah_pelanggan', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Total Daya(kVA)', accessor: 'kva', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '200px', show: true, disableFilters: true },
    { Header: 'UP3/UP2D', accessor: 'up3_1', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: true, },
    // { Header: 'Pemilik', accessor: 'pemilik', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'Provinsi', accessor: 'provinsi', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'Kab/Kota', accessor: 'kab', minWidth: '200px', show: true, disableFilters: true, },
    { Header: 'Kecamatan', accessor: 'kec', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true, },
    {
      Header: 'Mapping SCADA', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'ID I(Arus)', accessor: 'id_i', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'ID V(Tegangan)', accessor: 'id_v', minWidth: '140px', show: true, disableFilters: true, },
        { Header: 'ID P(Daya)', accessor: 'id_p', minWidth: '120px', show: true, disableFilters: true, },
      ]
    },
    {
      Header: 'Mapping AMR', accessor: '', minWidth: '150px', show: true, disableFilters: true, columns: [
        { Header: 'ID AMR', accessor: 'id_amr', minWidth: '150px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: 'Mapping Portal External', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'ID Portal EXT', accessor: 'id_portal_ext', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'URL Webservice', accessor: 'url_webservice', minWidth: '150px', show: true, disableFilters: true, },
      ]
    },
    { Header: 'Rekon Beban', accessor: 'rekon_beban', minWidth: '120px', show: true, disableFilters: true, },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const KEYPOINT_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'trafo_gi', type: 'string' },
      { name: 'penyulang', type: 'string' },
      { name: 'kode', type: 'string' },
      { name: 'nama', type: 'string' },
      { name: 'fungsi_lokasi', type: 'string' },
      { name: 'jenis_peralatan', type: 'string' },
      { name: 'fungsi_scada', type: 'string' },
      { name: 'zona', type: 'string' },
      { name: 'jenis_gardu', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'panjang_jaringan', type: 'string' },
      { name: 'jumlah_pelanggan', type: 'string' },
      { name: 'kva', type: 'string' },
      { name: 'unit_induk', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'ulp_1', type: 'string' },
      { name: 'id_pemilik', type: 'string' },
      { name: 'provinsi', type: 'string' },
      { name: 'kab', type: 'string' },
      { name: 'kec', type: 'string' },
      { name: 'lat', type: 'string' },
      { name: 'lon', type: 'string' },
      { name: 'id_i', type: 'string' },
      { name: 'id_v', type: 'string' },
      { name: 'id_p', type: 'string' },
      { name: 'id_amr', type: 'string' },
      { name: 'id_portal_ext', type: 'string' },
      { name: 'url_webservice', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'rekon_beban', type: 'string' },
      { name: 'status_listrik', type: 'string' },

    ],
    columngroups: [
      { text: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
      { text: 'Mapping AMR', align: 'center', name: 'mappingamr' },
      { text: 'Mapping Portal External', align: 'center', name: 'mappingportalex' }
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Gardu Induk', datafield: 'gardu_induk', width: 200, editable: false, },
      { text: 'Trafo GI', datafield: 'trafo_gi', width: 200, editable: false, },
      { text: 'Penyulang', datafield: 'penyulang', width: 200, editable: false, },
      { text: 'Kode KP', datafield: 'kode', width: 200, editable: false, },
      { text: 'Nama KP', datafield: 'nama', width: 200, editable: false, },
      { text: 'Fungsi Lokasi', datafield: 'fungsi_lokasi', width: 200, editable: false, },
      { text: 'Jenis Peralatan', datafield: 'jenis_peralatan', width: 200, editable: false, },
      { text: 'Fungsi SCADA', datafield: 'fungsi_scada', width: 200, editable: false, },
      { text: 'Zona', datafield: 'zona', width: 200, editable: false, },
      { text: 'Jenis Gardu', datafield: 'jenis_gardu', width: 200, editable: false, },
      { text: 'Coverage', datafield: 'alamat', width: 200, editable: false, },
      { text: 'Panjang Jaringan', datafield: 'panjang_jaringan', width: 200, editable: false, },
      { text: 'Jumlah Pelanggan', datafield: 'jumlah_pelanggan', width: 200, editable: false, },
      { text: 'Total Daya(kVA)', datafield: 'kva', width: 200, editable: false, },
      { text: 'Unit Induk', datafield: 'unit_induk', width: 200, editable: false, },
      { text: 'UP3/UP2D', datafield: 'up3_1', width: 200, editable: false, },
      { text: 'ULP', datafield: 'ulp_1', width: 200, editable: false, },
      // { text: 'Pemilik', datafield: 'pemilik', width: 200, editable: false, },
      { text: 'Provinsi', datafield: 'provinsi', width: 200, editable: false, },
      { text: 'Kab/Kota', datafield: 'kab', width: 200, editable: false, },
      { text: 'Kecamatan', datafield: 'kec', width: 200, editable: false, },
      { text: 'latitude', datafield: 'lat', width: 200, editable: false, },
      { text: 'longitude', datafield: 'lon', width: 200, editable: false, },

      { text: 'Path1', columngroup: 'mappingscada', datafield: 'path1', width: 150, editable: false, },
      { text: 'Path2', columngroup: 'mappingscada', datafield: 'path2', width: 150, editable: false, },
      { text: 'Path3', columngroup: 'mappingscada', datafield: 'path3', width: 150, editable: false, },
      { text: 'ID I(Arus)', columngroup: 'mappingscada', datafield: 'id_i', width: 150, editable: false, },
      { text: 'ID V(Tegangan)', columngroup: 'mappingscada', datafield: 'id_v', width: 150, editable: false, },
      { text: 'ID P(Daya)', columngroup: 'mappingscada', datafield: 'id_p', width: 150, editable: false, },

      { text: 'ID AMR', columngroup: 'mappingamr', datafield: 'id_amr', width: 150, editable: false, },

      { text: 'ID Portal EXT', columngroup: 'mappingportalex', datafield: 'id_portal_ext', width: 150, editable: false, },
      { text: 'URL Webservice', columngroup: 'mappingportalex', datafield: 'url_webservice', width: 150, editable: false, },

      { text: 'Rekon Beban', datafield: 'rekon_beban', width: 100, editable: false, columntype: 'checkbox', filtertype: 'bool' },
      { text: 'Status Aktif', datafield: 'status_listrik', width: 80, editable: false, columntype: 'checkbox', filtertype: 'bool' }

    ]
  }
}
export const KEYPOINT_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'trafo_gi', type: 'string' },
      { name: 'penyulang', type: 'string' },
      { name: 'kode', type: 'string' },
      { name: 'nama', type: 'string' },
      { name: 'fungsi_lokasi', type: 'string' },
      { name: 'jenis_peralatan', type: 'string' },
      { name: 'fungsi_scada', type: 'string' },
      { name: 'zona', type: 'string' },
      { name: 'jenis_gardu', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'panjang_jaringan', type: 'string' },
      { name: 'jumlah_pelanggan', type: 'string' },
      { name: 'kva', type: 'string' },
      { name: 'uid', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'ulp_1', type: 'string' },
      { name: 'id_pemilik', type: 'string' },
      { name: 'provinsi', type: 'string' },
      { name: 'kab', type: 'string' },
      { name: 'kec', type: 'string' },
      { name: 'lat', type: 'string' },
      { name: 'lon', type: 'string' },
      { name: 'id_i', type: 'string' },
      { name: 'id_v', type: 'string' },
      { name: 'id_p', type: 'string' },
      { name: 'id_amr', type: 'string' },
      { name: 'id_portal_ext', type: 'string' },
      { name: 'url_webservice', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'rekon_beban', type: 'string' },
      { name: 'status_listrik', type: 'string' },

    ],
    columnGroups: [
      { label: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
      { label: 'Mapping AMR', align: 'center', name: 'mappingamr' },
      { label: 'Mapping Portal External', align: 'center', name: 'mappingportalex' }
    ],
    columns: [
      // { label: 'trans_id_kinerja', dataField: 'trans_id_kinerja', width: 120, editable: false, },
      { label: 'NO', dataField: 'number', width: 50 },
      { label: 'Gardu Induk', dataField: 'gardu_induk', width: 200 },
      { label: 'Trafo GI', dataField: 'trafo_gi', width: 200 },
      { label: 'Penyulang', dataField: 'penyulang', width: 200 },
      { label: 'Kode KP', dataField: 'kode', width: 200 },
      { label: 'Nama KP', dataField: 'nama', width: 200 },
      { label: 'Fungsi Lokasi', dataField: 'fungsi_lokasi', width: 200 },
      { label: 'Jenis Peralatan', dataField: 'jenis_peralatan', width: 200 },
      { label: 'Fungsi SCADA', dataField: 'fungsi_scada', width: 200 },
      { label: 'Zona', dataField: 'zona', width: 200 },
      { label: 'Jenis Gardu', dataField: 'jenis_gardu', width: 200 },
      { label: 'Coverage', dataField: 'alamat', width: 200 },
      { label: 'Panjang Jaringan', dataField: 'panjang_jaringan', width: 200 },
      { label: 'Jumlah Pelanggan', dataField: 'jumlah_pelanggan', width: 200 },
      { label: 'Total Daya(kVA)', dataField: 'kva', width: 200 },
      { label: 'Unit Induk', dataField: 'uid', width: 200 },
      { label: 'UP3/UP2D', dataField: 'up3_1', width: 200 },
      { label: 'ULP', dataField: 'ulp_1', width: 200 },
      // { label: 'Pemilik', dataField: 'pemilik', width: 200 },
      { label: 'Provinsi', dataField: 'provinsi', width: 200 },
      { label: 'Kab/Kota', dataField: 'kab', width: 200 },
      { label: 'Kecamatan', dataField: 'kec', width: 200 },
      { label: 'latitude', dataField: 'lat', width: 200 },
      { label: 'longitude', dataField: 'lon', width: 200 },

      { label: 'Path1', columnGroup: 'mappingscada', dataField: 'path1', width: 150 },
      { label: 'Path2', columnGroup: 'mappingscada', dataField: 'path2', width: 150 },
      { label: 'Path3', columnGroup: 'mappingscada', dataField: 'path3', width: 150 },
      { label: 'ID I(Arus)', columnGroup: 'mappingscada', dataField: 'id_i', width: 150 },
      { label: 'ID V(Tegangan)', columnGroup: 'mappingscada', dataField: 'id_v', width: 150 },
      { label: 'ID P(Daya)', columnGroup: 'mappingscada', dataField: 'id_p', width: 150 },

      { label: 'ID AMR', columnGroup: 'mappingamr', dataField: 'id_amr', width: 150 },

      { label: 'ID Portal EXT', columnGroup: 'mappingportalex', dataField: 'id_portal_ext', width: 150 },
      { label: 'URL Webservice', columnGroup: 'mappingportalex', dataField: 'url_webservice', width: 150 },

      { label: 'Rekon Beban', dataField: 'rekon_beban', width: 100, template: 'checkBox' },
      { label: 'Status Aktif', dataField: 'status_listrik', width: 80, template: 'checkBox' }

    ]
  }
}

export const TRAFO_GDISTRIBUSI = () => {
  return [
    ...NO(),
    { Header: 'Nama Trafo GD', accessor: 'nama', minWidth: '250px', show: true, disableFilters: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '350px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Coverage', accessor: 'coverage', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'KVA', accessor: 'kva', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Phase', accessor: 'phase', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Trafo GI', accessor: 'trafo_gi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Zone', accessor: 'zone', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Section', accessor: 'section', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Segment', accessor: 'segment', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Gardu Distribusi', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'UP3', accessor: 'up3_1', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: true, },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const TRAFOGD_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'status_listrik', type: 'string' },
      { name: 'coverage', type: 'string' },
      { name: 'kva', type: 'string' },
      { name: 'phase', type: 'string' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'trafo_gi', type: 'string' },
      { name: 'penyulang', type: 'string' },
      { name: 'zone', type: 'string' },
      { name: 'section', type: 'string' },
      { name: 'segment', type: 'string' },
      { name: 'parent_lokasi', type: 'string' },
      { name: 'unit_induk', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'ulp_1', type: 'string' },
      { name: 'lat', type: 'string' },
      { name: 'lon', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Nama Trafo GD', datafield: 'nama', width: 200, editable: false, },
      { text: 'Alamat', datafield: 'alamat', width: 200, editable: false, },
      { text: 'Coverage', datafield: 'coverage', width: 200, editable: false, },
      { text: 'KVA', datafield: 'kva', width: 200, editable: false, },
      { text: 'Phase', datafield: 'phase', width: 200, editable: false, },
      { text: 'Gardu Induk', datafield: 'gardu_induk', width: 200, editable: false, },
      { text: 'Trafo GI', datafield: 'trafo_gi', width: 200, editable: false, },
      { text: 'Penyulang', datafield: 'penyulang', width: 200, editable: false, },
      { text: 'Zone', datafield: 'zone', width: 200, editable: false, },
      { text: 'Section', datafield: 'section', width: 120, editable: false, },
      // { text: 'Segment', datafield: 'segment', width: 100, editable: false, },
      { text: 'Gardu Distribusi', datafield: 'parent_lokasi', width: 100, editable: false, },
      { text: 'Unit Induk', datafield: 'unit_induk', width: 100, editable: false, },
      { text: 'UP3', datafield: 'up3_1', width: 100, editable: false, },
      { text: 'ULP', datafield: 'ulp_1', width: 100, editable: false, },
      { text: 'latitude', datafield: 'lat', width: 100, editable: false, },
      { text: 'longitude', datafield: 'lon', width: 100, editable: false, },
      { text: 'Status Aktif', datafield: 'status_listrik', width: 80, editable: false, columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
};
export const TRAFOGD_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'status_listrik', type: 'string' },
      { name: 'coverage', type: 'string' },
      { name: 'kva', type: 'string' },
      { name: 'phase', type: 'string' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'trafo_gi', type: 'string' },
      { name: 'penyulang', type: 'string' },
      { name: 'zone', type: 'string' },
      { name: 'section', type: 'string' },
      { name: 'segment', type: 'string' },
      { name: 'parent_lokasi', type: 'string' },
      { name: 'uid', type: 'string' },
      { name: 'up3_1', type: 'string' },
      { name: 'ulp_1', type: 'string' },
      { name: 'lat', type: 'string' },
      { name: 'lon', type: 'string' },

    ],
    columns: [
      // { label: 'trans_id_kinerja', dataField: 'trans_id_kinerja', width: 120, editable: false, },
      { label: 'NO', dataField: 'number', width: 50 },
      { label: 'Nama Trafo GD', dataField: 'nama', width: 200 },
      { label: 'Alamat', dataField: 'alamat', width: 200 },
      { label: 'Status Aktif', dataField: 'status_listrik', width: 80, template: 'checkBox' },
      { label: 'Coverage', dataField: 'coverage', width: 200 },
      { label: 'KVA', dataField: 'kva', width: 200 },
      { label: 'Phase', dataField: 'phase', width: 200 },
      // { label: 'Gardu Induk', dataField: 'gardu_induk', width: 200 },
      // { label: 'Trafo GI', dataField: 'trafo_gi', width: 200 },
      // { label: 'Penyulang', dataField: 'penyulang', width: 200 },
      // { label: 'Zone', dataField: 'zone', width: 200 },
      // { label: 'Section', dataField: 'section', width: 120 },
      // { label: 'Segment', dataField: 'segment', width: 100 },
      { label: 'Gardu Distribusi', dataField: 'parent_lokasi', width: 100 },
      { label: 'Unit Induk', dataField: 'uid', width: 100 },
      { label: 'UP3', dataField: 'up3_1', width: 100 },
      { label: 'ULP', dataField: 'ulp_1', width: 100 },
      { label: 'latitude', dataField: 'lat', width: 100 },
      { label: 'longitude', dataField: 'lon', width: 100 },

    ],
  };
};

export const KANTOR = () => {
  return [
    ...NO(),
    { Header: 'Nama Kantor', accessor: 'nama', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '350px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Jenis', accessor: 'jenis', minWidth: '100px', show: true, disableFilters: true, },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'UP3', accessor: 'up3', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const KANTOR_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'id_ref_lokasi_subsistem', type: 'string' },
      { name: 'status_listrik', type: 'string' },
      { name: 'jenis', type: 'string' },
      { name: 'unit_induk', type: 'string' },
      { name: 'up3', type: 'string' },
      { name: 'lat', type: 'string' },
      { name: 'lon', type: 'string' },


    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama Kantor', datafield: 'nama', width: '15%', editable: false, },
      { text: 'Alamat', datafield: 'alamat', width: '15%', editable: false, },
      { text: 'Status Aktif', datafield: 'status_listrik', width: '10%', editable: false, columntype: 'checkbox', filtertype: 'bool' },
      { text: 'Jenis', datafield: 'jenis', width: '10%', editable: false, },
      { text: 'Unit Induk', datafield: 'unit_induk', width: '15%', editable: false, },
      { text: 'UP3', datafield: 'up3', width: '10%', editable: false, },
      { text: 'Latitude', datafield: 'lat', width: '10%', editable: false, },
      { text: 'Longitude', datafield: 'lon', width: '10%', editable: false, },

    ],
  };
};


export const SUBSISTEM = () => {
  return [
    ...NO(),
    { Header: 'Nama Subsistem', accessor: 'nama', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const SUBSISTEM_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'path1', type: 'string' },
      // { name: 'id_user', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'status_listrik', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama Subsistem', datafield: 'nama', width: '55%', editable: false, },
      { text: 'Path1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'Path2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'Path3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Status Aktif', datafield: 'status_listrik', width: '10%', editable: false, columntype: 'checkbox', filtertype: 'bool' },


    ],
  };
};
export const SUBSISTEM_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'path1', type: 'string' },
      // { name: 'id_user', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'status_listrik', type: 'string' },

    ],
    columns: [
      // { label: 'trans_id_kinerja', dataField: 'trans_id_kinerja', width: 120, editable: false, },
      { label: 'NO', dataField: 'number', width: '5%' },
      { label: 'Nama Subsistem', dataField: 'nama', width: '55%' },
      { label: 'Path1', dataField: 'path1', width: '10%' },
      { label: 'Path2', dataField: 'path2', width: '10%' },
      { label: 'Path3', dataField: 'path3', width: '10%' },
      { label: 'Status Aktif', dataField: 'status_listrik', width: '10%', template: 'checkBox' },


    ],
  };
};


export const HEADER_EXTRA_TREE: any = () => {
  return [
    {
      id: "aset",
      //children
      // accessor: 'nama_lokasi',

      //by id_parent_lokasi
      accessor: 'gardu_mjd',

      show: true,
      disableFilters: true,
      hideColumn: true,
      minWidth: '300px',
      Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
        // <span {...getToggleAllRowsExpandedProps()}>
        //   {isAllRowsExpanded ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-right"></i>} Aset
        // </span>
        <span {...getToggleAllRowsExpandedProps()}>
          {isAllRowsExpanded ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i>} Aset
        </span>
      ),
      Cell: ({ row }: any) =>

        row.canExpand ? (
          <div
            {...row.getToggleRowExpandedProps({
              style: {
                paddingLeft: `${row.depth * 1.25}rem`
              }
            })}
            className="d-flex gap-2"
          >
            {row.isExpanded ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i>}
            {/* <span> {row.original.nama_lokasi}</span> */}
            <span> {row.original.gardu_mjd}</span>
          </div>
          // ) : <div style={{ paddingLeft: `${(row.depth ? row.depth * 1.55 : 1.65)}rem` }}>{row.original.nama_lokasi}</div>,
        ) : <div style={{ paddingLeft: `${(row.depth ? row.depth * 1.55 : 1.65)}rem` }}>{row.original.gardu_mjd}</div>,
    },
    { Header: 'Kode Aset', accessor: 'kode_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis Aset', accessor: 'jenis_lokasi', minWidth: '180px', show: true, disableFilters: true },
    { Header: 'Fungsi Aset', accessor: 'fungsi_lokasi', minWidth: '180px', show: true, disableFilters: true }
  ]
}

export const HEADER_EXTRA_TREE_LAPORAN: any = () => {
  return [
    {
      id: "aset",
      accessor: 'nama_lokasi',
      show: true,
      disableFilters: true,
      hideColumn: true,
      minWidth: '300px',
      Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
        // <span {...getToggleAllRowsExpandedProps()}>
        //   {isAllRowsExpanded ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-right"></i>} Aset
        // </span>
        <span {...getToggleAllRowsExpandedProps()}>
          {isAllRowsExpanded ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i>} Aset
        </span>
      ),
      Cell: ({ row }: any) =>

        row.canExpand ? (
          <div
            {...row.getToggleRowExpandedProps({
              style: {
                paddingLeft: `${row.depth * 1.25}rem`
              }
            })}
            className="d-flex gap-2"
          >
            {row.isExpanded ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i>}
            <span> {row.original.nama_lokasi}</span>
          </div>
        ) : <div style={{ paddingLeft: `${(row.depth ? row.depth * 1.55 : 1.65)}rem` }}>{row.original.nama_lokasi}</div>,
    },
    { Header: 'Kode Aset', accessor: 'kode_lokasi', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Jenis Aset', accessor: 'jenis_jaringan', minWidth: '180px', show: true, disableFilters: true },
    { Header: 'Jenis Aset', accessor: 'fungsi_lokasi', minWidth: '180px', show: true, disableFilters: true }
  ]
}

export const TREE_JARINGAN = () => {
  return [
    ...HEADER_EXTRA_TREE(),
    // { Header: 'Kode', accessor: 'kode_lokasi', minWidth: '120px', show: true, disableFilters: true },
    { Header: 'Tiang Gardist', accessor: 'no_tiang', minWidth: 150, show: true, disableFilters: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '250px', show: true, disableFilters: true },
    { Header: 'Coverage', accessor: 'coverage', minWidth: '170px', show: true, disableFilters: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true, disableFilters: true },
    { Header: 'UP3', accessor: 'up31', minWidth: '170px', show: true, disableFilters: true },
    { Header: 'ULP', accessor: 'ulp1', minWidth: '170px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ];
};

export const TREE_JARINGAN_JQX = () => {
  return {
    datafields: [
      { name: 'id_ref_lokasi', type: 'number' },
      { name: 'id_parent_lokasi', type: 'number' },
      { name: 'id_ref_jenis_lokasi', type: 'number' },
      { name: 'nama_lokasi', type: 'string' },
      { name: 'kode_lokasi', type: 'string' },
      { name: 'jenis_lokasi', type: 'string' },
      { name: 'fungsi_lokasi', type: 'string' },
      { name: 'no_tiang', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'coverage', type: 'string' },
      { name: 'unit_induk', type: 'string' },
      { name: 'up3', type: 'string' },
      { name: 'ulp', type: 'string' },
      { name: 'number', type: 'number' },
      // { name: 'group_name', type: 'string' },
      // { name: 'keterangan', type: 'string' },
      // { name: 'status_data', type: 'number' },
      // { name: 'tipe_data', type: 'bool' },
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'Aset', datafield: 'nama_lokasi', width: 300 },
      { text: 'Kode Aset', datafield: 'kode_lokasi', width: 200 },
      { text: 'Jenis Aset', datafield: 'jenis_lokasi', width: 150 },
      { text: 'Fungsi Aset', datafield: 'fungsi_lokasi', width: 100, },
      { text: 'Tiang Gardist', datafield: 'no_tiang', width: 120 },
      { text: 'Alamat', datafield: 'alamat', width: 400 },
      { text: 'Coverage', datafield: 'coverage', width: 300 },
      { text: 'Unit Induk', datafield: 'unit_induk', width: 200 },
      { text: 'UP3', datafield: 'up3', width: 150 },
      { text: 'ULP', datafield: 'ulp', width: 150 },
    ],
  };
};

export const STATION_OPTIONS_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis Lokasi', accessor: 'ref_jenis_lokasi', minWidth: '200px', show: true, disableFilters: true, },
    { Header: 'Unit Pembangkit', accessor: 'unit_pembangkit', minWidth: '150px', show: true, Filter: SelectColumnFilter, filterOutside: true, filterType: 'unit-pembangkit' },
    { Header: 'Pembangkit', accessor: 'parent', minWidth: '150px', show: true, Filter: SelectColumnFilter, filterOutside: true, filterType: 'pembangkit' },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}


/* MASTER DATA ASET STATUS, LEVEL, KONDISI,RAK */
export const MASTER_DATA_JENIS_PEMBANGKIT = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ]
}

export const JENISPEMBANGKIT_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama Jenis Pembangkit', datafield: 'nama', width: '95%', editable: false, },

    ],
  };
};

export const JENISPEMBANGKIT_COLUMN_GRID = () => ({
  datafields: [
    { name: 'number', type: 'number' },
    { name: 'nama', type: 'string' },
  ],

  columns: [
    { label: 'NO', dataField: 'number', width: '5%' },
    { label: 'Nama Jenis Pembangkit', dataField: 'nama', width: '93%' },



  ],
});


export const KANTOR_COLUMN_GRID = () => ({
  datafields: [
    { name: 'id_ref_lokasi', type: 'number' },
    { name: 'number', type: 'number' },
    { name: 'nama', type: 'string' },
    { name: 'alamat', type: 'string' },
    { name: 'status_listrik', type: 'string' },
    { name: 'jenis', type: 'string' },
    { name: 'unit_induk', type: 'string' },
    { name: 'up3_1', type: 'string' },
    { name: 'lat', type: 'string' },
    { name: 'lon', type: 'string' },
  ],
  columns: [
    { label: 'NO', dataField: 'number', width: '5%' },
    { label: 'Nama Kantor', dataField: 'nama', width: '15%' },
    { label: 'Alamat', dataField: 'alamat', width: '15%' },
    {
      label: 'Status Aktif', dataField: 'status_listrik', width: '10%',
      template: 'checkBox'
    },
    { label: 'Jenis', dataField: 'jenis', width: '10%' },
    { label: 'Unit Induk', dataField: 'unit_induk', width: '15%' },
    { label: 'UP3', dataField: 'up3_1', width: '10%' },
    { label: 'Latitude', dataField: 'lat', width: '10%' },
    { label: 'Longitude', dataField: 'lon', width: '10%' },
  ]
});



export const GARDU_HUBUNG_COLUMNS_GRID = () => ({
  datafields: [
    { name: 'parent_lokasi', type: 'string' },
    { name: 'kode', type: 'string' },
    { name: 'nama', type: 'string' },
    { name: 'alamat', type: 'string' },
    { name: 'jenis_gardu', type: 'string' },
    { name: 'fungsi_scada', type: 'string' },
    { name: 'lat', type: 'string' },
    { name: 'lon', type: 'string' },
    { name: 'path1', type: 'string' },
    { name: 'path2', type: 'string' },
    { name: 'path3', type: 'string' },
    { name: 'id_i', type: 'string' },
    { name: 'id_v', type: 'string' },
    { name: 'id_p', type: 'string' },
    { name: 'id_amr', type: 'string' },
    { name: 'id_portal_ext', type: 'string' },
    { name: 'url_webservice', type: 'string' },
    { name: 'rekon_beban', type: 'string' },
    { name: 'status', type: 'string' },
  ],
  columnGroups: [
    { label: 'Mapping SCADA', align: 'center', name: 'mappingscada' },
    { label: 'Mapping AMR', align: 'center', name: 'mappingamr' },
    { label: 'Mapping Portal External', align: 'center', name: 'mappingexternal' }
  ],
  columns: [
    { label: 'No', dataField: 'number', width: 40 },
    { label: 'Gardu Induk', dataField: 'parent_lokasi', width: 150 },
    { label: 'Kode Gardu Hubung', dataField: 'kode', width: 150 },
    { label: 'Nama Gardu Hubung', dataField: 'nama', width: 100 },
    { label: 'Alamat', dataField: 'alamat', width: 150 },
    { label: 'Jenis Gardu', dataField: 'jenis_gardu', width: 100 },
    { label: 'Fungsi Scada', dataField: 'fungsi_scada', width: 100 },
    { label: 'Latitude', dataField: 'lat', width: 100 },
    { label: 'Longitude', dataField: 'lon', width: 100 },
    { label: 'Path1', dataField: 'path1', columnGroup: 'mappingscada', width: 100 },
    { label: 'Path2', dataField: 'path2', columnGroup: 'mappingscada', width: 100 },
    { label: 'Path3', dataField: 'path3', columnGroup: 'mappingscada', width: 100 },
    { label: 'ID I(Arus)', dataField: 'id_i', columnGroup: 'mappingscada', width: 120 },
    { label: 'ID V(Tegangan)', dataField: 'id_v', columnGroup: 'mappingscada', width: 120 },
    { label: 'ID P(Daya)', dataField: 'id_p', columnGroup: 'mappingscada', width: 120 },
    { label: 'ID AMR', dataField: 'id_amr', columnGroup: 'mappingamr', width: 120 },
    { label: 'ID Portal EXT', dataField: 'id_portal_ext', columnGroup: 'mappingexternal', width: 120 },
    { label: 'URL Webservice', dataField: 'url_webservice', columnGroup: 'mappingexternal', width: 120 },
    { label: 'Rekon Beban', dataField: 'rekon_beban', width: 100, template: 'checkBox' },
    { label: 'Status Aktif', dataField: 'status', width: 80, template: 'checkBox' },



  ],
});


export const GARDU_DISTRIBUSI_COLUMN_GRID = () => ({
  datafields: [
    { name: 'number', type: 'number' },
    { name: 'kode_lokasi', type: 'string' },
    { name: 'nama', type: 'string' },
    { name: 'alamat', type: 'string' },
    { name: 'no_tiang', type: 'string' },
    { name: 'jenis_gardu', type: 'string' },
    { name: 'fungsi_scada', type: 'string' },
    { name: 'gardu_induk', type: 'string' },
    { name: 'trafo_gi', type: 'string' },
    { name: 'penyulang', type: 'string' },
    { name: 'zone', type: 'string' },
    { name: 'section', type: 'string' },
    { name: 'segment', type: 'string' },
    { name: 'uid', type: 'string' },
    { name: 'up3_1', type: 'string' },
    { name: 'ulp_1', type: 'string' },
    { name: 'lat', type: 'string' },
    { name: 'lon', type: 'string' },
    { name: 'path1', type: 'string' },
    { name: 'path2', type: 'string' },
    { name: 'path3', type: 'string' },
    { name: 'status_listrik', type: 'string' },
  ],
  columns: [
    { label: 'NO', dataField: 'number', width: 50 },
    { label: 'Kode Gardu', dataField: 'kode_lokasi', width: 150 },
    { label: 'Nama Gardu', dataField: 'nama', width: 150 },
    { label: 'Alamat', dataField: 'alamat', width: 180 },
    { label: 'No Tiang', dataField: 'no_tiang', width: 150 },
    { label: 'Jenis Gardu', dataField: 'jenis_gardu', width: 100 },
    { label: 'Fungsi SCADA', dataField: 'fungsi_scada', width: 150 },
    { label: 'Gardu Induk', dataField: 'gardu_induk', width: 150 },
    { label: 'Trafo GI', dataField: 'trafo_gi', width: 150 },
    { label: 'Penyulang', dataField: 'penyulang', width: 150 },
    { label: 'Zone', dataField: 'zone', width: 150 },
    { label: 'Section', dataField: 'section', width: 150 },
    { label: 'Segment', dataField: 'segment', width: 150 },
    { label: 'Unit Induk', dataField: 'uid', width: 180 },
    { label: 'UP3', dataField: 'up3_1', width: 180 },
    { label: 'ULP', dataField: 'ulp_1', width: 180 },
    { label: 'Latitude', dataField: 'lat', width: 180 },
    { label: 'Longitude', dataField: 'lon', width: 180 },
    { label: 'Path1', dataField: 'path1', width: 180 },
    { label: 'Path2', dataField: 'path2', width: 180 },
    { label: 'Path3', dataField: 'path3', width: 180 },
    { label: 'Status Aktif', dataField: 'status_listrik', width: 80, template: 'checkBox' },
  ]
});

export const MANUVER_COLUMNS_POPUP = () => ({
  columns: [
    { Header: 'Aset', accessor: 'nama_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis Aset', accessor: 'jenis_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Kode', accessor: 'kode_lokasi', minWidth: '200px', show: true, disableFilters: true, },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '200px', show: true, disableFilters: true, },
    { Header: 'Coverage', accessor: 'coverage', minWidth: '200px', show: true, disableFilters: true, },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true, disableFilters: true, },
  ]
});

export const MANUVER_COLUMNS = () => {
  return {
    dataFields: [
      { name: 'id', type: 'string' },
      { name: 'id_ref_lokasi', type: 'string' },
      { name: 'children', type: 'array' },
      { name: 'kode_lokasi', type: 'string' },
      { name: 'jenis_lokasi', type: 'string' },
      { name: 'nama_lokasi', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'coverage', type: 'string' },
      { name: 'unit_induk', type: 'string' },
      { name: 'children', type: 'array' },
    ],
    columns: [
      { text: 'Aset', dataField: 'nama_lokasi', width: 300 },
      { text: 'Jenis Aset', dataField: 'jenis_lokasi', width: 200 },
      { text: 'Kode', dataField: 'kode_lokasi', width: 200 },
      { text: 'Alamat', dataField: 'alamat', width: 250 },
      { text: 'Coverage', dataField: 'coverage', width: 150 },
      { text: 'Unit Induk', dataField: 'unit_induk', width: 150 }
    ],
    hierarchy: { root: 'children' }
  };
};
