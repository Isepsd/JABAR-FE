import { NO } from "../_more.columns.config"

export const GANGGUAN_SAAT_INI_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kelompok Peralatan', accessor: 'kelompok', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Jenis Peralatan', accessor: 'jenis', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Lokasi (B1)', accessor: 'path1', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Tegangan (B2)', accessor: 'path2', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Bay (B3)', accessor: 'path3', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Element', accessor: 'path4', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Info', accessor: 'path5', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Tanggal Gangguan', accessor: 'tgl_gangguan', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
  ]
}

export const GANGGUAN_SAAT_INI_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'kelompok', type: 'string' },
      { name: 'jenis', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'tgl_gangguan', type: 'string' },
      { name: 'durasi', type: 'string' },
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Kelompok Peralatan', datafield: 'kelompok', width: '17%', editable: false, },
      { text: 'Jenis Peralatan', datafield: 'jenis', width: '10%', editable: false, },
      { text: 'Lokasi (B1)', datafield: 'path1', width: '10%', editable: false, },
      { text: 'Tegangan (B2)', datafield: 'path2', width: '10%', editable: false, },
      { text: 'Bay (B3)', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '20%', editable: false, },
      { text: 'Tanggal Gangguan', datafield: 'tgl_gangguan', width: '10%', editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: '10%', editable: false, },
    ],
  };
};
