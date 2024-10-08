import { NO } from "../_more.columns.config"

export const TELEGRAM_LOG_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Tanggal Kirim', accessor: 'tgl_kirim', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Nama Bot', accessor: 'nama_bot', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Nama Grup', accessor: 'nama_chat', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Msg', accessor: 'msg', minWidth: '500px', show: true, disableFilters: true },
    { Header: 'Pesan Eror', accessor: 'pesan_error', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Kirim Ulang', accessor: 'kirim_ulang', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Status Kirim', accessor: 'status_sent', minWidth: '100px', show: true, disableFilters: true },
    // { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true },
  ]
}

export const TELEGRAM_LOG_COLUMNS_JQX = () => {
  const cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any,): string => {
    if (value === 1) {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + 'Terkirim' + '</span>';
    } else {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + 'Gagal' + '</span>';
    }
  };
  const cellsrenderer1 = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any,): string => {
    if (value === '') {
      return `<span style="margin: 4px; float: ${columnproperties.cellsalign};">Tidak</span>`;
    } else {
      return `<span style="margin: 4px; float: ${columnproperties.cellsalign};">Ya</span>`;
    }
  };

  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'datum_sent', type: 'string' },
      { name: 'nama_bot', type: 'string' },
      { name: 'nama_chat', type: 'string' },
      { name: 'msg', type: 'string' },
      { name: 'pesan_error', type: 'string' },
      { name: 'kirim_ulang', type: 'string' },
      { name: 'status_sent', type: 'string' }
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Tanggal Kirim', datafield: 'datum_sent', width: 150, editable: false, },
      { text: 'Nama Bot', datafield: 'nama_bot', width: 150, editable: false, },
      { text: 'Nama Grup', datafield: 'nama_chat', width: 150, editable: false, },
      { text: 'Msg', datafield: 'msg', width: 250, editable: false, },
      { text: 'Pesan Eror', datafield: 'pesan_error', width: 250, editable: false, },
      { text: 'Kirim Ulang', datafield: 'kirim_ulang', width: 250, editable: false, cellsrenderer: cellsrenderer1 },
      { text: 'Status Kirim', datafield: 'status_sent', width: 250, editable: false, cellsrenderer: cellsrenderer }
    ],
  };
};
