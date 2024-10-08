import { NO, B1, B2, B3, JENIS_POINT } from "../_more.columns.config"

export const HIS_RTU_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Jenis RTU', accessor: 'jenis_rtu', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'RTU', accessor: 'rtu', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Awal', accessor: 'tanggal_awal', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Awal', accessor: 'msec_awal', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Awal', accessor: 'status_awal', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Tanggal Akhir', accessor: 'tanggal_akhir', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Akhir', accessor: 'msec_akhir', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Akhir', accessor: 'status_akhir', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Kesimpulan', accessor: 'kesimpulan', minWidth: '180px', disableFilters: true, show: true }
  ]
}

export const HIS_RTU_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'number' },
      { name: 'jenis', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'rtu', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'status_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      // { name: 'status_data', type: 'string' },
      { name: 'kesimpulan', type: 'string' }
    ],
    columngroups: [
      { text: 'Awal', align: 'center', name: 'awal' },
      { text: 'Akhir', align: 'center', name: 'akhir' }
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '10%', editable: false, },
      { text: 'Tipe Point', datafield: 'jenis', width: '10%', editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2 (Tegangan)', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3 (Bay)', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Tanggal Awal', datafield: 'datum_1', columngroup: 'awal', width: '10%', editable: false, },
      { text: 'Status Awal', datafield: 'status_1', columngroup: 'awal', width: '10%', editable: false, },
      { text: 'Tanggal Akhir', datafield: 'datum_2', columngroup: 'akhir', width: '10%', editable: false, },
      { text: 'Status Akhir', datafield: 'status_2', columngroup: 'akhir', width: '10%', editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: '10%', editable: false, },
      // { text: 'Status', datafield: 'status_data', width: '10%', editable: false, },
      {
        text: 'Kesimpulan',
        datafield: 'kesimpulan',
        width: '7%',
        editable: false,
        cellsRenderer: function (row: any, column: any, value: any) {
          let backgroundColor = value === 'INVALID' ? 'red' : 'green';
          let color = 'white';

          return `<div style="background-color: ${backgroundColor}; color: ${color}; height: 30px; line-height: 30px; text-align: center;">
            ${value}
        </div>`;
        }
      },

    ],
  };
};

export const HIS_RTU_COLUMNS_GRID = () => {
  return {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'number' },
      { name: 'jenis', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'rtu', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'status_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'status_data', type: 'string' },
      { name: 'kesimpulan', type: 'string' }
    ],
    columnGroups: [
      { label: 'Awal', align: 'center', name: 'awal' },
      { label: 'Akhir', align: 'center', name: 'akhir' }
    ],
    columns: [
      { label: 'NO', dataField: 'number', width: '5%', },
      { label: 'Point Number', dataField: 'point_number', width: '10%', },
      { label: 'Tipe Point', dataField: 'jenis', width: '10%', },
      { label: 'B1 (Lokasi)', dataField: 'path1', width: '10%', },
      { label: 'B2 (Tegangan)', dataField: 'path2', width: '10%', },
      { label: 'B3 (Bay)', dataField: 'path3', width: '10%', },
      { label: 'Element', dataField: 'path4', width: '10%', },
      { label: 'Info', dataField: 'path5', width: '10%', },
      { label: 'Tanggal Awal', dataField: 'datum_1', columnGroup: 'awal', width: '10%', },
      { label: 'Status Awal', dataField: 'status_1', columnGroup: 'awal', width: '10%', },
      { label: 'Tanggal Akhir', dataField: 'datum_2', columnGroup: 'akhir', width: '10%', },
      { label: 'Status Akhir', dataField: 'status_2', columnGroup: 'akhir', width: '10%', },
      { label: 'Durasi (dd:hh:mm:ss)', dataField: 'durasi', width: '10%', },
      { label: 'Status', dataField: 'status_data', width: '10%', },
      {
        label: 'Kesimpulan',
        dataField: 'kesimpulan',
        width: '7%',
        formatFunction: (settings: any) => {
          const value = settings.value;
          let backgroundColor = '';
          let color = 'white'; // Warna teks default untuk kontras yang lebih baik

          if (value === 'INVALID') {
            backgroundColor = 'red';
          } else if (value === 'VALID') {
            backgroundColor = 'green';
          }

          settings.template = `<div style="height: 100%; width: 100%; background-color: ${backgroundColor}; color: ${color}; display: flex; align-items: center; justify-content: center;">
                                  ${value}
                                </div>`;
        }
      },
    ],
  };
};

export const HIS_ANALOG_COLUMNS = () => {
  return [
    ...NO(),
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Awal', accessor: 'tanggal_awal', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Awal', accessor: 'msec_awal', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Awal', accessor: 'status_awal', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Tanggal Akhir', accessor: 'tanggal_akhir', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Akhir', accessor: 'msec_akhir', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Status Akhir', accessor: 'status_akhir', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Kesimpulan', accessor: 'kesimpulan', minWidth: '180px', disableFilters: true, show: true }
  ]
}

export const HIS_ANALOG_30M_COLUMNS = () => {
  return [
    ...NO(),
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Value', accessor: 'msec_akhir', minWidth: '130px', disableFilters: true, show: true },
  ]
}

export const HIS_ANALOG_30M_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'jenis_point', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'datum', type: 'string' },
      { name: 'msec_akhir', type: 'string' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Jenis Point', datafield: 'jenis_point', width: '10%', editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2 (Tegangan)', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3 (Bay)', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Tanggal', datafield: 'datum', width: '10%', editable: false, },
      { text: 'Value', datafield: 'msec_akhir', width: '10%', editable: false, },
    ],
  };
};

export const HIS_DIGITAL_COLUMNS = () => {
  return [
    ...NO(),
    ...JENIS_POINT(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Awal', accessor: 'tanggal_awal', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Awal', accessor: 'msec_awal', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Awal', accessor: 'status_awal', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Tanggal Akhir', accessor: 'tanggal_akhir', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Akhir', accessor: 'msec_akhir', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Akhir', accessor: 'status_akhir', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Kesimpulan', accessor: 'kesimpulan', minWidth: '180px', disableFilters: true, show: true }
  ]
}

export const HIS_MASTER_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Master', accessor: 'master', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Awal', accessor: 'tanggal_awal', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Awal', accessor: 'msec_awal', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Awal', accessor: 'status_awal', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Tanggal Akhir', accessor: 'tanggal_akhir', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Msec Akhir', accessor: 'msec_akhir', minWidth: '120px', disableFilters: true, show: true },
    { Header: 'Status Akhir', accessor: 'status_akhir', minWidth: '130px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Kesimpulan', accessor: 'kesimpulan', minWidth: '180px', disableFilters: true, show: true }
  ]
}

export const HIS_MASTER_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'number' },
      { name: 'jenis', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'status_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      // { name: 'status_data', type: 'string' },
      { name: 'kesimpulan', type: 'string' }
    ],
    columngroups: [
      { text: 'Awal', align: 'center', name: 'awal' },
      { text: 'Akhir', align: 'center', name: 'akhir' }
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '10%', editable: false, },
      { text: 'Tipe Point', datafield: 'jenis', width: '10%', editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2 (Tegangan)', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3 (Bay)', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Tanggal Awal', datafield: 'datum_1', columngroup: 'awal', width: '10%', editable: false, },
      { text: 'Status Awal', datafield: 'status_1', columngroup: 'awal', width: '10%', editable: false, },
      { text: 'Tanggal Akhir', datafield: 'datum_2', columngroup: 'akhir', width: '10%', editable: false, },
      { text: 'Status Akhir', datafield: 'status_2', columngroup: 'akhir', width: '10%', editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: '10%', editable: false, },
      // { text: 'Status', datafield: 'status_data', width: '10%', editable: false, },
      {
        text: 'Kesimpulan',
        datafield: 'kesimpulan',
        width: '7%',
        editable: false,
        cellsRenderer: function (row: any, column: any, value: any) {
          let backgroundColor = value === 'INVALID' ? 'red' : 'green';
          let color = 'white';

          return `<div style="background-color: ${backgroundColor}; color: ${color}; height: 30px; line-height: 30px; text-align: center;">
            ${value}
        </div>`;
        }
      },

    ],
  };
};

export const HIS_MASTER_COLUMNS_GRID = () => {
  return {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'number' },
      { name: 'jenis', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'status_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'status_data', type: 'string' },
      { name: 'kesimpulan', type: 'string' }
    ],
    columnGroups: [
      { label: 'Awal', align: 'center', name: 'awal' },
      { label: 'Akhir', align: 'center', name: 'akhir' }
    ],
    columns: [
      { label: 'NO', dataField: 'number', width: '5%' },
      { label: 'Point Number', dataField: 'point_number', width: '10%' },
      { label: 'Tipe Point', dataField: 'jenis', width: '10%' },
      { label: 'B1 (Lokasi)', dataField: 'path1', width: '10%' },
      { label: 'B2 (Tegangan)', dataField: 'path2', width: '10%' },
      { label: 'B3 (Bay)', dataField: 'path3', width: '10%' },
      { label: 'Element', dataField: 'path4', width: '10%' },
      { label: 'Info', dataField: 'path5', width: '10%' },
      { label: 'Tanggal Awal', dataField: 'datum_1', columnGroup: 'awal', width: '10%' },
      { label: 'Status Awal', dataField: 'status_1', columnGroup: 'awal', width: '10%' },
      { label: 'Tanggal Akhir', dataField: 'datum_2', columnGroup: 'akhir', width: '10%' },
      { label: 'Status Akhir', dataField: 'status_2', columnGroup: 'akhir', width: '10%' },
      { label: 'Durasi (dd:hh:mm:ss)', dataField: 'durasi', width: '10%' },
      { label: 'Status', dataField: 'status_data', width: '10%' },
      {
        label: 'Kesimpulan',
        dataField: 'kesimpulan',
        width: '7%',
        formatFunction: (settings: any) => {
          const value = settings.value;
          let backgroundColor = '';
          let color = 'white'; // Warna teks default untuk kontras yang lebih baik

          if (value === 'INVALID') {
            backgroundColor = 'red';
          } else if (value === 'VALID') {
            backgroundColor = 'green';
          }

          settings.template = `<div style="height: 100%; width: 100%; background-color: ${backgroundColor}; color: ${color}; display: flex; align-items: center; justify-content: center;">
                                  ${value}
                                </div>`;
        }
      },
    ],
  };
};


export const HIS_TRIP_COLUMNS = () => {
  return [
    ...NO(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu Trip', accessor: 'tanggal_awal', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu Normal', accessor: 'tanggal_akhir', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'OCR', accessor: 'ocr', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'GFR', accessor: 'gfr', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'I Beban', accessor: 'beban', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'IFR', accessor: 'ifr', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'IFS', accessor: 'ifs', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'IFT', accessor: 'ift', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'IFN', accessor: 'ifn', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'CBTR', accessor: 'cbtr', minWidth: '50px', disableFilters: true, show: true }
  ]
}

export const HIS_TRIP_DASHBOARD_COLUMNSS = () => {
  return [
    ...NO(),
    // ...B1(),
    // ...B2(),
    // ...B3(),
    // { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu Open', accessor: 'tanggal_awal', minWidth: '80px', disableFilters: true, show: true },
    { Header: 'Waktu Close', accessor: 'tanggal_akhir', minWidth: '80px', disableFilters: true, show: true },
    // { Header: 'I Beban', accessor: 'status_beban', minWidth: '100px', disableFilters: true, show: true },
    // { Header: 'IFr', accessor: 'status_ifr', minWidth: '50px', disableFilters: true, show: true },
    // { Header: 'IFs', accessor: 'status_ifs', minWidth: '50px', disableFilters: true, show: true },
    // { Header: 'IFt', accessor: 'status_ift', minWidth: '50px', disableFilters: true, show: true },
    // { Header: 'IFn', accessor: 'status_ifn', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'OCR', accessor: 'status_ocr', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'GFR', accessor: 'status_gfr', minWidth: '50px', disableFilters: true, show: true },
    { Header: 'CBTR', accessor: 'cbtr', minWidth: '50px', disableFilters: true, show: true }
  ]
}

export const HIS_TRIP_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'ocr', type: 'string' },
      { name: 'gfr', type: 'string' },
      { name: 'i', type: 'string' },
      { name: 'ifr', type: 'string' },
      { name: 'ifs', type: 'string' },
      { name: 'ift', type: 'string' },
      { name: 'ifn', type: 'string' },
      { name: 'cbtr', type: 'string' }
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2 (Tegangan)', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3 (Bay)', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '7%', editable: false, },
      { text: 'Waktu Trip', datafield: 'datum_1', width: '10%', editable: false, },
      { text: 'Waktu Normal', datafield: 'datum_2', width: '10%', editable: false, },
      { text: 'OCR', datafield: 'ocr', width: '5%', editable: false, },
      { text: 'GFR', datafield: 'gfr', width: '5%', editable: false, },
      { text: 'I Beban', datafield: 'i', width: '5%', editable: false, },
      { text: 'IFR', datafield: 'ifr', width: '5%', editable: false, },
      { text: 'IFS', datafield: 'ifs', width: '5%', editable: false, },
      { text: 'IFT', datafield: 'ift', width: '5%', editable: false, },
      { text: 'IFN', datafield: 'ifn', width: '5%', editable: false, },
      { text: 'CBTR', datafield: 'cbtr', width: '5%', editable: false, }
    ],
  };
};

export const HIS_TRIP_COLUMNS_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'ocr', type: 'string' },
      { name: 'gfr', type: 'string' },
      { name: 'i', type: 'string' },
      { name: 'ifr', type: 'string' },
      { name: 'ifs', type: 'string' },
      { name: 'ift', type: 'string' },
      { name: 'ifn', type: 'string' },
      { name: 'cbtr', type: 'string' }
    ],
    columns: [
      { label: 'NO', dataField: 'number', width: 50 },
      { label: 'B1 (Lokasi)', dataField: 'path1', width: 150 },
      { label: 'B2 (Tegangan)', dataField: 'path2', width: 150 },
      { label: 'B3 (Bay)', dataField: 'path3', width: 150 },
      { label: 'Element', dataField: 'path4', width: 100 },
      { label: 'Waktu Trip', dataField: 'datum_1', width: 250 },
      { label: 'Waktu Normal', dataField: 'datum_2', width: 250 },
      { label: 'OCR', dataField: 'ocr', width: 50 },
      { label: 'GFR', dataField: 'gfr', width: 50 },
      { label: 'I Beban', dataField: 'i', width: 100 },
      { label: 'IFR', dataField: 'ifr', width: 50 },
      { label: 'IFS', dataField: 'ifs', width: 50 },
      { label: 'IFT', dataField: 'ift', width: 50 },
      { label: 'IFN', dataField: 'ifn', width: 50 },
      { label: 'CBTR', dataField: 'cbtr', width: 50 }
    ],
  };
};

export const HIS_REMOTE_COLUMNS = () => {
  return [
    ...NO(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Operator', accessor: 'operator', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Eksekusi Remote', accessor: 'status_1', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal Eksekusi Remote', accessor: 'tgl_mulai_remote', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Tanggal Response Remote', accessor: 'tgl_selesai_remote', minWidth: '170px', disableFilters: true, show: true },

    { Header: 'Status Remote', accessor: 'status_remote', minWidth: '170px', disableFilters: true, show: true },
    { Header: 'Durasi Waktu Remote (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true }
  ]
}

export const HIS_REMOTE_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'id_his_rc', type: 'string' },
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'number' },
      // { name: 'jenis', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'msgoperator', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'status_1', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'rekon', type: 'string' },
      { name: 'datum_rekon', type: 'string' },
      { name: 'kesimpulan_rekon', type: 'string' },
      { name: 'keterangan', type: 'string' },
      { name: 'kesimpulan', type: 'string' }
    ],
    columngroups: [
      { text: 'Awal', align: 'center', name: 'awal' },
      { text: 'Rekon RC', align: 'center', name: 'rekongroup' },
      { text: 'Akhir', align: 'center', name: 'akhir' }
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '10%', editable: false, },
      // { text: 'Tipe Point', datafield: 'jenis', width: '10%', editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2 (Tegangan)', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3 (Bay)', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Operator', datafield: 'msgoperator', width: '10%', editable: false, },
      { text: 'Tanggal Awal', datafield: 'datum_1', columngroup: 'awal', width: '10%', editable: false, },
      { text: 'Status Awal', datafield: 'status_1', columngroup: 'awal', width: '10%', editable: false, },
      { text: 'Tanggal Akhir', datafield: 'datum_2', columngroup: 'akhir', width: '10%', editable: false, },
      { text: 'Status Akhir', datafield: 'status_2', columngroup: 'akhir', width: '10%', editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: '10%', editable: false, },
      {
        text: 'Kesimpulan',
        datafield: 'kesimpulan',
        width: '7%',
        editable: false,
        cellClassName: function (row: any, column: any, value: any) {
            if (value === 'GAGAL') {
                return 'red-background'; // Kelas CSS untuk GAGAL
            } else if (value === 'BERHASIL') {
                return 'green-background'; // Kelas CSS untuk BERHASIL
            } else if (value === 'NO RESPONSE') {
                return 'grey-background'; // Kelas CSS untuk NO RESPONSE
            }
            return ''; // Default tanpa class tambahan
        }
    },
      { text: 'Status Rekon', datafield: 'rekon', columngroup: 'rekongroup', width: '10%',    columntype: "checkbox",
        filtertype: "bool", editable: false, },
      { text: 'Tanggal Rekon', datafield: 'datum_rekon', columngroup: 'rekongroup', width: '10%', editable: false, },
      { 
        text: 'Kesimpulan Rekon', 
        datafield: 'kesimpulan_rekon',
         cellClassName: function (row: any, column: any, value: any) {
        if (value === 'GAGAL') {
            return 'red-background'; // Kelas CSS untuk GAGAL
        } else if (value === 'BERHASIL') {
            return 'green-background'; // Kelas CSS untuk BERHASIL
        } else if (value === 'NO RESPONSE') {
            return 'grey-background'; // Kelas CSS untuk NO RESPONSE
        }
        return ''; // Default tanpa class tambahan
    }, columngroup: 'rekongroup',
       width: '10%',
      editable: false, },
      { text: 'Keterangan', datafield: 'keterangan', columngroup: 'rekongroup', width: '10%', editable: false, },
     
    
    
    ],
  };
};

export const HIS_REMOTE_COLUMNS_GRID = () => {
  return {
    datafields: [
      { name: 'id_his_rc', type: 'string' },
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'number' },
      { name: 'jenis', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'msgoperator', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'status_1', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'kesimpulan', type: 'string' }
    ],
    columnGroups: [
      { label: 'Awal', align: 'center', name: 'awal' },
      { label: 'Akhir', align: 'center', name: 'akhir' }
    ],
    columns: [
      { label: 'NO', dataField: 'number', width: '3%' },
      { label: 'Point Number', dataField: 'point_number', width: '10%' },
      { label: 'Tipe Point', dataField: 'jenis', width: '10%' },
      { label: 'B1 (Lokasi)', dataField: 'path1', width: '10%' },
      { label: 'B2 (Tegangan)', dataField: 'path2', width: '10%' },
      { label: 'B3 (Bay)', dataField: 'path3', width: '10%' },
      { label: 'Element', dataField: 'path4', width: '10%' },
      { label: 'Info', dataField: 'path5', width: '10%' },
      { label: 'Operator', dataField: 'msgoperator', width: '10%' },
      { label: 'Tanggal Awal', dataField: 'datum_1', columnGroup: 'awal', width: '10%' },
      { label: 'Status Awal', dataField: 'status_1', columnGroup: 'awal', width: '10%' },
      { label: 'Tanggal Akhir', dataField: 'datum_2', columnGroup: 'akhir', width: '10%' },
      { label: 'Status Akhir', dataField: 'status_2', columnGroup: 'akhir', width: '10%' },
      { label: 'Durasi (dd:hh:mm:ss)', dataField: 'durasi', width: '10%' },
      {
        label: 'Kesimpulan',
        dataField: 'kesimpulan',
        width: '7%',
        formatFunction: (settings: any) => {
          const value = settings.value;
          let backgroundColor = '';
          let color = 'white'; // Warna teks default untuk kontras yang lebih baik

          if (value === 'GAGAL') {
            backgroundColor = 'red';
          } else if (value === 'BERHASIL') {
            backgroundColor = 'green';
          }

          settings.template = `<div style="height: 100%; width: 100%; background-color: ${backgroundColor}; color: ${color}; display: flex; align-items: center; justify-content: center;">
                                  ${value}
                                </div>`;
        }
      },
    ],
  };
};


export const KINERJA_SCADA_HIST = () => {
  return [
    // { Header: 'Peralatan SCADA', accessor: 'point_name', minWidth: '180px', disableFilters: true, show: true },
    ...NO(),
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'path4', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Info', accessor: 'path5', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Tanggal Awal', accessor: 'tanggal_awal', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Status Awal', accessor: 'satuan_awal', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Tanggal Akhir', accessor: 'tanggal_akhir', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Status Akhir', accessor: 'status_2', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Durasi (dd:hh:mm:ss)', accessor: 'durasi', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Keterangan', accessor: 'keterangan', minWidth: '180px', disableFilters: true, show: true },
  ]
}
export const KINERJA_SCADA_HIST_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'status_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'keterangan', type: 'string' }
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: 30, editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1', width: 100, editable: false, },
      { text: 'B2 (Tegangan)', datafield: 'path2', width: 100, editable: false, },
      { text: 'B3 (Bay)', datafield: 'path3', width: 100, editable: false, },
      { text: 'Element', datafield: 'path4', width: 100, editable: false, },
      { text: 'Info', datafield: 'path5', width: 100, editable: false, },
      { text: 'Tanggal Awal', datafield: 'datum_1', width: 200, editable: false, },
      { text: 'Status Awal', datafield: 'status_1', width: 200, editable: false, },
      { text: 'Tanggal Akhir', datafield: 'datum_2', width: 200, editable: false, },
      { text: 'Status Akhir', datafield: 'status_2', width: 200, editable: false, },
      { text: 'Durasi', datafield: 'durasi', width: 200, editable: false, },
      { text: 'Keterangan', datafield: 'keterangan', width: 100, editable: false, }
    ],
  };
};

export const SCADATEL_HISTORI_TELEMETERING_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'jenis', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'status_1', type: 'string' },
      { name: 'value_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'value_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      // { name: 'status_data', type: 'string' },
      { name: 'kesimpulan', type: 'string' },

    ],
    columngroups: [
      { text: 'Awal', align: 'center', name: 'awal' },
      { text: 'Akhir', align: 'center', name: 'akhir' }
    ],

    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '10%', editable: false, },
      { text: 'Tipe Point', datafield: 'jenis', width: '5%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Tanggal Awal', datafield: 'datum_1', columngroup: 'awal', width: '10%', editable: false, },
      { text: 'Status Awal', datafield: 'status_1', columngroup: 'awal', width: '10%', editable: false, },
      { text: 'Tanggal Akhir', datafield: 'datum_2', columngroup: 'akhir', width: '10%', editable: false, },
      { text: 'Status Akhir', datafield: 'status_2', columngroup: 'akhir', width: '10%', editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: '10%', editable: false, },
      // { text: 'Status', datafield: 'status_data', width: '10%', editable: false, },
      {
        text: 'Kesimpulan',
        datafield: 'kesimpulan',
        width: '7%',
        editable: false,
        cellsRenderer: function (row: any, column: any, value: any) {
          let backgroundColor = value === 'INVALID' ? 'red' : 'green';
          let color = 'white';

          return `<div style="background-color: ${backgroundColor}; color: ${color}; height: 30px; line-height: 30px; text-align: center;">
            ${value}
        </div>`;
        }
      },

    ],
  };
};

export const SCADATEL_HISTORI_TELEMETERING_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'jenis', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'status_1', type: 'string' },
      { name: 'value_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'value_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'status_data', type: 'string' },
      { name: 'kesimpulan', type: 'string' },

    ],
    columnGroups: [
      { label: 'Awal', align: 'center', name: 'awal' },
      { label: 'Akhir', align: 'center', name: 'akhir' }
    ],

    columns: [
      { label: 'NO', dataField: 'number', width: '3%' },
      { label: 'Point Number', dataField: 'point_number', width: '10%' },
      { label: 'Tipe Point', dataField: 'jenis', width: '5%' },
      { label: 'B1', dataField: 'path1', width: '10%' },
      { label: 'B2', dataField: 'path2', width: '10%' },
      { label: 'B3', dataField: 'path3', width: '10%' },
      { label: 'Element', dataField: 'path4', width: '10%' },
      { label: 'Info', dataField: 'path5', width: '10%' },
      { label: 'Tanggal Awal', dataField: 'datum_1', columnGroup: 'awal', width: '10%' },
      { label: 'Status Awal', dataField: 'status_1', columnGroup: 'awal', width: '10%' },
      { label: 'Tanggal Akhir', dataField: 'datum_2', columnGroup: 'akhir', width: '10%' },
      { label: 'Status Akhir', dataField: 'status_2', columnGroup: 'akhir', width: '10%' },
      { label: 'Durasi (dd:hh:mm:ss)', dataField: 'durasi', width: '10%' },
      { label: 'Status', dataField: 'status_data', width: '10%' },
      {
        label: 'Kesimpulan',
        dataField: 'kesimpulan',
        width: '7%',
        formatFunction: (settings: any) => {
          const value = settings.value;
          let backgroundColor = '';
          let color = 'white'; // Warna teks default untuk kontras yang lebih baik

          if (value === 'INVALID') {
            backgroundColor = 'red';
          } else if (value === 'VALID') {
            backgroundColor = 'green';
          }

          settings.template = `<div style="height: 100%; width: 100%; background-color: ${backgroundColor}; color: ${color}; display: flex; align-items: center; justify-content: center;">
                                  ${value}
                                </div>`;
        }
      },
    ],
  };
};


export const SCADATEL_HISTORI_TELESIGNAL_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'jenis', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'status_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      // { name: 'status_data', type: 'string' },
      { name: 'kesimpulan', type: 'string' },

    ],
    columngroups: [
      { text: 'Awal', align: 'center', name: 'awal' },
      { text: 'Akhir', align: 'center', name: 'akhir' }
    ],

    columns: [
      { text: 'NO', datafield: 'number', width: 70, editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: 100, editable: false, },
      { text: 'Tipe Point', datafield: 'jenis', width: 150, editable: false, },
      { text: 'B1', datafield: 'path1', width: 150, editable: false, },
      { text: 'B2', datafield: 'path2', width: 150, editable: false, },
      { text: 'B3', datafield: 'path3', width: 150, editable: false, },
      { text: 'Element', datafield: 'path4', width: 150, editable: false, },
      { text: 'Info', datafield: 'path5', width: 150, editable: false, },
      { text: 'Tanggal Awal', datafield: 'datum_1', columngroup: 'awal', width: 150, editable: false, },
      { text: 'Status', datafield: 'status_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Tanggal Akhir', datafield: 'datum_2', columngroup: 'akhir', width: 150, editable: false, },
      { text: 'Status', datafield: 'status_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: 150, editable: false, },
      // { text: 'Status', datafield: 'status_data', width: 150, editable: false, },
      {
        text: 'Kesimpulan',
        datafield: 'kesimpulan',
        width: '7%',
        editable: false,
        cellsRenderer: function (row: any, column: any, value: any) {
          let backgroundColor = value === 'INVALID' ? 'red' : 'green';
          let color = 'white';

          return `<div style="background-color: ${backgroundColor}; color: ${color}; height: 30px; line-height: 30px; text-align: center;">
            ${value}
        </div>`;
        }
      },

    ],
  };
};

export const SCADATEL_HISTORI_TELESIGNAL_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'jenis', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'status_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'status_data', type: 'string' },
      { name: 'kesimpulan', type: 'string' },

    ],
    columnGroups: [
      { label: 'Awal', align: 'center', name: 'awal' },
      { label: 'Akhir', align: 'center', name: 'akhir' }
    ],

    columns: [
      { label: 'NO', dataField: 'number', width: 50 },
      { label: 'Point Number', dataField: 'point_number', width: 100 },
      { label: 'Tipe Point', dataField: 'jenis', width: 150 },
      { label: 'B1', dataField: 'path1', width: 150 },
      { label: 'B2', dataField: 'path2', width: 150 },
      { label: 'B3', dataField: 'path3', width: 150 },
      { label: 'Element', dataField: 'path4', width: 150 },
      { label: 'Info', dataField: 'path5', width: 150 },
      { label: 'Tanggal Awal', dataField: 'datum_1', columnGroup: 'awal', width: 150 },
      { label: 'Status', dataField: 'status_1', columnGroup: 'awal', width: 100 },
      { label: 'Tanggal Akhir', dataField: 'datum_2', columnGroup: 'akhir', width: 150 },
      { label: 'Status', dataField: 'status_2', columnGroup: 'akhir', width: 100 },
      { label: 'Durasi (dd:hh:mm:ss)', dataField: 'durasi', width: 150 },
      { label: 'Status', dataField: 'status_data', width: 150 },
      {
        label: 'Kesimpulan',
        dataField: 'kesimpulan',
        width: '7%',
        formatFunction: (settings: any) => {
          const value = settings.value;
          let backgroundColor = '';
          let color = 'white'; // Warna teks default untuk kontras yang lebih baik

          if (value === 'INVALID') {
            backgroundColor = 'red';
          } else if (value === 'VALID') {
            backgroundColor = 'green';
          }

          settings.template = `<div style="height: 100%; width: 100%; background-color: ${backgroundColor}; color: ${color}; display: flex; align-items: center; justify-content: center;">
                                  ${value}
                                </div>`;
        }
      },
    ],
  };
};
