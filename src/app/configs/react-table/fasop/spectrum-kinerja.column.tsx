import React from "react"
import { NO, B1, B2, B3, ACTION_COLUMN, JENIS_POINT, KINERJA, JENIS_LOKASI } from "../_more.columns.config"

export const TRIP_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Point PID', accessor: 'pointpid', minWidth: '150px', disableFilters: true, show: true },
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Trip', accessor: 'trip', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'OCR', accessor: 'ocr', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'OCRM', accessor: 'ocrm', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'GFR', accessor: 'gfr', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'GFRM', accessor: 'gfrm', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
  ]
}

export const REMOTE_CONTROL_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Nama Point', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Downtime', accessor: 'downtime', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true },
  ]
}

export const ANALOG_HARI_COLUMNS = () => {
  return [
    ...NO(),
    ...KINERJA(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Down (kali)', accessor: 'down', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const ANALOG_BULAN_COLUMNS = () => {
  return [
    ...NO(),
    ...KINERJA(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Down (kali)', accessor: 'down', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_DIGITAL_HARI_COLUMNS = () => {
  return [
    ...NO(),
    ...KINERJA(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Down (kali)', accessor: 'down', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_DIGITAL_BULAN_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_RTU_HARI_COLUMNS = () => {
  return [
    ...NO(),
    ...KINERJA(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'RTU', accessor: 'rtu', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_LOKASI(),
    ...JENIS_POINT(),
    { Header: 'Down (kali)', accessor: 'down', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_RTU_BULAN_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'RTU', accessor: 'rtu', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_LOKASI(),
    ...JENIS_POINT(),
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_MASTER__HARI_COLUMNS = () => {
  return [
    ...NO(),
    ...KINERJA(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Master', accessor: 'master', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_LOKASI(),
    ...JENIS_POINT(),
    { Header: 'Down (kali)', accessor: 'down', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_MASTER_BULAN_COLUMNS = () => {
  return [
    ...NO(),
    ...KINERJA(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Master', accessor: 'master', minWidth: '150px', disableFilters: true, show: true },
    ...JENIS_LOKASI(),
    ...JENIS_POINT(),
    { Header: 'Down (kali)', accessor: 'down', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Downtime (Menit)', accessor: 'downtime', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    {
      Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true
    },
    ...ACTION_COLUMN()
  ]
}

export const KIN_SCADA_COLUMNS = () => {
  return [
    // { Header: 'Peralatan SCADA', accessor: 'peralatan_scada', minWidth: '180px', disableFilters: true, show: true },
    ...NO(),
    { Header: 'Jenis Peralatan', accessor: 'jenis', minWidth: '180px', disableFilters: true, show: true },
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'path4text', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Info', accessor: 'path5text', minWidth: '180px', disableFilters: true, show: true },
    // { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Ketersediaan (%)', accessor: 'avability', minWidth: '180px', disableFilters: true, show: true },
  ]
}

export const KIN_SCADA_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'kelompok', type: 'string' },
      { name: 'path1text', type: 'string' },
      { name: 'path2text', type: 'string' },
      { name: 'path3text', type: 'string' },
      { name: 'path4text', type: 'string' },
      { name: 'path5text', type: 'string' },
      { name: 'point_number', type: 'number' },
      { name: 'avability', type: 'string' }
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Jenis Peralatan', datafield: 'kelompok', width: '17%', editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1text', width: '15%', editable: false, },
      { text: 'B2 (Tegangan)', datafield: 'path2text', width: '15%', editable: false, },
      { text: 'B3 (Bay)', datafield: 'path3text', width: '15%', editable: false, },
      { text: 'Element', datafield: 'path4text', width: '15%', editable: false, },
      { text: 'Info', datafield: 'path5text', width: '10%', editable: false, },
      { text: 'Ketersediaan (%)', datafield: 'avability', width: '10%', editable: false, }
    ],
  };
};


export const KIN_SCADA_DETAIL_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'peralatan_scada', type: 'string' },
      { name: 'path1text', type: 'string' },
      { name: 'path2text', type: 'string' },
      { name: 'path3text', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'tanggal_awal', type: 'string' },
      { name: 'satuan_awal', type: 'string' },
      { name: 'tanggal_akhir', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'keterangan', type: 'string' },
      { name: 'point_number', type: 'number' },
     
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1text', width: '15%', editable: false, },
      { text: 'B2 (Tegangan)', datafield: 'path2text', width: '15%', editable: false, },
      { text: 'B3 (Bay)', datafield: 'path3text', width: '15%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '15%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Tanggal Awal', datafield: 'tanggal_awal', width: '10%', editable: false, },
      { text: 'Status Awal', datafield: 'satuan_awal', width: '10%', editable: false, },
      { text: 'Status Akhir', datafield: 'status_2', width: '10%', editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: '10%', editable: false, },
      { text: 'Keterangan', datafield: 'keterangan', width: '10%', editable: false, }
    ],
  };
};


export const KIN_RC = () => {
  return [
    ...NO(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'path4', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Jumlah RC', accessor: 'jlm_rc', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Sukses', accessor: 'sukses', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Gagal', accessor: 'gagal', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Performance (%)', accessor: 'performance', minWidth: '180px', disableFilters: true, show: true },
  ]
}

export const KIN_RC_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'jlm_rc', type: 'string' },
      { name: 'sukses', type: 'string' },
      { name: 'gagal', type: 'string' },
      { name: 'performance', type: 'string' }
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '4%', editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1', width: '15%', editable: false, },
      { text: 'B2 (Tegangan)', datafield: 'path2', width: '15%', editable: false, },
      { text: 'B3 (Bay)', datafield: 'path3', width: '15%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '15%', editable: false, },
      { text: 'Jumlah RC', datafield: 'jlm_rc', width: '14%', editable: false, },
      { text: 'Sukses', datafield: 'sukses', width: '6%', editable: false, },
      { text: 'Gagal', datafield: 'gagal', width: '6%', editable: false, },
      { text: 'Performance (%)', datafield: 'performance', width: '10%', editable: false, }
    ],
  };
};

export const HEADER_EXTRA_TREE_FASOP = () => {
  return [{
    id: "nama",
    accessor: 'nama',
    show: true,
    disableFilters: true,
    hideColumn: true,
    minWidth: '250px',
    Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
      <span {...getToggleAllRowsExpandedProps()}>
        {isAllRowsExpanded ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-right"></i>} Nama
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
          {row.isExpanded ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-right"></i>}
          <span> {row.original.nama}</span>
        </div>
      ) : <div style={{ paddingLeft: `${(row.depth ? row.depth * 1.55 : 1.65)}rem` }}>{row.original.nama}</div>,
  },
  ]
}