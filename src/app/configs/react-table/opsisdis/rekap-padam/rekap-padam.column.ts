
import { ACTION_COLUMN, NO } from "../../_more.columns.config"
export const GANGGUAN_REKAP_PADAM = () => {
  return [
    ...NO(),
    { Header: 'Aksi', accessor: 'action', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Hari/Tanggal', accessor: 'date', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'No Event', accessor: 'no_event', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Key Point/GI/GH', accessor: 'keypoint', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'No APKT', accessor: 'no_apkt', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Photo', accessor: 'photo', minWidth: '220px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Jam Lepas', accessor: 'jam_buka', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Jam Trip', accessor: 'jam_trip', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Jam Tutup', accessor: 'jam_tutup', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Jam Normal', accessor: 'jam_normal', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Beban Padam', accessor: 'beban_padam', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Durasi', accessor: 'durasi', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'ENS (kWh)', accessor: 'ens', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Indikasi', accessor: 'indikasi', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Kategori', accessor: 'kategori', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'R', accessor: 'r', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'S', accessor: 's', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'T', accessor: 't', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'N', accessor: 'n', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Lat', accessor: 'lat', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Lon', accessor: 'lon', minWidth: '200px', disableFilters: true, show: true },
  ]
}

export const GANGGUAN_REKAP_PADAM_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'id', type: 'string' },
      { name: 'penyebab_gangguan_id', type: 'string' },
      { name: 'penyulang_id', type: 'string' },
      { name: 'date', type: 'string' },
      { name: 'up3_id', type: 'string' },
      { name: 'penyulang', type: 'string' },
      { name: 'ulp', type: 'string' },
      { name: 'penyebab_gangguan', type: 'string' },
      { name: 'titik_gangguan', type: 'string' },
      { name: 'zone', type: 'string' },
      { name: 'proteksi_gangguan', type: 'string' },
      { name: 'kinerja', type: 'string' },
      { name: 'created_at', type: 'string' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false },
      { text: 'Tanggal Gangguan', datafield: 'date', width: '13%', editable: false },
      { text: 'Area(UP3)', datafield: 'up3_id', width: '13%', editable: false },
      { text: 'Penyulang', datafield: 'penyulang', width: '13%', editable: false },
      { text: 'ULP', datafield: 'ulp', width: '13%', editable: false },
      { text: 'Penyebab Gangguan', datafield: 'penyebab_gangguan', width: '13%', editable: false },
      { text: 'Tiktik Gangguan', datafield: 'titik_gangguan', width: '13%', editable: false },
      { text: 'Zona', datafield: 'zone', width: '13%', editable: false },
      { text: 'Proteksi', datafield: 'proteksi_gangguan', width: '13%', editable: false },
      { text: 'Kinerja', datafield: 'kinerja', width: '13%', editable: false },
      { text: 'Dibuat Pada', datafield: 'created_at', width: '13%', editable: false },
    
    ],
  };
};
export const GANGGUAN_DETAIL_ENTRI_MODAL_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'id', type: 'string' },
      { name: 'tanggal', type: 'string' },
      { name: 'jam', type: 'string' },
      { name: 'uraian', type: 'string' },
      { name: 'peralatan', type: 'string' },
      { name: 'nama', type: 'string' },
      { name: 'gardu_padam', type: 'string' },
      { name: 'arus', type: 'string' },
 
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false },
      { text: 'Tanggal', datafield: 'tanggal', width: '13%', editable: false },
      { text: 'Jam', datafield: 'jam', width: '13%', editable: false },
      { text: 'uraian', datafield: 'uraian', width: '13%', editable: false },
      { text: 'Peralatan', datafield: 'peralatan', width: '13%', editable: false },
      { text: 'Nama', datafield: 'nama', width: '13%', editable: false },
      { text: 'Gardu Padam', datafield: 'gardu_padam', width: '13%', editable: false },
      { text: 'Arus', datafield: 'arus', width: '13%', editable: false },
      
    
    ],
  };
};
export const GANGGUAN_DETAIL_ENTRI_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'id', type: 'string' },
      { name: 'gangguan_penyulang_id', type: 'string' },
      { name: 'dispatcher_id', type: 'string' },
      { name: 'tanggal', type: 'string' },
      { name: 'uraian', type: 'string' },
      { name: 'peralatan', type: 'string' },
      { name: 'nama', type: 'string' },
      { name: 'gardu_padam', type: 'string' },
      { name: 'arus', type: 'string' },
      { name: 'rele_kerja', type: 'string' },
      { name: 'remote', type: 'string' },
      { name: 'titik_manuver', type: 'string' },
      { name: 'arus_r', type: 'string' },
      { name: 'arus_s', type: 'string' },
      { name: 'arus_t', type: 'string' },
      { name: 'arus_n', type: 'string' },
      { name: 'ens', type: 'string' },
     

    ],
    columngroups: [
      { text: 'Arus Gangguan (A)', align: 'center', name: 'arusgangguan' },
    
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Dispatcher', datafield: 'dispatcher_id', width: 140, editable: false, },
      { text: 'Tanggal', datafield: 'tanggal', width: 140, editable: false, },
      { text: 'Uraian', datafield: 'uraian', width: 140, editable: false, },
      { text: 'Peralatan', datafield: 'peralatan', width: 120, editable: false, },
      { text: 'Nama', datafield: 'nama', width: 140, editable: false, },
      { text: 'Gardu Padam', datafield: 'gardu_padam', width: 140, editable: false, },
      { text: 'Arus (A)', datafield: 'arus', width: 100, editable: false, },
      { text: 'Rele Kerja', datafield: 'rele_kerja', width: 140, editable: false, },
      { text: 'Remote', datafield: 'remote', width: 120, editable: false, },
      { text: 'Manuver', datafield: 'titik_manuver', width: 140, editable: false, },
      
      { text: 'R', columngroup: 'arusgangguan', datafield: 'arus_r', width: 50, editable: false, },
      { text: 'S', columngroup: 'arusgangguan', datafield: 'arus_s', width: 50, editable: false, },
      { text: 'T', columngroup: 'arusgangguan', datafield: 'arus_t', width: 50, editable: false, },
      { text: 'N', columngroup: 'arusgangguan', datafield: 'arus_n', width: 50, editable: false, },
     
      { text: 'ENS', datafield: 'ens', width: 100, editable: false,  },
   

    ]
  };
};
export const GANGGUAN_REKAP_PADAM_SISTEM = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'id', type: 'string' },
      { name: 'gangguan_sistem_id', type: 'string' },
      { name: 'jenis_gangguan', type: 'string' },
      { name: 'penyebab_gangguan', type: 'string' },
      { name: 'beban_a', type: 'string' },
      { name: 'beban_mw', type: 'string' },
      { name: 'ens', type: 'string' },
      { name: 'rupiah', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'tanggal', type: 'string' },
      { name: 'created_at', type: 'string' },
    
     
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false },
      { text: 'Jenis Gangguan', datafield: 'jenis_gangguan', width: '13%', editable: false },
      { text: 'Penyebab Gangguan', datafield: 'penyebab_gangguan', width: '13%', editable: false },
      { text: 'Beban A', datafield: 'beban_a', width: '13%', editable: false },
      { text: 'Beban MW', datafield: 'beban_mw', width: '13%', editable: false },
      { text: 'ENS', datafield: 'ens', width: '13%', editable: false },
      { text: 'Rupiah', datafield: 'rupiah', width: '13%', editable: false },
      { text: 'Status', datafield: 'status', width: '13%', editable: false },
      { text: 'Tanggal', datafield: 'tanggal', width: '13%', editable: false },
      // { text: 'Dibua', datafield: 'kinerja', width: '13%', editable: false },
      { text: 'Dibuat Pada', datafield: 'created_at', width: '13%', editable: false },
    
    ],
  };
};
export const GANGGUAN_REKAP_PADAM_OLS = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'id', type: 'string' },
      { name: 'gangguan_sistem_id', type: 'string' },
      { name: 'tanggal', type: 'string' },
      { name: 'penyebab_gangguan', type: 'string' },
      // { name: 'gangguan_sistem_id', type: 'string' },

     
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false },
      { text: 'Tanggal', datafield: 'tanggal', width: '13%', editable: false },
      { text: 'Penyebab Gangguan', datafield: 'penyebab_gangguan', width: '74%', editable: false },
     
    ],
  };
};


export const GANGGUAN_REKAP_PADAM_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'id_trans_ep', type: 'number' },
      { name: 'date', type: 'number' },
      { name: 'no_event', type: 'string' },
      { name: 'keypoint', type: 'string' },
      { name: 'no_apkt', type: 'number' },
      { name: 'photo', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'jam_buka', type: 'string' },
      { name: 'jam_trip', type: 'string' },
      { name: 'jam_tutup', type: 'string' },
      { name: 'jam_normal', type: 'string' },
      { name: 'beban_padam', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'ens', type: 'string' },
      { name: 'indikasi', type: 'string' },
      { name: 'kategori', type: 'string' },
      { name: 'r', type: 'string' },
      { name: 's', type: 'string' },
      { name: 't', type: 'string' },
      { name: 'n', type: 'string' },
      { name: 'up3', type: 'string' },
      { name: 'ulp', type: 'string' },
      { name: 'lat', type: 'string' },
      { name: 'lon', type: 'string' },
     
      
      
    
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
    { text: 'No', datafield: 'number' },
    { text: 'Hari/Tanggal', datafield: 'date', width: 120,  },
    { text: 'No Event', datafield: 'no_event', width: 120,  },
    { text: 'Key Point/GI/GH', datafield: 'keypoint', width: 120,  },
    { text: 'No APKT', datafield: 'no_apkt', width: 120,  },
    { text: 'Photo', datafield: 'photo', width: 120,  },
    { text: 'Status', datafield: 'status', width: 120,  },
    { text: 'Jam Lepas', datafield: 'jam_buka', width: 120,  },
    { text: 'Jam Trip', datafield: 'jam_trip', width: 100,  },
    { text: 'Jam Tutup', datafield: 'jam_tutup', width: 100,  },
    { text: 'Jam Normal', datafield: 'jam_normal', width: 100,  },
    { text: 'Beban Padam', datafield: 'beban_padam', width: 80,  },
    { text: 'Durasi', datafield: 'durasi', width: 80,  },
    { text: 'ENS (kWh)', datafield: 'ens', width: 80,  },
    { text: 'Indikasi', datafield: 'indikasi', width: 80,  },
    { text: 'Kategori', datafield: 'kategori', width: 75,  },
    { text: 'R', datafield: 'r', width: 75,  },
    { text: 'S', datafield: 's', width: 75,  },
    { text: 'T', datafield: 't', width: 75,  },
    { text: 'N', datafield: 'n', width: 60,  },
    { text: 'UP3', datafield: 'up3', width:  60,  },
    { text: 'ULP', datafield: 'ulp', width:  60,  },
    { text: 'Lat', datafield: 'lat', width:  60,  },
    { text: 'Lon', datafield: 'lon', width:  60,  },
    ],
  };
};


export const GANGGUAN_REKAP_PADAM_DETAIL = () => {
  return [
    ...NO(),
    { Header: 'Hari/Tanggal', accessor: 'date', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'No Event', accessor: 'no_event', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'No APKT', accessor: 'no_apkt', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Photo', accessor: 'photo', minWidth: '220px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Key Point/GI/GH', accessor: 'keypoint', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Jam Trip', accessor: 'jam_trip', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Jam Tutup', accessor: 'jam_tutup', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Jam Normal', accessor: 'jam_normal', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'ENS', accessor: 'ens', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Indikasi', accessor: 'indikasi', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'R', accessor: 'r', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'S', accessor: 's', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'T', accessor: 't', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'N', accessor: 'n', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Lat', accessor: 'lat', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Lon', accessor: 'lon', minWidth: '200px', disableFilters: true, show: true },
  ]
}

export const REKAM_PADAM_EKSEKUSI_RC = () => {
  return [
    ...NO(),
    { Header: 'Tanggal Input', accessor: 'tgl_entri', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis Peralatan', accessor: 'jenis_peralatan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Peralatan', accessor: 'peralatan_rc', minWidth: '150px', disableFilters: true, show: true },
    // { Header: 'LBS MANUAL', accessor: 'lbs_manual', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Arus Gangguan HMI', accessor: 'arus_gangguan', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Status Operasi', accessor: 'status_operasi', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Beban', accessor: 'beban', minWidth: '150px', disableFilters: true, show: true },
   
    { Header: 'r', accessor: 'r', minWidth: '200px', disableFilters: true, show: true },
    { Header: 's', accessor: 's', minWidth: '200px', disableFilters: true, show: true },
    { Header: 't', accessor: 't', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'n', accessor: 'n', minWidth: '200px', disableFilters: true, show: true },
    
    { Header: 'Open', accessor: 'rc_open', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status Open', accessor: 'status_open', minWidth: '220px', disableFilters: true, show: true },
    { Header: 'Waktu Open', accessor: 'jam_open', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Close', accessor: 'rc_close', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Status Close', accessor: 'status_close', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Waktu Close', accessor: 'jam_close', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'section', accessor: 'section', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Waktu Masuk', accessor: 'waktu_masuk', minWidth: '200px', disableFilters: true, show: true },
    { Header: 'Beban Masuk', accessor: 'beban_masuk', minWidth: '200px', disableFilters: true, show: true },
    // { Header: 'Status Manuver', accessor: 'status_manuver', minWidth: '200px', disableFilters: true, show: true },
    ...ACTION_COLUMN()
  ]
}

export const REKAM_PADAM_EKSEKUSI_FIOHL = () => {
  return [
    ...NO(),
    { Header: 'Peralatan', accessor: 'peralatan', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Indikasi', accessor: 'indikasi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '150px', disableFilters: true, show: true },
    ...ACTION_COLUMN()
  ]
}
