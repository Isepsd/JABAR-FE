import { ACTION_COLUMN } from './_more.columns.config';

/* MASTER DATA ASET STATUS, LEVEL, KONDISI,RAK */
export const MASTER_DATA_DEPARTEMENT = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_DEPARTEMENT_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '4%', editable: false, },
      { text: 'Nama', datafield: 'nama', width: '96%', editable: false, }
    ],
  };
};

export const MASTER_DATA_PERUSAHAAN = () => {
  return [
    { Header: 'Nama Perusahaan', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Direktur', accessor: 'nama_direktur', minWidth: 200, disableFilters: true, show: true },
    { Header: 'email', accessor: 'email', minWidth: 200, disableFilters: true, show: true },
    { Header: 'alamat', accessor: 'alamat_kantor', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_PERUSAHAAN_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'number' },
      { name: 'nama_direktur', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'no_hp', type: 'string' },
      { name: 'alamat_kantor', type: 'string' },


    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama Perusahaan', datafield: 'nama', width: '15%', editable: false, },
      { text: 'Direktur', datafield: 'nama_direktur', width: '15%', editable: false, },
      { text: 'Email', datafield: 'email', width: '15%', editable: false, },
      { text: 'NO HP', datafield: 'no_hp', width: '15%', editable: false, },
      { text: 'Alamat', datafield: 'alamat_kantor', width: '35%', editable: false, }

    ],
  };
};

export const MASTER_DATA_JABATAN = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_JABATAN_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '4%', editable: false, },
      { text: 'Nama', datafield: 'nama', width: '96%', editable: false, }

    ],
  };
};


export const REGU_PETUGAS = () => {
  return [
    { Header: 'Nama', accessor: 'name', minWidth: 200, disableFilters: false, show: true },
    ...ACTION_COLUMN(),
  ];
};
export const REGU_PETUGAS_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'name', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '4%', editable: false, },
      { text: 'Nama', datafield: 'name', width: '96%', editable: false, }

    ],
  };
};
export const PETUGAS_REGU = () => {
  return [
    { Header: 'Nama Petugas', accessor: 'petugas', minWidth: 200, disableFilters: false, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: false, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const PETUGAS_REGU_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'fullname', type: 'string' },
      { name: 'regu', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '10%', editable: false, },
      { text: 'Nama Petugas', datafield: 'fullname', width: '45%', editable: false, },
      { text: 'Regu', datafield: 'regu', width: '45%', editable: false, }

    ],
  };
};
