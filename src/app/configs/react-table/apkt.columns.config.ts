import { HEADER_EXTRA_TREE, HEADER_EXTRA_TREE_LAPORAN } from "./master-jaringan.columns.config";
import { ACTION_COLUMN } from "./_more.columns.config";

export const TEST_COLUMNS = () => {
  return {}
};
export const PENGIRIMAN_STATUS_GARDU = () => {
  return [
    {
      Header: 'No',
      accessor: 'number',
      Width: 20,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Laporan',
      accessor: 'tgl_laporan',
      minWidth: 170,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Jenis Laporan',
      accessor: 'jenis_laporan',
      minWidth: 140,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'No APKT',
      accessor: 'no_apkt',
      minWidth: 100,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status',
      accessor: 'status_laporan',
      minWidth: 100,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Nama',
      accessor: 'nama_laporan',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Nama CD/SECTION',
      accessor: 'section',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status Listrik',
      accessor: 'status_data',
      minWidth: 140,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Status Listrik',
      accessor: 'tgl_status_data',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    { Header: 'Jumlah GD Masih Padam', minWidth: 220, accessor: 'jlh_gardu_padam', show: true, disableFilters: true },
    { Header: 'Jumlah GD Sudah Nyala', minWidth: 220, accessor: 'jlh_gardu_nyala', canFilter: false, show: true, disableFilters: true },
    ...ACTION_COLUMN()
  ];
};

export const PENGIRIMAN_STATUS_LIST_GARDU = () => {
  return [
    {
      Header: 'No ',
      accessor: 'number',
      minWidth: 30,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Gardu',
      accessor: 'gardu',
      minWidth: 100,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Zone',
      accessor: 'zone',
      minWidth: 100,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Section',
      accessor: 'section',
      minWidth: 100,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Segment',
      accessor: 'segment',
      minWidth: 100,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'UP3',
      accessor: 'up3_1',
      minWidth: 100,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Alamat',
      accessor: 'alamat',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Padam',
      accessor: 'tgl_padam',
      minWidth: 170,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Status Listrik',
      accessor: 'tgl_mulai_apkt_kirim_padam',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status Listrik',
      accessor: 'status_data',
      minWidth: 140,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Kirim APKT',
      accessor: 'tgl_apkt_kirim_padam',
      minWidth: 190,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status Kirim APKT',
      accessor: 'status_apkt_kirim_padam',
      minWidth: 190,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Pesan Status Kirim APKT',
      accessor: 'pesan_status_apkt',
      minWidth: 220,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    ...ACTION_COLUMN()
  ];
};
export const PENGIRIMAN_STATUS_LOG_GARDU = () => {
  return [
    {
      Header: 'No',
      accessor: 'number',
      minWidth: 30,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Mulai',
      accessor: 'tgl_mulai',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Selesai',
      accessor: 'tgl_selesai',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Server',
      accessor: 'server',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Web Service',
      accessor: 'webservice',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Param Input ke APKT',
      accessor: 'input_apkt',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Respone dari APKT',
      accessor: 'output_apkt',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
  ];
};


export const MONITORING_GARDU = () => {
  return [
    {
      Header: 'No',
      accessor: 'number',
      minWidth: '20px',
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status Listrik',
      accessor: 'status',
      minWidth: '30px',
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Status Listrik',
      accessor: 'datetime_status_1',
      minWidth: '150px',
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Point Number',
      accessor: 'point_number',
      minWidth: '50px',
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Lokasi (B1)',
      accessor: 'path1',
      minWidth: '30px',
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Nama Gardu',
      accessor: 'path2',
      minWidth: '30px',
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Alamat',
      accessor: 'alamat',
      minWidth: '350px',
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Penyulang',
      accessor: 'feeder',
      minWidth: '150px',
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    ...ACTION_COLUMN()
  ];
};

export const MONITORING_GARDU_JQ = () => {
  return {
    columns:[
    {
      text: 'No',
      datafield: 'number',
      width: '3%',
      
    },
    {
      text: 'Status Listrik',
      datafield: 'status',
      width: '10%',
      cellsrenderer: function(row:any, columnfield:any, value:any, defaulthtml:any, columnproperties:any, rowdata:any) {
        const badgeClassName = `w-100 badge badge-${rowdata.status_2 === 'up' ? 'success' : 'danger'}`;
        const badgeText = rowdata.status_2 === 'up' ? 'Nyala' : 'Padam';
        return `<span class="${badgeClassName}">${badgeText}</span>`;
      }
    },
    {
      text: 'Tanggal Status Listrik',
      datafield: 'datetime_status_1',
      width: '17%',
      
    },
    {
      text: 'Point Number',
      datafield: 'point_number',
      width: '10%',
      
    },
    {
      text: 'Lokasi (B1)',
      datafield: 'path1',
      width: '15%',
      
    },
    {
      text: 'Nama Gardu',
      datafield: 'path2',
      width: '10%',
      
    },
    {
      text: 'Alamat',
      datafield: 'alamat',
      width: '20%',
      
    },
    {
      text: 'Penyulang',
      datafield: 'feeder',
      width: '20%',
      
    },
  ],
datafields:[
  {
    name: 'status',
    type:"string"
  },
  {
    name: 'datetime_status_1',
    type:"string"
  },
  {
    name: 'point_number',
    type:"string"
  },
  {
    name: 'path1',
    type:"string"
  },
  {
    name: 'path2',
    type:"string"
  },
  {
    name: 'alamat',
    type:"string"
  },
  {
    name: 'feeder',
    type:"string"
  },
],
};
};

export const MAPPING_GARDU_JQ = () => {
  return {
    columns:[
    {
      text: 'No',
      datafield: 'number',
      width: '3%',
      
    },
    {
      text: 'Status Listrik',
      datafield: 'status',
      width: '10%',
      cellsrenderer: function(row:any, columnfield:any, value:any, defaulthtml:any, columnproperties:any, rowdata:any) {
        const badgeClassName = `w-100 badge badge-${rowdata.status_2 === 'up' ? 'success' : 'danger'}`;
        const badgeText = rowdata.status_2 === 'up' ? 'Nyala' : 'Padam';
        return `<span class="${badgeClassName}">${badgeText}</span>`;
      }
    },
    {
      text: 'Tanggal Status Listrik',
      datafield: 'datetime_status_1',
      width: '17%',
      
    },
    {
      text: 'Pkey',
      datafield: 'pkey',
      width: '10%',
      
    },
    {
      text: 'Name',
      datafield: 'path1',
      width: '10%',
      
    },
    {
      text: 'Gardu MJD',
      datafield: 'path2',
      width: '10%',
      
    },
    {
      text: 'Server',
      datafield: 'server',
      width: '20%',
      
    },
    {
      text: 'Aktif',
      datafield: 'aktif',
      columntype: "checkbox",
      filtertype: "bool",
      width: '20%',
      
    },
    {
      text: 'Penyulang',
      datafield: 'penyulang',
      width: '20%',
      
    },
    {
      text: 'GI',
      datafield: 'gi',
      width: '20%',
      
    },
    {
      text: 'Area',
      datafield: 'area',
      width: '20%',
      
    },
    {
      text: 'Alamat',
      datafield: 'alamat',
      width: '20%',
      
    },
  ],
datafields:[
  {
    name: 'status',
    type:"string"
  },
  {
    name: 'datetime_status_1',
    type:"string"
  },
  {
    name: 'point_number',
    type:"string"
  },
  {
    name: 'path1',
    type:"string"
  },
  {
    name: 'path2',
    type:"string"
  },
  {
    name: 'server',
    type:"string"
  },
  {
    name: 'aktif',
    type:"string"
  },
  {
    name: 'penyulang',
    type:"string"
  },
  {
    name: 'gi',
    type:"string"
  },
  {
    name: 'area',
    type:"string"
  },
  {
    name: 'alamat',
    type:"string"
  },
],
};
};

export const LAPORAN_RENHAR_JQ = () => {
  return {
    columns:[
    {
      text: 'No',
      datafield: 'number',
      width: '3%',
      
    },
    {
      text: 'Tgl Approve',
      datafield: 'status',
      width: '10%',
      
    },
    {
      text: 'Nama Laporan',
      datafield: 'datetime_status_1',
      width: '17%',
      
    },
    {
      text: 'Gardu',
      datafield: 'pkey',
      width: '10%',
      
    },
    {
      text: 'Penyulang',
      datafield: 'path1',
      width: '10%',
      
    },
    {
      text: 'GI',
      datafield: 'path2',
      width: '10%',
      
    },
    {
      text: 'No APKT',
      datafield: 'server',
      width: '20%',
      
    },
    {
      text: 'Tgl Kirim APKT',
      datafield: 'aktif',
      columntype: "checkbox",
      filtertype: "bool",
      width: '20%',
      
    },
    {
      text: 'Status Kirim APKT',
      datafield: 'penyulang',
      width: '20%',
      
    },
    {
      text: 'Pesan Status Kirim APKT',
      datafield: 'gi',
      width: '20%',
      
    },
    {
      text: 'Pelaksana',
      datafield: 'area',
      width: '20%',
      
    },
    {
      text: 'Mulai Pelaksanaan',
      datafield: 'alamat',
      width: '20%',
      
    },
    {
      text: 'Selesai Pelaksanaan',
      datafield: 'selesai_p',
      width: '20%',
      
    },
    {
      text: 'Wilayah Padam',
      datafield: 'wilayah_p',
      width: '20%',
      
    },
  ],
datafields:[
  {
    name: 'status',
    type:"string"
  },
  {
    name: 'datetime_status_1',
    type:"string"
  },
  {
    name: 'point_number',
    type:"string"
  },
  {
    name: 'path1',
    type:"string"
  },
  {
    name: 'path2',
    type:"string"
  },
  {
    name: 'server',
    type:"string"
  },
  {
    name: 'aktif',
    type:"string"
  },
  {
    name: 'penyulang',
    type:"string"
  },
  {
    name: 'gi',
    type:"string"
  },
  {
    name: 'area',
    type:"string"
  },
  {
    name: 'alamat',
    type:"string"
  },
  {
    name: 'selesai_p',
    type:"string"
  },
  {
    name: 'wilayah_p',
    type:"string"
  },
],
};
};

export const MONITORING_GARDU_DETAIL = () => {
  return [
    {
      Header: 'No',
      accessor: 'number',
      minWidth: 30,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Waktu Awal',
      accessor: 'datetime_status_1',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status Awal',
      accessor: 'status_awal',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true,
      
    },
    {
      Header: 'Waktu Akhir',
      accessor: 'datetime_status_2',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status Akhir',
      accessor: 'status_akhir',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
      
    },
    {
      Header: 'Durasi (dd:hh:mm:ss)',
      accessor: 'durasi',
      minWidth: 170,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
  ];
};

export const MONITORING_GARDU_DETAIL_JQ = () => {
  return {
    columns:[
    {
      text: 'No',
      datafield: 'number',
      width: '3%',
    },
    {
      text: 'Waktu Awal',
      datafield: 'datetime_status_1',
      width: '17%',
    },
    {
      text: 'Status Awal',
      datafield: 'status_awal',
      width: '20%',
      cellsrenderer: function(row:any, columnfield:any, value:any, defaulthtml:any, columnproperties:any, rowdata:any) {
        const badgeClassName = `w-100 badge badge-${rowdata.status_awal === "Nyala" ? 'success' : 'danger'}`;
        const badgeText = rowdata.status_awal === "Nyala" ? 'Nyala' : 'Padam';
        return `<span class="${badgeClassName}">${badgeText}</span>`;
      }
    },
    {
      text: 'Waktu Akhir',
      datafield: 'datetime_status_2',
      width: '20%',
    },
    {
      text: 'Status Akhir',
      datafield: 'status_akhir',
      width: '20%',
      cellsrenderer: function(row:any, columnfield:any, value:any, defaulthtml:any, columnproperties:any, rowdata:any) {
        const badgeClassName = `w-100 badge badge-${rowdata.status_akhir === "Nyala" ? 'success' : 'danger'}`;
        const badgeText = rowdata.status_akhir === "Nyala" ? 'Nyala' : 'Padam';
        return `<span class="${badgeClassName}">${badgeText}</span>`;
      }
    },
    {
      text: 'Durasi (dd:hh:mm:ss)',
      datafield: 'durasi',
      width: '20%',
    },
  ],
    datafields:[
  {
    name: 'datetime_status_1',
    type: "string"
  },
  {
    name: 'status_awal',
    type: "string"
  },
  {
    name: 'datetime_status_2',
    type: "string"
  },
  {
    name: 'status_akhir',
    type: "string"
  },
  {
    name: 'durasi',
    type: "string"
  },
]
};
};

export const MAPPING_GARDU_DETAIL_JQ = () => {
  return {
    columns:[
    {
      text: 'No',
      datafield: 'number',
      width: '3%',
    },
    {
      text: 'Status Awal',
      datafield: 'status_awal',
      width: '20%',
      cellsrenderer: function(row:any, columnfield:any, value:any, defaulthtml:any, columnproperties:any, rowdata:any) {
        const badgeClassName = `w-100 badge badge-${rowdata.status_awal === "Nyala" ? 'success' : 'danger'}`;
        const badgeText = rowdata.status_awal === "Nyala" ? 'Nyala' : 'Padam';
        return `<span class="${badgeClassName}">${badgeText}</span>`;
      }
    },
    {
      text: 'Tanggal Awal',
      datafield: 'datetime_status_1',
      width: '17%',
    },
    {
      text: 'Status Akhir',
      datafield: 'status_akhir',
      width: '20%',
      cellsrenderer: function(row:any, columnfield:any, value:any, defaulthtml:any, columnproperties:any, rowdata:any) {
        const badgeClassName = `w-100 badge badge-${rowdata.status_akhir === "Nyala" ? 'success' : 'danger'}`;
        const badgeText = rowdata.status_akhir === "Nyala" ? "Nyala" : "Padam";
        return `<span class="${badgeClassName}">${badgeText}</span>`;
      }
    },
    {
      text: 'Tanggal Akhir',
      datafield: 'datetime_status_2',
      width: '20%',
    },
    // {
    //   text: 'Durasi (dd:hh:mm:ss)',
    //   datafield: 'durasi',
    //   width: '20%',
    // },
  ],
    datafields:[
  {
    name: 'status_awal',
    type: "string"
  },
  {
    name: 'datetime_status_1',
    type: "string"
  },
  {
    name: 'status_akhir',
    type: "string"
  },
  {
    name: 'datetime_status_2',
    type: "string"
  },
  // {
  //   name: 'durasi',
  //   type: "string"
  // },
]
};
};

export const LAPORAN_RENHAR_DETAIL_JQ = () => {
  return {
    columns:[
    {
      text: 'No',
      datafield: 'number',
      width: '3%',
    },
    {
      text: 'Gardu',
      datafield: 'status_awal',
      width: '20%',
    },
    {
      text: 'No APKT',
      datafield: 'datetime_status_1',
      width: '17%',
    },
    {
      text: 'Tgl Kirim APKT',
      datafield: 'status_akhir',
      width: '20%',
    },
    {
      text: 'Status Kirim APKT',
      datafield: 'datetime_status_2',
      width: '20%',
    },
    {
      text: 'Pesan Status Kirim APKT',
      datafield: 'durasi',
      width: '20%',
    },
  ],
    datafields:[
  {
    name: 'status_awal',
    type: "string"
  },
  {
    name: 'datetime_status_1',
    type: "string"
  },
  {
    name: 'status_akhir',
    type: "string"
  },
  {
    name: 'datetime_status_2',
    type: "string"
  },
  {
    name: 'durasi',
    type: "string"
  },
]
};
};

export const MONITORING_GARDU_SCADA = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: 30, filter: 'fuzzyText', show: true, disableFilters: true},
    { Header: 'Time Stamp', accessor: 'time_stamp', minWidth: 150, filter: 'fuzzyText', show: true, disableFilters: true },
    { Header: 'Msec', accessor: 'msec', minWidth: 150, filter: 'fuzzyText', show: true, disableFilters: true },
    { Header: 'Point Number', accessor: 'point_number', minWidth: 150, filter: 'fuzzyText', show: true, disableFilters: true },
    { Header: 'Value', accessor: 'value', minWidth: 170, filter: 'fuzzyText', show: true, disableFilters: true },
    { Header: 'Source', accessor: 'source', minWidth: 150, filter: 'fuzzyText', show: true, disableFilters: true },
    { Header: 'Quality code scada', accessor: 'quality_code_scada', minWidth: 170, filter: 'fuzzyText', show: true, disableFilters: true },
    { Header: 'Quality Code', accessor: 'quality_code', minWidth: 170, filter: 'fuzzyText', show: true, disableFilters: true },
    { Header: 'System Time Stamp', accessor: 'system_time_stamp', minWidth: 170, filter: 'fuzzyText', show: true, disableFilters: true },
    { Header: 'System Msec', accessor: 'system_msec', minWidth: 170, filter: 'fuzzyText', show: true, disableFilters: true },
  ];
};


export const MONITORING_GARDU_SCADA_JQ = () => {
  return {
    columns:[
    { text: 'No', datafield: 'number', width: '3%'},
    { text: 'Time Stamp', datafield: 'time_stamp', width: '10%' },
    { text: 'Msec', datafield: 'msec', width: '10%' },
    { text: 'Point Number', datafield: 'point_number', width: '10%' },
    { text: 'Value', datafield: 'value', width: '17%' },
    { text: 'Source', datafield: 'source', width: '10%' },
    { text: 'Quality code scada', datafield: 'quality_code_scada', width: '10%' },
    { text: 'Quality Code', datafield: 'quality_code', width: '10%' },
    { text: 'System Time Stamp', datafield: 'system_time_stamp', width: '10%' },
    { text: 'System Msec', datafield: 'system_msec', width: '10%' },
    ],
  datafields:[
    { name: 'time_stamp', type: "string" },
    { name: 'msec', type: "string" },
    { name: 'point_number', type: "string" },
    { name: 'value', type: "string" },
    { name: 'source', type: "string" },
    { name: 'quality_code_scada', type: "string" },
    { name: 'quality_code', type: "string" },
    { name: 'system_time_stamp', type: "string" },
    { name: 'system_msec', type: "string" },
  ]
};
};

export const PENGIRIMAN_HAR = () => {
  return [
    {
      Header: 'No',
      accessor: 'number',
      minWidth: 30,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    // {
    //   Header: 'Tanggal Approve',
    //   accessor: 'tgl_approve',
    //   minWidth: 170,
    //   filter: 'fuzzyText',
    //   show: true,
    //   disableFilters: true
    // },
    {
      Header: 'Nama Laporan',
      accessor: 'nama_laporan',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Gardu',
      accessor: 'gardu',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Penyulang',
      accessor: 'penyulang',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'GI',
      accessor: 'gardu_induk',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'No APKT',
      accessor: 'no_apkt',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Kirim APKT',
      accessor: 'tgl_apkt_kirim',
      minWidth: 190,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status Kirim APKT',
      accessor: 'status_apkt_kirim',
      minWidth: 190,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Pesan Status Kirim APKT',
      accessor: 'pesan_kirim_apkt',
      minWidth: 220,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Pelaksana',
      accessor: 'pelaksana',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Mulai Pelaksana',
      accessor: 'tgl_mulai',
      minWidth: 180,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Selesai Pelaksana',
      accessor: 'selesai_pelaksana',
      minWidth: 180,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Wilayah Padam',
      accessor: 'wilayah_padam',
      minWidth: 180,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Action',
      accessor: 'action',
      minWidth: 100,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
  ];
};

export const PENGIRIMAN_HAR_DETAIL = () => {
  return [
    {
      Header: 'No',
      accessor: 'number',
      minWidth: 30,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Gardu',
      accessor: 'gardu',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'No APKT',
      accessor: 'no_apkt',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Kirim APKT',
      accessor: 'tgl_kirim_apkt',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status Kirim APKT',
      accessor: 'status_kirim_apkt',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Pesan Status Kirim APKT',
      accessor: 'res_apkt_kirim',
      minWidth: 150,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
  ];
};


export const MONITORING_APKT_JQ = () => {
  return {
    datafields: [
      { name: 'id', type: 'int' },
      { name: 'tgl_laporan', type: 'string' },
      { name: 'jenis_laporan', type: 'string' },
      { name: 'no_apkt', type: 'string' },
      { name: 'status_laporan', type: 'string' },
      { name: 'nama_laporan', type: 'string' },
      { name: 'lokasi', type: 'string' },
      { name: 'status_data', type: 'string' },
      // { name: 'tgl_status_data', type: 'string' },
      { name: 'tgl_nyala_awal', type: 'string' },
      { name: 'jlh_gardu_padam', type: 'string' },
      { name: 'jlh_gardu_nyala', type: 'string' },



    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Tgl Laporan', datafield: 'tgl_laporan', width: '15%', editable: false, },
      { text: 'Jenis Laporan', datafield: 'jenis_laporan', width: '13%', editable: false, },
      { text: 'No APKT', datafield: 'no_apkt', width: '20%', editable: false },
      { text: 'Status', datafield: 'status_laporan', width: '10%', editable: false },
      // {
      //   text: 'Status',
      //   datafield: 'status_laporan',
      //   width: '10%',
      //   editable: false,
      //   // columntype: 'checkbox',
      //   filtertype: 'bool',
      //   cellsrenderer: function(row:any, columnfield:any, value:any,  ) {
      //     const badgeClassName = `w-100 badge badge-${value ? 'success' : 'danger'}`;
      //     const badgeText = value ? 'Open' : 'Close';
      //     return `<span class="${badgeClassName}">${badgeText}</span>`;
      //   }
      // },
      { text: 'Nama', datafield: 'nama_laporan', width: '20%', editable: false },
      { text: 'Lokasi', datafield: 'lokasi', width: '20%', editable: false },
      {
        text: 'Status Listrik',
        datafield: 'status_data',
        width: '10%',
        editable: false,
        cellsrenderer: function(row:any, columnfield:any, value:any, defaulthtml:any, columnproperties:any, rowdata:any) {
          const badgeClassName = `w-100 badge badge-${rowdata.jlh_gardu_padam === 0 ? 'success' : 'danger'}`;
          const badgeText = rowdata.jlh_gardu_padam === 0 ? 'Nyala' : 'Padam';
          return `<span class="${badgeClassName}">${badgeText}</span>`;
        }
      },
      { text: 'Tanggal Status Listrik', datafield: 'tgl_nyala_awal', width: '20%', editable: false },
      { text: 'Jumlah GD Masih Padam', datafield: 'jlh_gardu_padam', width: '10%', editable: false },
      { text: 'Jumlah GD Masih Nyala', datafield: 'jlh_gardu_nyala', width: '15%', editable: false },


    ],
  };
};




export const MONITORING_APKT_DETAIL_NYALA_JQ = () => {
  return {
    datafields: [
      { name: 'id_apkt_trans_jar_det', type: 'int' },
      { name: 'gardu_mjd', type: 'string' },
      { name: 'tgl_padam', type: 'string' },
      { name: 'tgl_nyala', type: 'string' },
      { name: 'status_listrik', type: 'string' },
      { name: 'up3', type: 'string' },
      { name: 'tgl_apkt_kirim_nyala', type: 'string' },
      { name: 'status_apkt_kirim_nyala', type: 'string' },
      { name: 'res_apkt_kirim_nyala', type: 'string' },




    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Jenis Laporan', datafield: 'gardu_mjd', width: '30%', editable: false, },
      { text: 'Tgl Padam', datafield: 'tgl_padam', width: '15%', editable: false, },
      { text: 'Tgl Nyala', datafield: 'tgl_nyala', width: '15%', editable: false, },
      { text: 'Status', datafield: 'status_listrik', width: '15%', editable: false, },
      { text: 'UP3', datafield: 'up3', width: '5%', editable: false, },
      { text: 'Tanggal Kirim APKT', datafield: 'tgl_apkt_kirim_nyala', width: '15%', editable: false, },
      { text: 'Status Kirim APKT', datafield: 'status_apkt_kirim_nyala', width: '15%', editable: false, },
      { text: 'Pesan Status Kirim APKT', datafield: 'res_apkt_kirim_nyala', width: '15%', editable: false, },




    ],
  };
};




export const PENGIRIMAN_STATUS_LOG_GARDU_JQ = () => {
  return {
    datafields: [
      { name: 'id_apkt_trans_jar_det', type: 'int' },
      { name: 'tgl_mulai', type: 'string' },
      { name: 'tgl_selesai', type: 'string' },
      { name: 'server', type: 'string' },
      { name: 'webservice', type: 'string' },
      { name: 'input_apkt', type: 'string' },
      { name: 'output_apkt', type: 'string' },





    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Tanggal Mulai', datafield: 'tgl_mulai', width: '30%', editable: false, },
      { text: 'Tanggal Selesai', datafield: 'tgl_selesai', width: '15%', editable: false, },
      { text: 'Server', datafield: 'server', width: '15%', editable: false, },
      { text: 'Web Service', datafield: 'webservice', width: '15%', editable: false, },
      { text: 'Param Input ke APKT', datafield: 'input_apkt', width: '5%', editable: false, },
      { text: 'Respone dari APKT', datafield: 'output_apkt', width: '15%', editable: false, },




    ],
  };
};



export const MONITORING_APKT_DETAIL_PADAM_JQ = () => {
  return {
    datafields: [
      { name: 'id_apkt_trans_jar_det', type: 'string' },
      { name: 'id_parent_lokasi', type: 'string' },
      { name: 'gardu_mjd', type: 'string' },
      { name: 'tgl_padam', type: 'string' },
      { name: 'tgl_nyala', type: 'string' },
      { name: 'status_listrik', type: 'string' },
      { name: 'up3', type: 'string' },
      { name: 'tgl_mulai_apkt_kirim_padam', type: 'string' },
      { name: 'status_apkt_kirim_padam', type: 'string' },
      { name: 'res_apkt_kirim_padam', type: 'string' },
      { name: 'id_parent_lokasi', type: 'string' },




    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      // { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Jenis Laporan', datafield: 'gardu_mjd', width: '30%', editable: false, },
      { text: 'Tgl Padam', datafield: 'tgl_padam', width: '15%', editable: false, },
      { text: 'Tgl Nyala', datafield: 'tgl_nyala', width: '15%', editable: false, },
      { text: 'Status', datafield: 'status_listrik', width: '15%', editable: false, },
      { text: 'UP3', datafield: 'up3', width: '5%', editable: false, },
      { text: 'Tanggal Kirim APKT', datafield: 'tgl_mulai_apkt_kirim_padam', width: '15%', editable: false, },
      { text: 'Status Kirim APKT', datafield: 'status_apkt_kirim_padam', width: '15%', editable: false, },
      { text: 'Pesan Status Kirim APKT', datafield: 'res_apkt_kirim_padam', width: '15%', editable: false, },




    ],
    // hierarchy: { 
    //   keyDataField: 'id_apkt_trans_jar_det',
    //   parentDataField: 'id_parent_lokasi' }
  };
};


export const MONITORING_APKT = () => {
  return [
    {
      Header: 'No',
      accessor: 'number',
      minWidth: 30,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Laporan',
      accessor: 'tgl_laporan',
      minWidth: 170,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Jenis Laporan',
      accessor: 'jenis_laporan',
      minWidth: 140,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'No APKT',
      accessor: 'no_apkt',
      minWidth: 100,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status',
      accessor: 'status_laporan',
      minWidth: 100,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true,
      
    },
    {
      Header: 'Nama',
      accessor: 'nama_laporan',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },{
      Header: 'Lokasi',
      accessor: 'lokasi',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status Listrik',
      accessor: 'status_data',
      minWidth: 140,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Status Listrik',
      // accessor: 'tgl_status_data',
      accessor: 'tgl_nyala_terakhir',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    { Header: 'Jumlah GD Masih Padam', minWidth: 220, accessor: 'jlh_gardu_padam', show: true, disableFilters: true },
    { Header: 'Jumlah GD Sudah Nyala', minWidth: 220, accessor: 'jlh_gardu_nyala', canFilter: false, show: true, disableFilters: true },
    // ...ACTION_COLUMN()
  ];
};

const APKT_dETAIL_NYALA_PADAM: any = () => [
  {
    Header: 'Tanggal Nyala',
    accessor: 'tgl_nyala',
    minWidth: 200,
    filter: 'fuzzyText',
    show: true,
    disableFilters: true
  },
  {
    Header: 'Status Listrik',
    accessor: 'status_listrik',
    minWidth: 140,
    filter: 'fuzzyText',
    show: true,
    disableFilters: true
  },
  {
    Header: 'UP3',
    accessor: 'up3',
    minWidth: 100,
    filter: 'fuzzyText',
    show: true,
    disableFilters: true
  },
  {
    Header: 'Tanggal Kirim APKT',
    accessor: 'tgl_mulai_apkt_kirim_padam',
    minWidth: 190,
    filter: 'fuzzyText',
    show: true,
    disableFilters: true
  },
  {
    Header: 'Status Kirim APKT',
    accessor: 'status_apkt_kirim_padam',
    minWidth: 190,
    filter: 'fuzzyText',
    show: true,
    disableFilters: true
  },
  {
    Header: 'Pesan Status Kirim APKT',
    accessor: 'res_apkt_kirim_padam',
    minWidth: 220,
    filter: 'fuzzyText',
    show: true,
    disableFilters: true
  },
]

export const MONITORING_APKT_DETAIL_PADAM = () => {
  return [
    ...HEADER_EXTRA_TREE(),
    {
      Header: 'Jenis Laporan',
      accessor: 'jenis_laporan',
      minWidth: 170,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Padam',
      accessor: 'tgl_padam',
      minWidth: 170,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    ...APKT_dETAIL_NYALA_PADAM(),
    // ...ACTION_COLUMN()
  ];
};

export const FORM_INPUT_LAPORAN = () => {
  return [
    ...HEADER_EXTRA_TREE_LAPORAN(),
    // {
    //   Header: 'Kode',
    //   accessor: 'kode_lokasi',
    //   minWidth: 170,
    //   filter: 'fuzzyText',
    //   show: true,
    //   disableFilters: true
    // },
    {
      Header: 'Parent ID',
      accessor: 'id_parent_lokasi',
      minWidth: 170,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    // {
    //   Header: 'Aset',
    //   accessor: 'nama_lokasi',
    //   minWidth: 170,
    //   filter: 'fuzzyText',
    //   show: true,
    //   disableFilters: true
    // },
    // {
    //   Header: 'Jenis Aset',
    //   accessor: 'fungsi_lokasi',
    //   minWidth: 170,
    //   filter: 'fuzzyText',
    //   show: true,
    //   disableFilters: true
    // },
  ];
};

export const FORM_INPUT_LAPORANJQ = () => {
  return {
    datafields: [
      { name: "id_ref_lokasi", type: "string" },
      { name: "nama_lokasi", type: "string" },
      { name: "kode_lokasi", type: "string" },
      { name: "fungsi_lokasi", type: "string" },
      { name: "id_parent_lokasi", type: "string" },
    ],
    columns: [
      { text: "Aset", datafield: "nama_lokasi", width: 450 },
      { text: "Kode Aset", datafield: "kode_lokasi", width: 150 },
      { text: "Jenis Aset", datafield: "fungsi_lokasi", width: 150 },
      { text: "Parent ID", datafield: "id_parent_lokasi", width: 150 },
    ],
  };
};

export const FORM_INPUT_LAPORAN_NEW_JQ = () => {
  return {
    datafields: [
      { name: "id_ref_lokasi", type: "string" },
      { name: "nama_lokasi", type: "string" },
      { name: 'children', type: 'array' },
      { name: "kode_lokasi", type: "string" },
      { name: "fungsi_lokasi", type: "string" },
      { name: "id_parent_lokasi", type: "string" },
      { name: 'children', type: 'array' },
    ],
    columns: [
      { text: "Aset", datafield: "nama_lokasi", width: 450 },
      { text: "Kode Aset", datafield: "kode_lokasi", width: 150 },
      { text: "Jenis Aset", datafield: "fungsi_lokasi", width: 150 },
      { text: "Parent ID", datafield: "id_parent_lokasi", width: 150 },
    ],
    hierarchy: { root: 'children' }
  };
};

export const MONITORING_APKT_DETAIL_NYALA = () => {
  return [
    ...HEADER_EXTRA_TREE(),
    {
      Header: 'Jenis Laporan',
      accessor: 'jenis_laporan',
      minWidth: 170,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Padam',
      accessor: 'tgl_padam',
      minWidth: 170,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Nyala',
      accessor: 'tgl_nyala',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    }, 
    {
      Header: 'Status Listrik',
      accessor: 'status_listrik',
      minWidth: 140,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'UP3',
      accessor: 'up3',
      minWidth: 100,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Kirim APKT',
      accessor: 'tgl_apkt_kirim_nyala',
      minWidth: 190,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status Kirim APKT',
      accessor: 'status_apkt_kirim_nyala',
      minWidth: 190,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Pesan Status Kirim APKT',
      accessor: 'res_apkt_kirim_nyala',
      minWidth: 220,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    // ...ACTION_COLUMN()
  ];
};


export const INTEGRASI_MON_COLUMN = () => {
  return [
    {
      Header: 'ID',
      accessor: 'id',
      minWidth: 5,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Nama Proses',
      accessor: 'nama_proses',
      minWidth: 300,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Tanggal Update',
      accessor: 'tgl_update',
      minWidth: 100,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Status',
      accessor: 'status',
      minWidth: 80,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },   
  ];
};


export const MONITORING_GARDU_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'status_data', type: 'string' },
      { name: 'tgl_status', type: 'string' },
      { name: 'point_number', type: 'number' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'alamat', type: 'string' },
      { name: 'feeder', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Status Listrik', datafield: 'status_data', width: '12%', editable: false, columntype: 'checkbox', filtertype: 'bool' },
      { text: 'Tanggal Status Listrik', datafield: 'tgl_status', width: '15%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '10%', editable: false, },
      { text: 'Lokasi (B1)', datafield: 'path1', width: '15%', editable: false, },
      { text: 'Nama Gardu', datafield: 'path2', width: '15%', editable: false, },
      { text: 'Alamat', datafield: 'alamat', width: '20%', editable: false, },
      { text: 'Penyulang', datafield: 'feeder', width: '10%', editable: false, }


    ],
  };
};



export const MONITORING_GARDU_DETAIL_PAGE_JQX = () => {
  // Define the cellsrenderer function
  const cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any,): string => {
    if (value === 'Padam') {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
    } else {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
    }
  };

  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'datetime_awal', type: 'string' },
      { name: 'status_awal', type: 'string' },
      { name: 'datetime_akhir', type: 'string' },
      { name: 'status_akhir', type: 'string' },
      { name: 'durasi', type: 'string' },
    ],

    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Waktu Awal', datafield: 'datetime_awal', width: '17%', editable: false, },
      {
        text: 'Status Awal',
        datafield: 'status_awal',
        width: '20%',
        editable: false,
        cellsrenderer: cellsrenderer, // Add the cellsrenderer function here
      },
      { text: 'Waktu Akhir', datafield: 'datetime_akhir', width: '20%', editable: false, },
      { text: 'Status Akhir', datafield: 'status_akhir', width: '20%', editable: false, cellsrenderer: cellsrenderer, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: '20%', editable: false, },
    ],
  };
};


export const MONITORING_GARDU_HISTORI_DETAIL_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'time_stamp', type: 'string' },
      { name: 'msec', type: 'string' },
      { name: 'point_number', type: 'string' },
      { name: 'value', type: 'string' },
      { name: 'source', type: 'string' },
      { name: 'quality_code_scada', type: 'string' },
      { name: 'quality_code', type: 'string' },
      { name: 'system_time_stamp', type: 'string' },
      { name: 'system_msec', type: 'string' },

    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Time Stamp', datafield: 'time_stamp', width: '12%', editable: false, },
      { text: 'Msec', datafield: 'msec', width: '10%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '10%', editable: false, },
      { text: 'Value', datafield: 'value', width: '10%', editable: false, },
      { text: 'Source', datafield: 'source', width: '10%', editable: false, },
      { text: 'Quality Code Scada', datafield: 'quality_code_scada', width: '10%', editable: false, },
      { text: 'Quality Code', datafield: 'quality_code', width: '10%', editable: false, },
      { text: 'System Time Stamp', datafield: 'system_time_stamp', width: '10%', editable: false, },
      { text: 'System Msec', datafield: 'system_msec', width: '10%', editable: false, }

    ],
  };
};

export const GANGGUAN_DAN_PEMELIHARAAN_JQ = () => {
  return {
    datafields: [
      // { name: 'id', type: 'int' },
      { name: 'id_apkt_trans_jar', type: 'string' },
      { name: 'tgl_laporan', type: 'string' },
      { name: 'jenis_laporan', type: 'string' },
      { name: 'no_apkt', type: 'string' },
      { name: 'status_laporan', type: 'string' },
      { name: 'nama_laporan', type: 'string' },
      { name: 'lokasi', type: 'string' },
      { name: 'status_data', type: 'string' },
      // { name: 'tgl_status_data', type: 'string' },
      { name: 'tgl_nyala_awal', type: 'string' },
      { name: 'jlh_gardu_padam', type: 'string' },
      { name: 'jlh_gardu_nyala', type: 'string' },
      { name: 'action', type: 'string' },



    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Tgl Laporan', datafield: 'tgl_laporan', width: '15%', editable: false, },
      { text: 'Jenis Laporan', datafield: 'jenis_laporan', width: '13%', editable: false, },
      { text: 'No APKT', datafield: 'no_apkt', width: '20%', editable: false },
      { text: 'Status', datafield: 'status_laporan', width: '20%', editable: false, },
      // {
      //   text: 'Status',
      //   datafield: 'status_laporan',
      //   width: '10%',
      //   editable: false,
      //   // columntype: 'checkbox',
      //   // filtertype: 'bool',
      //   filtertype: 'string',
      //   cellsrenderer: function(row:any, columnfield:any, value:any,  ) {
      //     const badgeClassName = `w-100 badge badge-${value ? 'success' : 'danger'}`;
      //     const badgeText = value ? 'open' : 'close';
      //     return `<span class="${badgeClassName}" style="font-size: 18px; display: flex; align-items: center; justify-content: center; height: 80%;">${badgeText}</span>`;
      //   }
      // },
      { text: 'Nama', datafield: 'nama_laporan', width: '20%', editable: false },
      { text: 'Lokasi', datafield: 'lokasi', width: '20%', editable: false },
      {
        text: 'Status Listrik',
        datafield: 'status_data',
        width: '10%',
        editable: false,
        cellsrenderer: function(row:any, columnfield:any, value:any, defaulthtml:any, columnproperties:any, rowdata:any) {
          const badgeClassName = `w-100 badge badge-${rowdata.jlh_gardu_padam === 0 ? 'success' : 'danger'}`;
          const badgeText = rowdata.jlh_gardu_padam === 0 ? 'Nyala' : 'Padam';
          return `<span class="${badgeClassName}" style="font-size: 18px; display: flex; align-items: center; justify-content: center; height: 80%;">${badgeText}</span>`;
        }
      },
      // { text: 'Tanggal Status Listrik', datafield: 'tgl_status_data', width: '20%', editable: false },
      { text: 'Tanggal Status Listrik', datafield: 'tgl_nyala_awal', width: '20%', editable: false },
      { text: 'Jumlah GD Masih Padam', datafield: 'jlh_gardu_padam', width: '10%', editable: false },
      { text: 'Jumlah GD Sudah Nyala', datafield: 'jlh_gardu_nyala', width: '15%', editable: false },


    ],
  };
};

export const GANGGUAN_DAN_PEMELIHARAAN_DETAIL_JQ = () => {
  return {
    datafields: [
      { name: 'id_apkt_trans_jar_det', type: 'int' },
      { name: 'gardu_mjd', type: 'string' },
      { name: 'tgl_padam', type: 'string' },
      { name: 'tgl_nyala', type: 'string' },
      { name: 'status_listrik', type: 'string' },
      { name: 'up3', type: 'string' },
      { name: 'tgl_mulai_apkt_kirim_padam', type: 'string' },
      { name: 'status_apkt_kirim_padam', type: 'string' },
      { name: 'res_apkt_kirim_padam', type: 'string' },




    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Jenis Laporan', datafield: 'gardu_mjd', width: '30%', editable: false, },
      { text: 'Tgl Padam', datafield: 'tgl_padam', width: '15%', editable: false, },
      { text: 'Tgl Nyala', datafield: 'tgl_nyala', width: '15%', editable: false, },
      { text: 'Status', datafield: 'status_listrik', width: '15%', editable: false, },
      { text: 'UP3', datafield: 'up3', width: '5%', editable: false, },
      { text: 'Tanggal Kirim APKT', datafield: 'tgl_mulai_apkt_kirim_padam', width: '15%', editable: false, },
      { text: 'Status Kirim APKT', datafield: 'status_apkt_kirim_padam', width: '15%', editable: false, },
      { text: 'Pesan Status Kirim APKT', datafield: 'res_apkt_kirim_padam', width: '15%', editable: false, },




    ],
  };
};

export const DAFTAR_PENYULANG_TIDAK_KIRIM_APKT = () => {
  return {
    datafields: [
      { name: 'id_ref_lokasi', type: 'string' },
      { name: 'gardu_induk', type: 'string' },
      { name: 'nama_lokasi', type: 'string' },




    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Nama GI', datafield: 'gardu_induk', width: '30%', editable: false, },
      { text: 'Nama Penyulang', datafield: 'nama_lokasi', width: '60%', editable: false, },




    ],
  };
};
