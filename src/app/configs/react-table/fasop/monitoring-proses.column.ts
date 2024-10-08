import { B1, B2, B3 } from "../_more.columns.config"

export const MONITORING_PROSES_COLUMN = () => {
  return [
    { Header: 'Nama', accessor: 'name', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'Tanggal Proses', accessor: 'tgl_update_proses', minWidth: '80px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status_data', minWidth: '30px', disableFilters: true, show: true },
    { Header: 'Group Proses', accessor: 'group_proses', minWidth: '30px', disableFilters: true, show: true },
    { Header: 'Expire Running', accessor: 'expire_running', minWidth: '30px', disableFilters: true, show: true },
    { Header: 'Expire Satuan', accessor: 'expire_satuan', minWidth: '30px', disableFilters: true, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '30px', disableFilters: true, show: true },
  ]
}

export const MONITORING_PROSES_DETAIL_COLUMN = () => {
  return [

    { Header: 'No', accessor: 'number', minWidth: '30px', disableFilters: true, show: true },
    { Header: 'Point Number', accessor: 'point_number', minWidth: '100px', disableFilters: true, show: true },
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'path4', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Value', accessor: 'value', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Update Terakhir', accessor: 'datum_capture', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'kesimpulan', minWidth: '100px', disableFilters: true, show: true },

  ]
}





export const MONITORING_PROSES_COLUMN_JQX = () => {
  const currentDate = new Date(); // Get the current date

  const getStatusData = (item:any) => {
    const tglUpdateProses = item?.tgl_update_proses ? new Date(item.tgl_update_proses) : null;
    const expireRunning = item?.expire_running;

    let statusText = 'Offline';
    let statusClass = 'offline'; // Default class for offline status

    if (tglUpdateProses) {
      // Ensure that expireRunning is a number before calculations
      const expirationTime = typeof expireRunning === 'number' ? expireRunning * 60 * 1000 : 0;

      // Check if the difference between current time and tglUpdateProses is more than 5 minutes
      const isExpired = currentDate.getTime() > tglUpdateProses.getTime() + expirationTime;

      statusText = isExpired ? 'Offline' : 'Online';
      statusClass = isExpired ? 'offline' : 'online'; // Set class based on status
    }

    // Cell rendering HTML
    return `<div style="display: flex; justify-content: center; align-items: center; height: 100%;">
      <div style="background-color: ${statusClass === 'offline' ? '#ff0000' : '#008000'}; color: white; padding: 4px; border-radius: px;">
        ${statusText}
      </div>
    </div>`;
  };

  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'name', type: 'string' },
      { name: 'tgl_update_proses', type: 'date' }, // Assuming tgl_update_proses is a date, adjust the type accordingly
      { name: 'status_data', type: 'string' },
      { name: 'group_proses', type: 'string' },
      { name: 'expire_running', type: 'number' }, // Assuming expire_running is a number, adjust the type accordingly
      { name: 'expire_satuan', type: 'string' },
      { name: 'keterangan', type: 'string' },
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '5%', editable: false },
      { text: 'Nama', datafield: 'name', width: '20%', editable: false },
      { text: 'Tanggal Proses', datafield: 'tgl_update_proses', width: '15%', cellsformat: 'dd-MMM-yyyy', editable: false },
      { text: 'Status', datafield: 'status_data', width: '8%', cellsrenderer: getStatusData, editable: false },
      { text: 'Group Proses', datafield: 'group_proses', width: '10%', editable: false },
      { text: 'Expire Running', datafield: 'expire_running', width: '8%', editable: false },
      { text: 'Expire Satuan', datafield: 'expire_satuan', width: '8%', editable: false },
      { text: 'Keterangan', datafield: 'keterangan', width: '25%', editable: false },
    ],
  };
};




