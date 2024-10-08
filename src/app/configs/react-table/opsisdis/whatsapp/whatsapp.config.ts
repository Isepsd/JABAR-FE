// export const DAFTAR_POINT_TIDAK_KIRIM_WA = () => [
//   { Header: 'Jenis', accessor: 'jenis', disableFilters: true, show: true },
//   { Header: 'Kode Aset', accessor: 'kode_aset', disableFilters: true, show: true },
//   { Header: 'Nama', accessor: 'nama', disableFilters: true, show: true },
// ]

export const DAFTAR_PENYULANG_TIDAK_KIRIM_APKT = () => [
  { Header: 'No', accessor: 'number', disableFilters: true, show: true },
  { Header: 'Nama GI', accessor: 'nama_gi', disableFilters: true, show: true },
  { Header: 'Nama Penyulang', accessor: 'nama_penyulang', disableFilters: true, show: true },
]
export const DAFTAR_POINT_TIDAK_KIRIM_WA = () => {
  return {
    datafields: [
      { name: 'pkey', type: 'string' },
      { name: 'point', type: 'string' },
      { name: 'station', type: 'string' },




    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'No', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama Station', datafield: 'point', width: '40%', editable: false, },
      { text: 'Nama Point', datafield: 'station', width: '60%', editable: false, },




    ],
  };
};

export const DAFTAR_POINT_WA_TIDAK_KIRIM_WA = () => {
  return {
    datafields: [
      { name: 'pkey', type: 'string' },
      { name: 'point', type: 'string' },
      { name: 'station', type: 'string' },
      { name: 'tgl_input', type: 'string' },
      { name: 'user_input', type: 'string' },




    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'No', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama Station', datafield: 'point', width: '40%', editable: false, },
      { text: 'Nama Point', datafield: 'station', width: '60%', editable: false, },
      { text: 'Tanggal Input', datafield: 'tgl_input', width: '40%', editable: false, },
      { text: 'User Input', datafield: 'user_input', width: '40%', editable: false, },




    ],
  };
};


