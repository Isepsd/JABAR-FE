// import { SliderColumnFilter } from '@app/components/ReactTable/ReactTableFilter';


export const USERS_MANAGEMENT_COLUMNS_JQX = () => {
  
  return {
    datafields: [
      { name: "number", type: "number" },
      { name: "fullname", type: "string" },
      { name: "username", type: "string" },
      { name: "fullname_username", type: "string" },
      { name: "email", type: "string" },
      { name: "level", type: "string" },
      { name: "role", type: "string" },
      { name: "unit", type: "string" },
      { name: "status", type: "string" },
      { name: "id_user", type: "string" },
    ],
    columns: [
      { text: "NO", datafield: "number", width: "3%", editable: false },
      { 
        text: "Nama", 
        datafield: "fullname_username", 
        width: "20%", 
        editable: false,
      
      },
      {
        text: "Email",
        datafield: "email",
        width: "20%",
        editable: false,
        
      },
      {
        text: "Level",
        datafield: "level",
        width: "15%",
        editable: false,
      },
      {
        text: "Role",
        datafield: "role",
        width: "15%",
        editable: false,
      },
      {
        text: "Unit Kerja",
        datafield: "unit",
        width: "20%",
        editable: false,
      },
      {
        text: "Status",
        datafield: "status",
        width: "7%",
        editable: false,
        cellsRenderer: function (row: any, column: any, value: any) {
          let backgroundColor = value === 'ACTIVE' ? 'red' : 'green';
          let color = 'white';

          return `<div style="background-color: ${backgroundColor}; color: ${color}; height: 30px; line-height: 30px; text-align: center;">
            ${value}
        </div>`;
        }
      },
    ],
  };
};


export const ACTION_COLUMN = () => {
  return [
    {
      Header: "Aksi",
      accessor: "action",
      minWidth: "7%",
      canFilter: false,
      show: true,
    },
  ];
};

export const USERS_MANAGEMENT_COLUMNS = () => {
  return [
    {
      Header: "Nama ",
      accessor: "fullname",
      minWidth: 300,
      filter: "fuzzyText",
      show: true,
    },
    // {
    //   Header: "Phone",
    //   accessor: "phone",
    //   minWidth: 200,
    //   filter: "fuzzyText",
    //   show: true,
    // },
    { Header: "Email", accessor: "email", show: true },
    { Header: "Level", accessor: "level", show: true },
    { Header: "Role", accessor: "role", canFilter: false, show: true },
    { Header: "Unit Kerja", accessor: "unit", canFilter: false, show: true },
    { Header: "Status", accessor: "status", canFilter: false, show: true },
    ...ACTION_COLUMN(),
  ];
};



export const ROLE_COLUMNS = () => {
  return [
    { Header: "Nama", accessor: "name", show: true, minWidth: "30%" },
    // {
    //   Header: 'Level',
    //   accessor: 'level',
    //   Filter: SliderColumnFilter,
    //   filter: 'equals',
    //   show: true,
    //   minWidth: '30%',
    // },
    {
      Header: "Deskripsi",
      accessor: "description",
      show: true,
      minWidth: "33%",
    },
    ...ACTION_COLUMN(),
  ];
};

export const ROLE_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: "number", type: "number" },
      { name: "name", type: "string" },
      { name: "description", type: "string" },
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: "NO", datafield: "number", width: "2%", editable: false },
      { text: "Nama", datafield: "name", width: "35%", editable: false },
      {
        text: "Deskripsi",
        datafield: "description",
        width: "63%",
        editable: false,
      },
    ],
  };
};
export const HIS_KALKUKASI_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: "number", type: "number" },
      { name: "id", type: "string" },
      { name: "datum", type: "string" },
      { name: "name", type: "string" },
      { name: "jenis", type: "string" },
      { name: "mulai_kalkulasi", type: "string" },
      { name: "selesai_kalkulasi", type: "string" },
      { name: "status", type: "string" },
      
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: "NO", datafield: "number", width: "2%", editable: false },
      { text: "Datum Kalkulasi", datafield: "datum", width: "10%", editable: false },
      { text: "Nama Kalkulasi", datafield: "name", width: "15%", editable: false },
      { text: "Jenis", datafield: "jenis", width: "15%", editable: false },
      { text: "Tanggal Mulai", datafield: "mulai_kalkulasi", width: "10%", editable: false },
      { text: "Tanggal Selesai", datafield: "selesai_kalkulasi", width: "10%", editable: false },
      { text: "Status", datafield: "status", width: "10%", editable: false },
      
    ],
  };
};

export const MASTER_DATA_ASET_ASET = () => {
  return [
    {
      Header: "No Aset",
      accessor: "id_ref_aset",
      minWidth: 200,
      filter: "fuzzyText",
    },
    {
      Header: "Gruop Aset",
      accessor: "grup_aset",
      minWidth: 200,
      filter: "fuzzyText",
    },
    { Header: "Kategori", accessor: "jenis_aset" },
    { Header: "Nama Aset", accessor: "name", filter: "fuzzyText" },
    { Header: "Station", accessor: "station", filter: "fuzzyText" },
    { Header: "Bay", accessor: "bay", filter: "fuzzyText" },
    { Header: "Pengelola", accessor: "pengelola", filter: "fuzzyText" },
    { Header: "PIC", accessor: "pic", filter: "fuzzyText" },
    { Header: "No Seri", accessor: "no_seri", filter: "fuzzyText" },
    {
      Header: "Manufaktur",
      accessor: "id_aset_manufaktur",
      filter: "fuzzyText",
    },
    { Header: "Tipe", accessor: "tipe", filter: "fuzzyText" },
    { Header: "Tahun", accessor: "tahun", filter: "fuzzyText" },
    { Header: "Status Aset", accessor: "status", canfilter: false },
    ...ACTION_COLUMN(),
  ];
};

/* MASTER DATA ASET STATUS, LEVEL, KONDISI,RAK */
export const MASTER_DATA_STATUS_ASET = () => {
  return [
    { Header: "Nama", accessor: "nama", minWidth: 200, filter: "fuzzyText" },
    {
      Header: "Status",
      accessor: "status",
      minWidth: 100,
      filter: "fuzzyText",
    },
    {
      Header: "Tanggal Buat",
      accessor: "tgl_entri",
      minWidth: 100,
      canfilter: false,
    },
    {
      Header: "Tanggal Ubah",
      accessor: "tgl_update",
      minWidth: 100,
      canfilter: false,
    },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_JENIS_ASET = () => {
  return [
    { Header: "Nama", accessor: "nama", minWidth: 200, filter: "fuzzyText" },
    {
      Header: "Status",
      accessor: "status",
      minWidth: 100,
      filter: "fuzzyText",
    },
    {
      Header: "Tree Jaringan",
      accessor: "tree_jaringan",
      minWidth: 100,
      canfilter: false,
    },
    {
      Header: "Tanggal Buat",
      accessor: "tgl_entri",
      minWidth: 100,
      canfilter: false,
    },
    {
      Header: "Tanggal Ubah",
      accessor: "tgl_update",
      minWidth: 100,
      canfilter: false,
    },
    ...ACTION_COLUMN(),
  ];
};
