import { ACTION_COLUMN } from "./_more.columns.config";

export const MASTER_PENYEBAB_GANGGUAN = () => {
  return [
    { Header: 'No', accessor: 'number', width: '5%', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Kategori', accessor: 'kategori', minWidth: 200, disableFilters: true, show: true },
    // { Header: 'Status', accessor: 'status', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_PENYEBAB_GANGGUAN_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'kategori', type: 'string' },
      // { name: 'status', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'No', datafield: 'number', width: '5%', editable: false, disableFilters: true },
      { text: 'Nama', datafield: 'nama', width: '55%', editable: false, },
      { text: 'Kategori', datafield: 'kategori', width: '40%', editable: false, },
      // { text: 'Status Aktif', datafield: 'status', width: '30%', editable: false, columntype: 'checkbox', filtertype: 'bool' },
    ],
  };
};


export const MASTER_FREQUENSI_METER = () => {
  return [
    { Header: 'No', accessor: 'number', width: '5%', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Lokasi', accessor: 'lokasi', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Interval Logging', accessor: 'interval_logging', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Logging', accessor: 'logging', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Scale', accessor: 'scale', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Slave ID', accessor: 'slave_id', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Modbus ADR', accessor: 'address', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Mode', accessor: 'mode', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Parity', accessor: 'parity', minWidth: 40, disableFilters: true, show: true },
    { Header: 'Port', accessor: 'port', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Baut Rate', accessor: 'baut_rate', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Stop Bits', accessor: 'stop_bits', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Byte Size', accessor: 'byte_size', minWidth: 150, disableFilters: true, show: true },
    { Header: 'RTS Control', accessor: 'xonxoff', minWidth: 150, disableFilters: true, show: true },
    { Header: 'IP Host', accessor: 'ip_host', minWidth: 150, disableFilters: true, show: true },
    { Header: 'IP Port', accessor: 'ip_port', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_FREQUENSI_METER_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'id_meter', type: 'string' },
      { name: 'status', type: 'number' },
      { name: 'lokasi', type: 'string' },
      { name: 'general_slaveid', type: 'number' },
      { name: 'general_address', type: 'number' },
      { name: 'general_scale', type: 'number' },
      { name: 'general_mode', type: 'string' },
      { name: 'serial_port', type: 'string' },
      { name: 'serial_baudrate', type: 'number' },
      { name: 'serial_bytesize', type: 'number' },
      { name: 'serial_parity', type: 'string' },
      { name: 'serial_stopbits', type: 'number' },
      { name: 'serial_xonxoff', type: 'number' },
      { name: 'ip_host', type: 'string' },
      { name: 'ip_port', type: 'number' },
      { name: 'general_koneksi', type: 'string' },
      { name: 'general_logging', type: 'number' },
      { name: 'general_interval_logging', type: 'number' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'sumber_data', type: 'string' },
      { name: 'point_number', type: 'string' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: 50, editable: false, disableFilters: true },
      { text: 'Sumber Data', datafield: 'sumber_data', width: 200, editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: 200, editable: false, },
      { text: 'Nama', datafield: 'nama', width: 200, editable: false, },
      // { text: 'Status Aktif', datafield: 'status', width: 200, editable: false, columntype: 'checkbox', filtertype: 'bool' },
      { text: 'Lokasi', datafield: 'lokasi', width: 200, editable: false, },
      { text: 'Path1', datafield: 'path1', width: 200, editable: false, },
      { text: 'Path2', datafield: 'path2', width: 200, editable: false, },
      { text: 'Path3', datafield: 'path3', width: 200, editable: false, },
      // { text: 'Interval Logging', datafield: 'interval_logging', width: 200, editable: false, },
      // { text: 'Logging', datafield: 'logging', width: 200, editable: false, columntype: 'checkbox', filtertype: 'bool' },
      // { text: 'Scale', datafield: 'scale', width: 100, editable: false, },
      // { text: 'Slave ID', datafield: 'slave_id', width: 200, editable: false, },
      // { text: 'Modbus ADR', datafield: 'address', width: 200, editable: false, },
      // { text: 'Mode', datafield: 'mode', width: 200, editable: false, },
      // { text: 'Parity', datafield: 'parity', width: 100, editable: false, },
      // { text: 'Port', datafield: 'port', width: 100, editable: false, },
      // { text: 'Baut Rate', datafield: 'baut_rate', width: 150, editable: false, },
      // { text: 'Stop Bits', datafield: 'stop_bits', width: 150, editable: false, },
      // { text: 'Byte Size', datafield: 'byte_size', width: 150, editable: false, },
      // { text: 'RTS Control', datafield: 'xonxoff', width: 150, editable: false, },
      // { text: 'IP Host', datafield: 'ip_host', width: 150, editable: false, },
      // { text: 'IP Port', datafield: 'ip_port', width: 100, editable: false, },

    ],
  };
};

export const TRANS_FREQUENSI_HISTORY = () => {
  return [
    { Header: 'Folder', accessor: 'folder', minWidth: 200, disableFilters: true, show: true },
  ];
};

export const TRANS_FREQUENSI_HISTORY_LIST_DIRECTORY = () => {
  return [
    { Header: 'Folder', accessor: 'directory_name', minWidth: 200, disableFilters: true, show: true },
  ];
};
export const TRANS_FREQUENSI_HISTORY_DETAIL = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: 50, disableFilters: true, show: true },
    { Header: 'Filename', accessor: 'filename', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Action', accessor: 'dokumen', minWidth: 100, disableFilters: true, show: true },
  ];
};

export const MASTER_AMR_CUSTOMER = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Customer RID', accessor: 'customer_rid', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Lokasi', accessor: 'lok', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Meter ID', accessor: 'meter_id', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Meter Type', accessor: 'meter_type', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Rate', accessor: 'rate', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Modem ADR', accessor: 'modem_adr', minWidth: 140, disableFilters: true, show: true },
    { Header: 'Daya', accessor: 'daya', minWidth: 100, disableFilters: true, show: true },
    { Header: 'BAPM', accessor: 'bapm', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Faktor Kali', accessor: 'faktor_kali', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Nofa', accessor: 'nofa', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Gol Tarif', accessor: 'goltarif', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Kode Gardu', accessor: 'kodegardu', minWidth: 150, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_AMR_CUSTOMER_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'customer_rid', type: 'string' },
      { name: 'nama', type: 'string' },
      { name: 'lok', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'meter_id', type: 'string' },
      { name: 'meter_type', type: 'string' },
      { name: 'rate', type: 'string' },
      { name: 'modem_adr', type: 'string' },
      { name: 'daya', type: 'string' },
      { name: 'bapm', type: 'string' },
      { name: 'faktor_kali', type: 'string' },
      { name: 'nofa', type: 'string' },
      { name: 'goltarif', type: 'string' },
      { name: 'kodegardu', type: 'string' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: 80, editable: false, disableFilters: true},
      { text: 'Customer RID', datafield: 'customer_rid', width: 200, editable: false, },
      { text: 'Nama', datafield: 'nama', width: 200, editable: false, },
      { text: 'Lokasi', datafield: 'lok', width: 200, editable: false, },
      { text: 'Alamat', datafield: 'alamat', width: 200, editable: false, },
      { text: 'Meter ID', datafield: 'meter_id', width: 100, editable: false, },
      { text: 'Meter Type', datafield: 'meter_type', width: 150, editable: false, },
      { text: 'Rate', datafield: 'rate', width: 100, editable: false, },
      { text: 'Modem ADR', datafield: 'modem_adr', width: 140, editable: false, },
      { text: 'Daya', datafield: 'daya', width: 100, editable: false, },
      { text: 'BAPM', datafield: 'bapm', width: 100, editable: false, },
      { text: 'Faktor Kali', datafield: 'faktor_kali', width: 200, editable: false, },
      { text: 'Nofa', datafield: 'nofa', width: 100, editable: false, },
      { text: 'Gol Tarif', datafield: 'goltarif', width: 100, editable: false, },
      { text: 'Kode Gardu', datafield: 'kodegardu', width: 150, editable: false, },

    ],
  };
};


export const FORM_CHECKLIST_COLUMN = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 50, disableFilters: true, show: true },
    { Header: 'Kategori Aset', accessor: 'kategori', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Level', accessor: 'level', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const FORM_CHECKLIST_DETAIL_COLUMN = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: 50, disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 50, disableFilters: true, show: true },
    { Header: 'Nilai Acuan', accessor: 'nilai_acuan', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Satuan', accessor: 'satuan', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Jenis', accessor: 'jenis', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Tipe', accessor: 'tipe', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const FORM_CHECKLIST_DETAIL_LOGIC_COLUMN = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: 50, disableFilters: true, show: true },
    { Header: 'Nilai/Range', accessor: 'nilai_range', minWidth: 50, disableFilters: true, show: true },
    { Header: 'Kesimpulan', accessor: 'kesimpulan', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_PETUGAS_REGU = () => {
  return [
    { Header: 'Nama Petugas', accessor: 'fullname', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Regu', accessor: 'regu', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_TOKEN = () => {
  return [
    { Header: 'No', accessor: 'number', width: '20px', disableFilters: true, show: true },
    { Header: 'Nama Token', accessor: 'namatoken', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Token', accessor: 'token', minWidth: 200, disableFilters: true, show: true },
    { Header: 'User', accessor: 'user_token', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Tanggal Buat', accessor: 'tanggal_buat', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_TOKEN_JQX = () => {
  return {
    datafields: [
      { name: 'id_token', type: 'number' },
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'user_token', type: 'string' },
      { name: 'token', type: 'string' },
      { name: 'tanggal_buat', type: 'string' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '3%' },
      { text: 'Nama Token', datafield: 'nama', width: '25%' },
      { text: 'Token', datafield: 'token', width: '25%' },
      { text: 'User', datafield: 'user_token', width: '22%' },
      { text: 'Tanggal Buat', datafield: 'tanggal_buat', width: '25%', },

    ],
  };
}

export const MASTER_ROLES_TOKEN = () => {
  return [
    { Header: 'Nama Module', accessor: 'namamodule', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Id Module', accessor: 'id_module', minWidth: 200, disableFilters: true, show: true },
  ];
};

export const MASTER_ROLES_TOKEN_DETAIL_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'tanggal_buat', type: 'string' },
      { name: 'id_module', type: 'int' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '3%', editable: false, },
      { text: 'Nama Module', datafield: 'nama', width: '50%', editable: false, },
      { text: 'Tanggal Buat', datafield: 'tanggal_buat', width: '47%', editable: false, },

    ],
  };
};


export const MASTER_ROLES_TOKEN_DETAIL_FORM_JQX = () => {
  return {
    datafields: [
      { name: 'nama_module', type: 'string' },
      { name: 'id_module', type: 'int' },

    ],
    columns: [
      { text: 'Nama Module', datafield: 'nama_module', width: 450 },
      // { text: 'ID MODULE', datafield: 'id_module', width: 450 },


    ],
  };
};


export const MASTER_MODULE_API = () => {
  return [
    { Header: 'No', accessor: 'number', width: '20px', disableFilters: true, show: true },
    { Header: 'Nama Module', accessor: 'namamodule', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_MODULE_API_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '3%', editable: false, },
      { text: 'Nama Module', datafield: 'nama', width: '97%', editable: false, },

    ],
  };
};


export const MASTER_INDIKASI = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Jenis', accessor: 'jenis', minWidth: 200, disableFilters: true, show: true },
    // { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_INDIKASI_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'jenis', type: 'string' },
      // { name: 'status', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'No', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama', datafield: 'nama', width: '55%', editable: false, },
      { text: 'Jenis', datafield: 'jenis', width: '40%', editable: false, },
      // { text: 'Status Aktif', datafield: 'status', width: '30%', editable: false, columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
};


export const MASTER_FIOHL = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    // { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_FIOHL_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' }

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '10%', editable: false, },
      { text: 'Nama', datafield: 'nama', width: '90%', editable: false, },

    ],
  };
};

export const MASTER_FAILMTRZ = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_FAILMTRZ_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '10%', editable: false, },
      { text: 'Nama', datafield: 'nama', width: '90%', editable: false, },

    ],
  };
};
export const MASTER_FAILHMI = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};
export const MASTER_FDIR = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    // { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_FDIR_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      // { name: 'status', type: 'string' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama', datafield: 'nama', width: '95%', editable: false, },
      // { text: 'Status Aktif', datafield: 'status', width: '45%', editable: false, columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
};

export const MASTER_CUACA = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    // { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_CUACA_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      // { name: 'status', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'No', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama', datafield: 'nama', width: '95%', editable: false, },
      // { text: 'Status Aktif', datafield: 'status', width: '45%', editable: false, columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
};

export const MASTER_CATEGORI_GANGGUAN = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    // { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_CATEGORI_GANGGUAN_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      // { name: 'status', type: 'string' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama', datafield: 'nama', width: '95%', editable: false, },
      // { text: 'Status Aktif', datafield: 'status', width: '45%', editable: false, columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
};

export const MASTER_STATUS_PROTEKSI = () => {
  return [
    { Header: 'No', accessor: 'number', width: '5%', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    // { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_STATUS_PROTEKSI_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      // { name: 'status', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'No', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama', datafield: 'nama', width: '95%', editable: false, },
      // { text: 'Status Aktif', datafield: 'status', width: '45%', editable: false, columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
};

export const MASTER_DISPATCHER = () => {
  return [
    { Header: 'No', accessor: 'number', width: '5%', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Jenis', accessor: 'jenis', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DISPATCHER_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'jenis', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'No', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama', datafield: 'nama', width: '50%', editable: false, },
      { text: 'Jenis', datafield: 'jenis', width: '45%', editable: false, },

    ],
  };
};