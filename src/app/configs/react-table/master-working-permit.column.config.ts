import { ACTION_COLUMN } from "./_more.columns.config"

export const PERTANYAAN_QRC_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'Pertanyaan', accessor: 'pertanyaan_qrc', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Point', accessor: 'pertanyaan_qrc_point', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const PERTANYAAN_QRC_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'pertanyaan_qrc', type: 'string' },
      { name: 'pertanyaan_qrc_point', type: 'number' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '10%', editable: false, },
      { text: 'Pertanyaan', datafield: 'pertanyaan_qrc', width: '45%', editable: false, },
      { text: 'Point', datafield: 'pertanyaan_qrc_point', width: '45%', editable: false, },
      
    ]
  }
}

export const PERTANYAAN_QRC_SELECTION_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'Pertanyaan', accessor: 'pertanyaan_qrc', minWidth: '150px', show: true, disableFilters: true, }
  ]
}

export const LARANGAN_TANGGUNG_JAWAB_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'Uraian', accessor: 'uraian', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const LARANGAN_TANGGUNG_JAWAB_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'uraian', type: 'string' },
      

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '10%', editable: false, },
      { text: 'Uraian', datafield: 'uraian', width: '90%', editable: false, },
      
      
    ],
  };
};

export const APPROVAL_MANAGEMENT_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama Pegawai', accessor: 'nama_pegawai', minWidth: '150px', show: true, disableFilters: true, },
    { Header: 'Jabatan', accessor: 'nama_jabatan', minWidth: '150px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}

export const APPROVAL_MANAGEMENT_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama_pegawai', type: 'string' },
      { name: 'nama_jabatan', type: 'string' },
      

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '10%', editable: false, },
      { text: 'Nama Pegawai', datafield: 'nama_pegawai', width: '45%', editable: false, },
      { text: 'Jabatan', datafield: 'nama_jabatan', width: '45%', editable: false, }
      
      
    ],
  };
};

export const WP_BAGIAN_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'name', minWidth: '350px', show: true, disableFilters: true, },
    ...ACTION_COLUMN(),
  ]
}