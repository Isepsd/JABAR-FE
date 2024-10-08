import { NO, PATH1, PATH2, PATH3, PATH4, PATH5 } from "../_more.columns.config";
export const SCADATEL_STATUS_TELEMETERING_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Info",
      accessor: "path5",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Status",
      accessor: "status_2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Value",
      accessor: "value",
      miSnWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Last Update",
      accessor: "datum_capture",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_STATUS_TELEMETERING_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'value', type: 'string' },
      { name: 'datum_capture', type: 'string' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Status', datafield: 'status_2', width: '10%', editable: false, },
      { text: 'Value', datafield: 'value', width: '10%', editable: false, },
      { text: 'Last Update', datafield: 'datum_capture', width: '10%', editable: false, },

    ],
  };
};

export const SCADATEL_STATUS_TELESIGNAL_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Info",
      accessor: "path5",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Status",
      accessor: "status_2",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    // {
    //   Header: "Value",
    //   accessor: "value",
    //   minWidth: "140px",
    //   disableFilters: true,
    //   show: true,
    // },
    {
      Header: "Last Update",
      accessor: "datum_2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_STATUS_TELESIGNAL_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'datum_2', type: 'string' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Status', datafield: 'status_2', width: '10%', editable: false, },
      { text: 'Last Update', datafield: 'datum_2', width: '20%', editable: false, },

    ],
  };
};

export const SCADATEL_STATUS_RTU_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Info",
      accessor: "path5",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Status",
      accessor: "status_2",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    // {
    //   Header: "Value",
    //   accessor: "value",
    //   minWidth: "140px",
    //   disableFilters: true,
    //   show: true,
    // },
    {
      Header: "Last Update",
      accessor: "datum_2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_STATUS_RTU_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'datum_2', type: 'string' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Status', datafield: 'status_2', width: '10%', editable: false, },
      { text: 'Last Update', datafield: 'datum_2', width: '20%', editable: false, },

    ],
  };
};

export const SCADATEL_STATUS_MASTER_STATION_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Info",
      accessor: "path5",
      minWidth: "140px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Status",
      accessor: "status_1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    // {
    //   Header: "Value",
    //   accessor: "value",
    //   minWidth: "140px",
    //   disableFilters: true,
    //   show: true,
    // },
    {
      Header: "Last Update",
      accessor: "datum_2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_STATUS_MASTER_STATION_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'datum_2', type: 'string' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Status', datafield: 'status_2', width: '10%', editable: false, },
      { text: 'Last Update', datafield: 'datum_2', width: '20%', editable: false, },

    ],
  };
};

export const SCADATEL_HISTORI_TELEMETERING_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Info",
      accessor: "path5",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Awal",
      accessor: "",
      minWidth: "120px",
      show: true,
      disableFilters: true,
      columns: [
        {
          Header: "Datetime",
          accessor: "datum_1",
          minWidth: "120px",
          show: true,
          disableFilters: true,
        },
        {
          Header: "Status",
          accessor: "status_1",
          minWidth: "140px",
          show: true,
          disableFilters: true,
        },
        {
          Header: "Value",
          accessor: "value_1",
          minWidth: "140px",
          show: true,
          disableFilters: true,
        },
      ],
    },
    {
      Header: "Akhir",
      accessor: "",
      minWidth: "120px",
      show: true,
      disableFilters: true,
      columns: [
        {
          Header: "Datetime",
          accessor: "datum_2",
          minWidth: "120px",
          show: true,
          disableFilters: true,
        },
        {
          Header: "Status",
          accessor: "status_2",
          minWidth: "140px",
          show: true,
          disableFilters: true,
        },
        {
          Header: "Value",
          accessor: "value_2",
          minWidth: "140px",
          show: true,
          disableFilters: true,
        },
      ],
    },
    {
      Header: "Durasi (dd:hh:mm:ss)",
      accessor: "durasi",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Kesimpulan",
      accessor: "kesimpulan",
      miSnWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_HISTORI_TELEMETERING_COLUMN_JQX = () => {
  const cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any,): string => {
    if (value === 'INVALID') {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
    } else {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
    }
  };

  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
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
      { name: 'msec_1', type: 'string' },
      { name: 'msec_2', type: 'string' },
      { name: 'kesimpulan', type: 'string' },

    ],
    columngroups: [
      { text: 'Awal', align: 'center', name: 'awal' },
      { text: 'Akhir', align: 'center', name: 'akhir' }
    ],

    columns: [
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: 100, editable: false, },
      { text: 'B1', datafield: 'path1', width: 100, editable: false, },
      { text: 'B2', datafield: 'path2', width: 100, editable: false, },
      { text: 'B3', datafield: 'path3', width: 100, editable: false, },
      { text: 'Element', datafield: 'path4', width: 100, editable: false, },
      { text: 'Info', datafield: 'path5', width: 100, editable: false, },
      { text: 'Datetime', datafield: 'datum_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Msec', datafield: 'msec_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Status', datafield: 'status_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Value', datafield: 'value_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Datetime', datafield: 'datum_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Msec', datafield: 'msec_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Status', datafield: 'status_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Value', datafield: 'value_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: 100, editable: false, },
      { text: 'Kesimpulan', datafield: 'kesimpulan', width: 100, editable: false, cellsrenderer: cellsrenderer, }

    ],
  };
};

export const SCADATEL_HISTORI_TELESIGNAL_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Info",
      accessor: "path5",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: 'Awal', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'Status', accessor: 'status_1', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'Datetime', accessor: 'datum_1', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'Value', accessor: 'value_1', minWidth: '120px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: 'Akhir', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'Status', accessor: 'status_2', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'Datetime', accessor: 'datum_2', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'Value', accessor: 'value_2', minWidth: '120px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: "Durasi (dd:hh:mm:ss)",
      accessor: "durasi",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Kesimpulan",
      accessor: "kesimpulan",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_HISTORI_TELESIGNAL_COLUMN_JQX = () => {
  const cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any,): string => {
    if (value === 'INVALID') {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
    } else {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
    }
  };

  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
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
      { name: 'msec_1', type: 'string' },
      { name: 'msec_2', type: 'string' },
      { name: 'kesimpulan', type: 'string' },

    ],
    columngroups: [
      { text: 'Awal', align: 'center', name: 'awal' },
      { text: 'Akhir', align: 'center', name: 'akhir' }
    ],

    columns: [
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: 100, editable: false, },
      { text: 'B1', datafield: 'path1', width: 100, editable: false, },
      { text: 'B2', datafield: 'path2', width: 100, editable: false, },
      { text: 'B3', datafield: 'path3', width: 100, editable: false, },
      { text: 'Element', datafield: 'path4', width: 100, editable: false, },
      { text: 'Info', datafield: 'path5', width: 100, editable: false, },
      { text: 'Datetime', datafield: 'datum_1', columngroup: 'awal', width: 150, editable: false, },
      { text: 'Msec', datafield: 'msec_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Status', datafield: 'status_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Value', datafield: 'value_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Datetime', datafield: 'datum_2', columngroup: 'akhir', width: 150, editable: false, },
      { text: 'Msec', datafield: 'msec_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Status', datafield: 'status_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Value', datafield: 'value_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: 150, editable: false, },
      { text: 'Kesimpulan', datafield: 'kesimpulan', width: 150, editable: false, cellsrenderer: cellsrenderer, }

    ],
  };
};

export const SCADATEL_HISTORI_RTU_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Info",
      accessor: "path5",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: 'Awal', accessor: '', minWidth: '190px', show: true, disableFilters: true, columns: [
        { Header: 'Status', accessor: 'status_1', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'Datetime', accessor: 'datum_1', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'Value', accessor: 'value_1', minWidth: '120px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: 'Akhir', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'Status', accessor: 'status_2', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'Datetime', accessor: 'datum_2', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'Value', accessor: 'value_2', minWidth: '120px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: "Durasi (dd:hh:mm:ss)",
      accessor: "durasi",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Kesimpulan",
      accessor: "kesimpulan",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_HISTORI_RTU_COLUMN_JQX = () => {
  const cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any,): string => {
    if (value === 'INVALID') {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
    } else {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
    }
  };

  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
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
      { name: 'msec_1', type: 'string' },
      { name: 'msec_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'kesimpulan', type: 'string' },

    ],
    columngroups: [
      { text: 'Awal', align: 'center', name: 'awal' },
      { text: 'Akhir', align: 'center', name: 'akhir' }
    ],

    columns: [
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: 100, editable: false, },
      { text: 'B1', datafield: 'path1', width: 100, editable: false, },
      { text: 'B2', datafield: 'path2', width: 100, editable: false, },
      { text: 'B3', datafield: 'path3', width: 100, editable: false, },
      { text: 'Element', datafield: 'path4', width: 100, editable: false, },
      { text: 'Info', datafield: 'path5', width: 100, editable: false, },
      { text: 'Datetime', datafield: 'datum_1', columngroup: 'awal', width: 150, editable: false, },
      { text: 'Msec', datafield: 'msec_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Status', datafield: 'status_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Value', datafield: 'value_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Datetime', datafield: 'datum_2', columngroup: 'akhir', width: 150, editable: false, },
      { text: 'Msec', datafield: 'msec_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Status', datafield: 'status_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Value', datafield: 'value_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: 150, editable: false, },
      { text: 'Kesimpulan', datafield: 'kesimpulan', width: 150, editable: false, cellsrenderer: cellsrenderer, }

    ],
  };
};

export const SCADATEL_HISTORI_MASTER_STATION_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Point Number",
      accessor: "point",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Info",
      accessor: "path5",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Awal",
      accessor: "",
      minWidth: "120px",
      show: true,
      disableFilters: true,
      columns: [
        {
          Header: "Datetime",
          accessor: "datum_1",
          minWidth: "120px",
          show: true,
          disableFilters: true,
        },
        {
          Header: "Status",
          accessor: "status_1",
          minWidth: "140px",
          show: true,
          disableFilters: true,
        },
        {
          Header: "Value",
          accessor: "value_1",
          minWidth: "140px",
          show: true,
          disableFilters: true,
        },
      ],
    },
    {
      Header: "Akhir",
      accessor: "",
      minWidth: "120px",
      show: true,
      disableFilters: true,
      columns: [
        {
          Header: "Datetime",
          accessor: "datum_2",
          minWidth: "120px",
          show: true,
          disableFilters: true,
        },
        {
          Header: "Status",
          accessor: "status_2",
          minWidth: "140px",
          show: true,
          disableFilters: true,
        },
        {
          Header: "Value",
          accessor: "value_2",
          minWidth: "140px",
          show: true,
          disableFilters: true,
        },
      ],
    },
    {
      Header: "Durasi (dd:hh:mm:ss)",
      accessor: "durasi",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Kesimpulan",
      accessor: "kesimpulan",
      miSnWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_HISTORI_MASTER_STATION_COLUMN_JQX = () => {
  const cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any,): string => {
    if (value === 'INVALID') {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
    } else {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
    }
  };

  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
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
      { name: 'msec_1', type: 'string' },
      { name: 'msec_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'kesimpulan', type: 'string' },

    ],
    columngroups: [
      { text: 'Awal', align: 'center', name: 'awal' },
      { text: 'Akhir', align: 'center', name: 'akhir' }
    ],

    columns: [
      { text: 'NO', datafield: 'number', width: "50px", editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: 100, editable: false, },
      { text: 'B1', datafield: 'path1', width: 100, editable: false, },
      { text: 'B2', datafield: 'path2', width: 100, editable: false, },
      { text: 'B3', datafield: 'path3', width: 100, editable: false, },
      { text: 'Element', datafield: 'path4', width: 100, editable: false, },
      { text: 'Info', datafield: 'path5', width: 100, editable: false, },
      { text: 'Datetime', datafield: 'datum_1', columngroup: 'awal', width: 150, editable: false, },
      { text: 'Msec', datafield: 'msec_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Status', datafield: 'status_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Value', datafield: 'value_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Datetime', datafield: 'datum_2', columngroup: 'akhir', width: 150, editable: false, },
      { text: 'Msec', datafield: 'msec_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Status', datafield: 'status_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Value', datafield: 'value_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: 100, editable: false, },
      { text: 'Kesimpulan', datafield: 'kesimpulan', width: 100, editable: false, cellsrenderer: cellsrenderer, }

    ],
  };
};

export const SCADATEL_HISTORI_ESTIMATOR_STATE_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Tanggal",
      accessor: "tgl",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Per10m",
      accessor: "per10m",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "PerJam",
      accessor: "perjam",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "PerHari",
      accessor: "perhar",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },

  ];
};
export const SCADATEL_HISTORI_TRIP_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Info",
      accessor: "path5",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Awal",
      accessor: "",
      minWidth: "120px",
      show: true,
      disableFilters: true,
      columns: [
        {
          Header: "Datetime",
          accessor: "datum_1",
          minWidth: "120px",
          show: true,
          disableFilters: true,
        },
        {
          Header: "Status",
          accessor: "status_1",
          minWidth: "140px",
          show: true,
          disableFilters: true,
        },
        {
          Header: "Value",
          accessor: "value_1",
          minWidth: "140px",
          show: true,
          disableFilters: true,
        },
      ],
    },
    {
      Header: "Akhir",
      accessor: "",
      minWidth: "120px",
      show: true,
      disableFilters: true,
      columns: [
        {
          Header: "Datetime",
          accessor: "datum_2",
          minWidth: "120px",
          show: true,
          disableFilters: true,
        },
        {
          Header: "Status",
          accessor: "status_2",
          minWidth: "140px",
          show: true,
          disableFilters: true,
        },
        {
          Header: "Value",
          accessor: "value_2",
          minWidth: "140px",
          show: true,
          disableFilters: true,
        },
      ],
    },
    {
      Header: "Durasi (dd:hh:mm:ss)",
      accessor: "durasi",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Kesimpulan",
      accessor: "kesimpulan",
      miSnWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_HISTORI_TRIP_COLUMN_JQX = () => {
  const cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any,): string => {
    if (value === 'INVALID') {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
    } else {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
    }
  };

  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
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
      { name: 'msec_1', type: 'string' },
      { name: 'msec_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'kesimpulan', type: 'string' }

    ],
    columngroups: [
      { text: 'Awal', align: 'center', name: 'awal' },
      { text: 'Akhir', align: 'center', name: 'akhir' }
    ],

    columns: [
      { text: 'NO', datafield: 'number', width: 50, editable: false, },
      // { text: 'Point Number', datafield: 'point_number', width: 100, editable: false, },
      { text: 'B1', datafield: 'path1', width: 100, editable: false, },
      { text: 'B2', datafield: 'path2', width: 100, editable: false, },
      { text: 'B3', datafield: 'path3', width: 100, editable: false, },
      { text: 'Element', datafield: 'path4', width: 100, editable: false, },
      { text: 'Info', datafield: 'path5', width: 100, editable: false, },
      { text: 'Datetime', datafield: 'datum_1', columngroup: 'awal', width: 150, editable: false, },
      { text: 'Msec', datafield: 'msec_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Status', datafield: 'status_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Value', datafield: 'value_1', columngroup: 'awal', width: 100, editable: false, },
      { text: 'Datetime', datafield: 'datum_2', columngroup: 'akhir', width: 150, editable: false, },
      { text: 'Msec', datafield: 'msec_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Status', datafield: 'status_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Value', datafield: 'value_2', columngroup: 'akhir', width: 100, editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: 150, editable: false, },
      { text: 'Kesimpulan', datafield: 'kesimpulan', width: 150, editable: false, cellsrenderer: cellsrenderer, }

    ],
  };
};

export const SCADATEL_HISTORI_RC_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Eksekusi",
      accessor: "status_1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Date Time Eksekusi",
      accessor: "datum_1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Hasil Eksekusi",
      accessor: "status_2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Date Time Hasil",
      accessor: "datum_2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Durasi",
      accessor: "durasi",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Kesimpulan",
      accessor: "kesimpulan",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_HISTORI_RC_COLUMN_JQX = () => {
  const eksekusi = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any,): string => {
    value = typeof value === 'string' ? value.trim() : value;

    if (value === 'Close') {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
    } else {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
    }
  };
  const hasileksekusi = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any,): string => {
    if (value === 'GAGAL') {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
    } else {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
    }
  };

  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'datum_1', type: 'string' },
      { name: 'status_1', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'msec_1', type: 'string' },
      { name: 'msec_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'kesimpulan', type: 'string' }

    ],

    columns: [
      { text: 'NO', datafield: 'number', width: "50px", editable: false, },
      { text: 'B1', datafield: 'path1', width: "180px", editable: false, },
      { text: 'B2', datafield: 'path2', width: "180px", editable: false, },
      { text: 'B3', datafield: 'path3', width: "180px", editable: false, },
      { text: 'Element', datafield: 'path4', width: "180px", editable: false, },
      { text: 'Eksekusi', datafield: 'status_1', width: "180px", editable: false, cellsrenderer: eksekusi, },
      { text: 'Datetime Eksekusi', datafield: 'datum_1', width: "180px", editable: false, },
      { text: 'Msec', datafield: 'msec_1', width: "150px", editable: false, },
      { text: 'Hasil Eksekusi', datafield: 'status_2', width: "180px", editable: false, cellsrenderer: hasileksekusi, },
      { text: 'Datetime Hasil Eksekusi', datafield: 'datum_2', width: "180px", editable: false, },
      { text: 'Msec', datafield: 'msec_2', width: "150px", editable: false, },
      { text: 'Durasi (dd:hh:mm:ss)', datafield: 'durasi', width: "180px", editable: false, },
      { text: 'Kesimpulan', datafield: 'kesimpulan', width: "180px", editable: false, }

    ],
  };
};

export const SCADATEL_HISTORI_SOE_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Date Time",
      accessor: "time_stamp",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Info",
      accessor: "info",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Status",
      accessor: "msgstatus",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Tag",
      accessor: "tag",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Operator",
      accessor: "operator",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Limit",
      accessor: "limit",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Value",
      accessor: "value",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_HISTORI_SOE_COLUMN_JQX = () => {

  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'time_stamp', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'info', type: 'string' },
      { name: 'msgstatus', type: 'string' },
      { name: 'tag', type: 'string' },
      { name: 'operator', type: 'string' },
      { name: 'limit', type: 'string' },
      { name: 'value', type: 'string' },
      { name: 'msec', type: 'string' }

    ],

    columns: [
      { text: 'NO', datafield: 'number', width: "50px", editable: false, },
      { text: 'Datetime', datafield: 'time_stamp', width: "180px", editable: false, },
      { text: 'Msec', datafield: 'msec', width: "150px", editable: false, },
      { text: 'B1', datafield: 'path1', width: "180px", editable: false, },
      { text: 'B2', datafield: 'path2', width: "180px", editable: false, },
      { text: 'B3', datafield: 'path3', width: "180px", editable: false, },
      { text: 'Element', datafield: 'path4', width: "180px", editable: false, },
      { text: 'Info', datafield: 'info', width: "180px", editable: false, },
      { text: 'Status', datafield: 'msgstatus', width: "180px", editable: false, },
      { text: 'Tag', datafield: 'tag', width: "180px", editable: false, },
      { text: 'Operator', datafield: 'operator', width: "180px", editable: false, },
      { text: 'Limit', datafield: 'limit', width: "180px", editable: false, },
      { text: 'Value', datafield: 'value', width: "180px", editable: false, }

    ],
  };
};

// export const SCADATEL_KINERJA_TELEMETERING_HARI_COLUMN = () => {
//   return [
//     ...NO(),
//     {
//       Header: "B1",
//       accessor: "path1",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "B2",
//       accessor: "path2",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "B3",
//       accessor: "path3",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "Element",
//       accessor: "path4",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "Durasi Up",
//       accessor: "durasi_perubahan",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "Avability(%)",
//       accessor: "msgstatus",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//   ];
// };

export const SCADATEL_KINERJA_TELEMETERING_BULAN_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Station",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Jumlah Point",
      accessor: "poin",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Normal Time (dd:hh:mm:ss)",
      accessor: "durasi_normal",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Uptime (dd:hh:mm:ss)",
      accessor: "durasi_uptime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Downtime (dd:hh:mm:ss)",
      accessor: "durasi_downtime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Avail (%)",
      accessor: "avability",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_KINERJA_TELEMETERING_BULAN_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'durasi_alltime', type: 'string' },
      { name: 'durasi_uptime', type: 'string' },
      { name: 'durasi_downtime', type: 'string' },
      { name: 'tanggal_perbaikan', type: 'string' },
      { name: 'rekon', type: 'string' },
      { name: 'ava_rekon', type: 'string' },
      { name: 'avability', type: 'string' },
      { name: 'keterangan', type: 'string' },


    ],
    columngroups: [
        
      { text: 'Rekon', align: 'center', name: 'rekongroup' },
      
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '10%', editable: false, },
      { text: 'Tipe Point', datafield: 'nama_pointtype', width: '10%', editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1', width: '10%', editable: false, },
   
      { text: 'B2(Tegangan)', datafield: 'path2', width: '10%', editable: false, },
   
      { text: 'B3(Bay)', datafield: 'path3', width: '10%', editable: false, },
   
      { text: 'Element', datafield: 'path4', width: '5%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '5%', editable: false, },
   
      { text: 'Normal Time (dd:hh:mm:ss)', datafield: 'durasi_alltime', width: '10%', editable: false, },
      { text: 'Uptime (dd:hh:mm:ss)', datafield: 'durasi_uptime', width: '10%', editable: false, },
      { text: 'Downtime (dd:hh:mm:ss)', datafield: 'durasi_downtime', width: '10%', editable: false, },
      { text: 'Tanggal Perbaikan', datafield: 'tanggal_perbaikan', width: '10%', editable: true, },
      // { text: 'Ava Rekon', datafield: 'ava_rekon', width: '10%', editable: true, },
      { text: 'Avability', datafield: 'avability', width: '10%', editable: false, },
      // { text: 'keterangan', datafield: 'keterangan', width: '10%', editable: false, },
      { text: 'Status Rekon', datafield: 'rekon', columngroup: 'rekongroup', width: '10%',    columntype: "checkbox",},
      { text: 'Ava Rekon %', datafield: 'ava_rekon',  columngroup: 'rekongroup',width: '10%', editable: true, },
      { text: 'Keterangan', datafield: 'keterangan',  columngroup: 'rekongroup',width: '10%', editable: true, },
    ],
  };
};
export const SCADATEL_KINERJA_TELEMETERING_BULAN_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'durasi_alltime', type: 'string' },
      { name: 'durasi_uptime', type: 'string' },
      { name: 'durasi_downtime', type: 'string' },
      { name: 'avability', type: 'string' },


    ],
    columns: [
      { label: 'NO', dataField: 'number', width: '3%' },
      { label: 'Point Number', dataField: 'point_number', width: '10%' },
      { label: 'Tipe Point', dataField: 'nama_pointtype', width: '10%' },
      { label: 'B1 (Lokasi)', dataField: 'path1', width: '10%' },
   
      { label: 'B2(Tegangan)', dataField: 'path2', width: '10%' },
   
      { label: 'B3(Bay)', dataField: 'path3', width: '10%' },
   
      { label: 'Element', dataField: 'path4', width: '5%' },
      { label: 'Info', dataField: 'path5', width: '5%' },
   
      { label: 'Normal Time (dd:hh:mm:ss)', dataField: 'durasi_alltime', width: '10%' },
      { label: 'Uptime (dd:hh:mm:ss)', dataField: 'durasi_uptime', width: '10%' },
      { label: 'Downtime (dd:hh:mm:ss)', dataField: 'durasi_downtime', width: '10%' },
      { label: 'Avability', dataField: 'avability', width: '10%' }
    ],
  };
};
export const SCADATEL_KINERJA_TELEMETERING_HARI_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'thn_bln', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'datum', type: 'string' },
      { name: 'durasi_alltime', type: 'string' },
      { name: 'durasi_uptime', type: 'string' },
      { name: 'durasi_downtime', type: 'string' },
      { name: 'avability', type: 'string' },
      { name: 'kinerja', type: 'string' }

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Datum', datafield: 'datum', width: '10%', editable: false, },
      { text: 'Normal Time (dd:hh:mm:ss)', datafield: 'durasi_alltime', width: '10%', editable: false, },
      { text: 'Uptime (dd:hh:mm:ss)', datafield: 'durasi_uptime', width: '10%', editable: false, },
      { text: 'Downtime (dd:hh:mm:ss)', datafield: 'durasi_downtime', width: '10%', editable: false, },
      { text: 'Avability', datafield: 'avability', width: '10%', editable: false, },
      { text: 'Kinerja', datafield: 'kinerja', width: '10%', editable: false,columntype: "checkbox",
        filtertype: "bool" }
    ],
  };
};

export const SCADATEL_KINERJA_TELEMETERING_DETAIL_COLUMN = () => {
  return [
    ...NO(),

    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Normal Time (dd:hh:mm:ss)",
      accessor: "durasi_normal",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Uptime (dd:hh:mm:ss)",
      accessor: "durasi_uptime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Downtime (dd:hh:mm:ss)",
      accessor: "durasi_downtime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Avail (%)",
      accessor: "performance",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};


export const SCADATEL_KINERJA_DETAIL_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'thn_bln', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'datum', type: 'string' },
      { name: 'durasi_alltime', type: 'string' },
      { name: 'durasi_uptime', type: 'string' },
      { name: 'durasi_downtime', type: 'string' },
      { name: 'avability', type: 'string' },
      { name: 'kinerja', type: 'string' },
      { name: 'nama_pointtype', type: 'string' }

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Datum', datafield: 'datum', width: '10%', editable: false, },
      { text: 'Normal Time (dd:hh:mm:ss)', datafield: 'durasi_alltime', width: '10%', editable: false, },
      { text: 'Uptime (dd:hh:mm:ss)', datafield: 'durasi_uptime', width: '10%', editable: false, },
      { text: 'Downtime (dd:hh:mm:ss)', datafield: 'durasi_downtime', width: '10%', editable: false, },
      { text: 'Avability', datafield: 'avability', width: '10%', editable: false, },
      { text: 'Kinerja', datafield: 'kinerja', width: '10%', editable: false,columntype: "checkbox",
        filtertype: "bool"}
    ],
  };
};

export const SCADATEL_KINERJA_TELESIGNAL_BULAN_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Station",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Jumlah Point",
      accessor: "poin",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Normal Time (dd:hh:mm:ss)",
      accessor: "normal_time",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Uptime (dd:hh:mm:ss)",
      accessor: "durasi_uptime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Downtime (dd:hh:mm:ss)",
      accessor: "durasi_downtime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Avail (%)",
      accessor: "avability",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_KINERJA_TELESIGNAL_BULAN_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'durasi_alltime', type: 'string' },
      { name: 'durasi_uptime', type: 'string' },
      { name: 'durasi_downtime', type: 'string' },
      { name: 'tanggal_perbaikan', type: 'string' },
      { name: 'rekon', type: 'string' },
      { name: 'ava_rekon', type: 'string' },
      { name: 'avability', type: 'string' },
      { name: 'keterangan', type: 'string' },


    ],
    columngroups: [
        
      { text: 'Rekon', align: 'center', name: 'rekongroup' },
      
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '10%', editable: false, },
      { text: 'Tipe Point', datafield: 'nama_pointtype', width: '10%', editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1', width: '10%', editable: false, },
   
      { text: 'B2(Tegangan)', datafield: 'path2', width: '10%', editable: false, },
   
      { text: 'B3(Bay)', datafield: 'path3', width: '10%', editable: false, },
   
      { text: 'Element', datafield: 'path4', width: '5%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '5%', editable: false, },
   
      { text: 'Normal Time (dd:hh:mm:ss)', datafield: 'durasi_alltime', width: '10%', editable: false, },
      { text: 'Uptime (dd:hh:mm:ss)', datafield: 'durasi_uptime', width: '10%', editable: false, },
      { text: 'Downtime (dd:hh:mm:ss)', datafield: 'durasi_downtime', width: '10%', editable: false, },
      { text: 'Tanggal Perbaikan', datafield: 'tanggal_perbaikan', width: '10%', editable: true, },
      // { text: 'Ava Rekon', datafield: 'ava_rekon', width: '10%', editable: true, },
      { text: 'Avability', datafield: 'avability', width: '10%', editable: false, },
      // { text: 'keterangan', datafield: 'keterangan', width: '10%', editable: false, },
      { text: 'Status Rekon', datafield: 'rekon', columngroup: 'rekongroup', width: '10%',    columntype: "checkbox",},
      { text: 'Ava Rekon %', datafield: 'ava_rekon',  columngroup: 'rekongroup',width: '10%', editable: true, },
      { text: 'Keterangan', datafield: 'keterangan',  columngroup: 'rekongroup',width: '10%', editable: true, },
    ],
  };
};
export const SCADATEL_KINERJA_TELESIGNAL_BULAN_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'durasi_alltime', type: 'string' },
      { name: 'durasi_uptime', type: 'string' },
      { name: 'durasi_downtime', type: 'string' },
      { name: 'avability', type: 'string' },


    ],
    columns: [
      { label: 'NO', dataField: 'number', width: '3%' },
      { label: 'Point Number', dataField: 'point_number', width: '10%' },
      { label: 'Tipe Point', dataField: 'nama_pointtype', width: '10%' },
      { label: 'B1 (Lokasi)', dataField: 'path1', width: '10%' },
   
      { label: 'B2(Tegangan)', dataField: 'path2', width: '10%' },
   
      { label: 'B3(Bay)', dataField: 'path3', width: '10%' },
   
      { label: 'Element', dataField: 'path4', width: '5%' },
      { label: 'Info', dataField: 'path5', width: '5%' },
   
      { label: 'Normal Time (dd:hh:mm:ss)', dataField: 'durasi_alltime', width: '10%' },
      { label: 'Uptime (dd:hh:mm:ss)', dataField: 'durasi_uptime', width: '10%' },
      { label: 'Downtime (dd:hh:mm:ss)', dataField: 'durasi_downtime', width: '10%' },
      { label: 'Avability', dataField: 'avability', width: '10%' }
    ],
  };
};

export const SCADATEL_KINERJA_TELESIGNAL_DETAIL_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Normal Time (dd:hh:mm:ss)",
      accessor: "normal_time",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Uptime (dd:hh:mm:ss)",
      accessor: "durasi_uptime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Downtime (dd:hh:mm:ss)",
      accessor: "durasi_downtime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Avail (%)",
      accessor: "performance",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_KINERJA_TELESIGNAL_DETAIL_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'durasi_normal', type: 'string' },
      { name: 'durasi_uptime', type: 'string' },
      { name: 'durasi_downtime', type: 'string' },
      { name: 'performance', type: 'string' }

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Normal Time (dd:hh:mm:ss)', datafield: 'durasi_normal', width: '10%', editable: false, },
      { text: 'Uptime (dd:hh:mm:ss)', datafield: 'durasi_uptime', width: '10%', editable: false, },
      { text: 'Downtime (dd:hh:mm:ss)', datafield: 'durasi_downtime', width: '10%', editable: false, },
      { text: 'Avail (%)', datafield: 'performance', width: '10%', editable: false, }
    ],
  };
};

export const SCADATEL_KINERJA_RTU_BULAN_COLUMN = () => {
  return [
    {
      Header: "Station",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Jumlah Point",
      accessor: "poin",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Normal Time (dd:hh:mm:ss)",
      accessor: "normal_time",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Uptime (dd:hh:mm:ss)",
      accessor: "durasi_uptime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Downtime (dd:hh:mm:ss)",
      accessor: "durasi_downtime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Avail (%)",
      accessor: "avability",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_KINERJA_RTU_BULAN_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'durasi_alltime', type: 'string' },
      { name: 'durasi_uptime', type: 'string' },
      { name: 'durasi_downtime', type: 'string' },
      { name: 'tanggal_perbaikan', type: 'string' },
      { name: 'rekon', type: 'string' },
      { name: 'ava_rekon', type: 'string' },
      { name: 'avability', type: 'string' },
      { name: 'keterangan', type: 'string' },


    ],

    columngroups: [
        
      { text: 'Rekon', align: 'center', name: 'rekongroup' },
      
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '10%', editable: false, },
      { text: 'Tipe Point', datafield: 'nama_pointtype', width: '10%', editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1', width: '10%', editable: false, },
   
      { text: 'B2(Tegangan)', datafield: 'path2', width: '10%', editable: false, },
   
      { text: 'B3(Bay)', datafield: 'path3', width: '10%', editable: false, },
   
      { text: 'Element', datafield: 'path4', width: '5%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '5%', editable: false, },
   
      { text: 'Normal Time (dd:hh:mm:ss)', datafield: 'durasi_alltime', width: '10%', editable: false, },
      { text: 'Uptime (dd:hh:mm:ss)', datafield: 'durasi_uptime', width: '10%', editable: false, },
      { text: 'Downtime (dd:hh:mm:ss)', datafield: 'durasi_downtime', width: '10%', editable: false, },
      { text: 'Tanggal Perbaikan', datafield: 'tanggal_perbaikan', width: '10%', editable: true, },
      // { text: 'Ava Rekon', datafield: 'ava_rekon', width: '10%', editable: true, },
      { text: 'Avability', datafield: 'avability', width: '10%', editable: false, },
      // { text: 'keterangan', datafield: 'keterangan', width: '10%', editable: false, },
      { text: 'Status Rekon', datafield: 'rekon', columngroup: 'rekongroup', width: '10%',    columntype: "checkbox",},
      { text: 'Ava Rekon %', datafield: 'ava_rekon',  columngroup: 'rekongroup',width: '10%', editable: true, },
      { text: 'Keterangan', datafield: 'keterangan',  columngroup: 'rekongroup',width: '10%', editable: true, },
    ],
  };
};
export const SCADATEL_KINERJA_RTU_BULAN_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'durasi_alltime', type: 'string' },
      { name: 'durasi_uptime', type: 'string' },
      { name: 'durasi_downtime', type: 'string' },
      { name: 'avability', type: 'string' },


    ],
    columns: [
      { label: 'NO', dataField: 'number', width: '3%',  },
      { label: 'Point Number', dataField: 'point_number', width: '10%',  },
      { label: 'Tipe Point', dataField: 'nama_pointtype', width: '10%',  },
      { label: 'B1 (Lokasi)', dataField: 'path1', width: '10%',  },
   
      { label: 'B2(Tegangan)', dataField: 'path2', width: '10%',  },
   
      { label: 'B3(Bay)', dataField: 'path3', width: '10%',  },
   
      { label: 'Element', dataField: 'path4', width: '5%',  },
      { label: 'Info', dataField: 'path5', width: '5%',  },
   
      { label: 'Normal Time (dd:hh:mm:ss)', dataField: 'durasi_alltime', width: '10%',  },
      { label: 'Uptime (dd:hh:mm:ss)', dataField: 'durasi_uptime', width: '10%',  },
      { label: 'Downtime (dd:hh:mm:ss)', dataField: 'durasi_downtime', width: '10%',  },
      { label: 'Avability', dataField: 'avability', width: '10%',  }
    ],
  };
};
export const SCADATEL_KINERJA_RTU_BULAN_HARI_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'thn_bln', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'datum', type: 'string' },
      { name: 'durasi_alltime', type: 'string' },
      { name: 'durasi_uptime', type: 'string' },
      { name: 'durasi_downtime', type: 'string' },
      { name: 'avability', type: 'string' },
      { name: 'kinerja', type: 'string' }

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Datum', datafield: 'datum', width: '10%', editable: false, },
      { text: 'Normal Time (dd:hh:mm:ss)', datafield: 'durasi_alltime', width: '10%', editable: false, },
      { text: 'Uptime (dd:hh:mm:ss)', datafield: 'durasi_uptime', width: '10%', editable: false, },
      { text: 'Downtime (dd:hh:mm:ss)', datafield: 'durasi_downtime', width: '10%', editable: false, },
      { text: 'Avability', datafield: 'avability', width: '10%', editable: false, },
      { text: 'Kinerja', datafield: 'kinerja', width: '10%', editable: false, columntype: "checkbox",
        filtertype: "bool"}
    ],
  };
};

export const SCADATEL_KINERJA_RTU_DETAIL_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Normal Time (dd:hh:mm:ss)",
      accessor: "normal_time",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Uptime (dd:hh:mm:ss)",
      accessor: "durasi_uptime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Downtime (dd:hh:mm:ss)",
      accessor: "durasi_downtime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Avail (%)",
      accessor: "avability",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

// export const SCADATEL_KINERJA_MASTER_STATION_HARI_COLUMN = () => {
//   return [
//     ...NO(),
//     {
//       Header: "B1",
//       accessor: "path1",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "B2",
//       accessor: "path2",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "B3",
//       accessor: "path3",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "Element",
//       accessor: "path4",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "Durasi Up",
//       accessor: "durasi_perubahan",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "Avability(%)",
//       accessor: "msgstatus",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//   ];
// };


export const SCADATEL_KINERJA_MASTER_STATION_BULAN_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Station",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Faktor",
      accessor: "faktor",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Up",
      accessor: "up",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Down",
      accessor: "down",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Uptime (dd:hh:mm:ss)",
      accessor: "uptime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Downtime (dd:hh:mm:ss)",
      accessor: "downtime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Performance (%)",
      accessor: "performance",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Duration (dd:hh:mm:ss)",
      accessor: "durasi_uptime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_KINERJA_MASTER_STATION_DETAIL_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Up",
      accessor: "up",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Down",
      accessor: "down",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    }, {
      Header: "Uptime (dd:hh:mm:ss)",
      accessor: "uptime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Downtime (dd:hh:mm:ss)",
      accessor: "downtime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

// export const SCADATEL_KINERJA_TRIP_HARI_COLUMN = () => {
//   return [
//     ...NO(),
//     {
//       Header: "B1",
//       accessor: "path1",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "B2",
//       accessor: "path2",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "B3",
//       accessor: "path3",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "Element",
//       accessor: "path4",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "Durasi Up",
//       accessor: "durasi_perubahan",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "Avability(%)",
//       accessor: "msgstatus",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//   ];
// };

export const SCADATEL_KINERJA_TRIP_BULAN_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Trip (kali)",
      accessor: "tripx",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_KINERJA_TRIP_BULAN_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'tripx', type: 'string' },
      // { name: 'sukses', type: 'string' },
      // { name: 'gagal', type: 'string' },
      { name: 'performance', type: 'string' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '17%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Jumlah TRIP', datafield: 'tripx', width: '10%', editable: false, },
      // { text: 'Sukses', datafield: 'sukses', width: '10%', editable: false, },
      // { text: 'Gagal', datafield: 'gagal', width: '10%', editable: false, },
      { text: 'Performance (%)', datafield: 'performance', width: '10%', editable: false, },

    ],
  };
};

export const SCADATEL_KINERJA_STATEESTIMATOR_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Bulan Tahun",
      accessor: "thn_bln",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Jumlah Hari",
      accessor: "jlh_hari",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Ava%",
      accessor: "ava",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: 'Rekap Per 10 Menit', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'converged', accessor: 'jlh_con_10m', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'Not converged', accessor: 'jlh_not_con_10m', minWidth: '120px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: 'Rekap Per 1 Jam', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'converged', accessor: 'jlh_con_jam', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'Not converged', accessor: 'jlh_not_con_jam', minWidth: '120px', show: true, disableFilters: true, },

      ]
    },
    {
      Header: 'Rekap Per Hari', accessor: '', minWidth: '120px', show: true, disableFilters: true, columns: [
        { Header: 'converged', accessor: 'jlh_con_hari', minWidth: '120px', show: true, disableFilters: true, },
        { Header: 'Not converged', accessor: 'jlh_not_con_hari', minWidth: '120px', show: true, disableFilters: true, },

      ]
    },

  ];
};

export const SCADATEL_KINERJA_STATEESTIMATOR_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'thn_bln', type: 'number' },
      { name: 'jlh_hari', type: 'string' },
      { name: 'ava', type: 'string' },
      { name: 'jlh_con_10m', type: 'string' },
      { name: 'jlh_not_con_10m', type: 'string' },
      { name: 'jlh_con_jam', type: 'string' },
      { name: 'jlh_not_con_jam', type: 'string' },
      { name: 'jlh_con_hari', type: 'string' },
      { name: 'jlh_not_con_hari', type: 'string' }

    ],
    columngroups: [
      { text: 'Rekap Per 10 Menit', align: 'center', name: 'rekap10mnt' },
      { text: 'Rekap Per 1 Jam', align: 'center', name: 'rekap1jam' },
      { text: 'Rekap Per Hari', align: 'center', name: 'rekaphari' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Bulan Tahun', datafield: 'thn_bln', width: '17%', editable: false, },
      { text: 'Jumlah Hari', datafield: 'jlh_hari', width: '10%', editable: false, },
      { text: 'Ava%', datafield: 'ava', width: '10%', editable: false, },
      { text: 'Converged', datafield: 'jlh_con_10m', columngroup: 'rekap10mnt', width: '10%', editable: false, },
      { text: 'Not Converged', datafield: 'jlh_not_con_10m', columngroup: 'rekap10mnt', width: '10%', editable: false, },
      { text: 'Converged', datafield: 'jlh_con_jam', columngroup: 'rekap1jam', width: '10%', editable: false, },
      { text: 'Not Converged', datafield: 'jlh_not_con_jam', columngroup: 'rekap1jam', width: '10%', editable: false, },
      { text: 'Converged', datafield: 'jlh_con_hari', columngroup: 'rekaphari', width: '10%', editable: false, },
      { text: 'Not Converged', datafield: 'jlh_not_con_hari', columngroup: 'rekaphari', width: '10%', editable: false, }
    ],
  };
};

export const SCADATEL_HIS_STATEESTIMATOR_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "DateTime",
      accessor: "time_stamp",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },

  ];
};

export const SCADATEL_HIS_STATE_ESTIMATOR_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'time_stamp', type: 'string' },
      { name: 'status', type: 'string' },
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Date Time', datafield: 'time_stamp', width: '50%', editable: false, },
      { text: 'Status', datafield: 'status', width: '47%', editable: false, },
    ],
  };
};

export const SCADATEL_HIS_STATEESTIMATOR_1JAM_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "DateTime",
      accessor: "time_stamp",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },

  ];
};

export const SCADATEL_HIS_STATEESTIMATOR_HARI_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "DateTime",
      accessor: "time_stamp",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },

  ];
};

export const SCADATEL_KINERJA_STATEESTIMATOR_10_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "DateTime",
      accessor: "time_stamp",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },

  ];
};

export const SCADATEL_KINERJA_STATEESTIMATOR_1JAM_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "DateTime",
      accessor: "time_stamp",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },

  ];
};

export const SCADATEL_KINERJA_STATEESTIMATOR_HARI_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "DateTime",
      accessor: "time_stamp",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },

  ];
};

export const SCADATEL_KINERJA_STATE_ESTIMATOR_DETAIL_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'time_stamp', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'thn_bln', type: 'string' },
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Date Time', datafield: 'time_stamp', width: '50%', editable: false, },
      { text: 'Status', datafield: 'status', width: '47%', editable: false, },
    ],
  };
};

export const SCADATEL_KINERJA_TRIP_DETAIL_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Durasi Up",
      accessor: "durasi_perubahan",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },

  ];
};
// export const SCADATEL_KINERJA_RC_HARI_COLUMN = () => {
//   return [
//     ...NO(),
//     {
//       Header: "B1",
//       accessor: "path1",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "B2",
//       accessor: "path2",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "B3",
//       accessor: "path3",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "Element",
//       accessor: "path4",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "Durasi Up",
//       accessor: "durasi_perubahan",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//     {
//       Header: "Avability(%)",
//       accessor: "msgstatus",
//       minWidth: "180px",
//       disableFilters: true,
//       show: true,
//     },
//   ];
// };

export const SCADATEL_KINERJA_RC_BULAN_COLUMN = () => {
  return [
    ...NO(),
    ...PATH1(),
    ...PATH2(),
    ...PATH3(),
    ...PATH4(),
    ...PATH5(),
    { Header: "Jumlah RC", accessor: "poin", minWidth: "180px", disableFilters: true, show: true },
    { Header: "Sukses", accessor: "sukses", minWidth: "180px", disableFilters: true, show: true },
    { Header: "Gagal", accessor: "gagal", minWidth: "180px", disableFilters: true, show: true },
    { Header: "Performance (%)", accessor: "performance", minWidth: "180px", disableFilters: true, show: true },
  ];
};

export const SCADATEL_KINERJA_RC_BULAN_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'poin', type: 'string' },
      { name: 'sukses', type: 'string' },
      { name: 'gagal', type: 'string' },
      { name: 'performance', type: 'string' },
      { name: 'tanggal_perbaikan', type: 'string' },
      { name: 'avability_rekon', type: 'string' },
      { name: 'rekon', type: 'string' },
      { name: 'ava_rekon', type: 'string' },
      { name: 'keterangan', type: 'string' },

    ],
    columngroups: [
        
      { text: 'Rekon', align: 'center', name: 'rekongroup' },
      
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '17%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      { text: 'Jumlah RC', datafield: 'poin', width: '10%', editable: false, },
      { text: 'Sukses', datafield: 'sukses', width: '10%', editable: false, },
      { text: 'Gagal', datafield: 'gagal', width: '10%', editable: false, },
      { text: 'Avability (%)', datafield: 'performance', width: '10%', editable: false, },
      // { text: 'Tanggal Perbaikan', datafield: 'tanggal_perbaikan', width: '10%', editable: true, },
      // { text: 'Avability Rekon(%)', datafield: 'avability_rekon', width: '10%', editable: true, },
      { text: 'Status Rekon', datafield: 'rekon', columngroup: 'rekongroup', width: '10%',    columntype: "checkbox",},
      { text: 'Ava Rekon %', datafield: 'ava_rekon',  columngroup: 'rekongroup',width: '10%', editable: true, },
      { text: 'Keterangan', datafield: 'keterangan',  columngroup: 'rekongroup',width: '10%', editable: true, },
      // { text: 'keterangan', datafield: 'keterangan', width: '10%', editable: false, },
    ],
  };
};
export const SCADATEL_KINERJA_RC_BULAN_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'poin', type: 'string' },
      { name: 'sukses', type: 'string' },
      { name: 'gagal', type: 'string' },
      { name: 'performance', type: 'string' },

    ],
    columns: [
      { label: 'NO', dataField: 'number', width: '3%' },
      { label: 'B1', dataField: 'path1', width: '17%' },
      { label: 'B2', dataField: 'path2', width: '10%' },
      { label: 'B3', dataField: 'path3', width: '10%' },
      { label: 'Element', dataField: 'path4', width: '10%' },
      { label: 'Info', dataField: 'path5', width: '10%' },
      { label: 'Jumlah RC', dataField: 'poin', width: '10%' },
      { label: 'Sukses', dataField: 'sukses', width: '10%' },
      { label: 'Gagal', dataField: 'gagal', width: '10%' },
      { label: 'Performance (%)', dataField: 'performance', width: '10%' },

    ],
  };
};

export const SCADATEL_KINERJA_RC_DETAIL_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Durasi Up",
      accessor: "durasi_perubahan",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Avability(%)",
      accessor: "msgstatus",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SCADATEL_KINERJA_master_BULAN_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "Station",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Jumlah Point",
      accessor: "poin",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Normal Time (dd:hh:mm:ss)",
      accessor: "normal_time",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Uptime (dd:hh:mm:ss)",
      accessor: "durasi_uptime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Downtime (dd:hh:mm:ss)",
      accessor: "durasi_downtime",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Avail (%)",
      accessor: "avability",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },

  ];
};

export const SCADATEL_KINERJA_MASTER_BULAN_COLUMN_JQX = () => {
    return {
      datafields: [
        { name: 'number', type: 'number' },
        { name: 'point_number', type: 'string' },
        { name: 'nama_pointtype', type: 'string' },
        { name: 'path1', type: 'string' },
        { name: 'path2', type: 'string' },
        { name: 'path3', type: 'string' },
        { name: 'path4', type: 'string' },
        { name: 'path5', type: 'string' },
        { name: 'durasi_alltime', type: 'string' },
        { name: 'durasi_uptime', type: 'string' },
        { name: 'durasi_downtime', type: 'string' },
        { name: 'tanggal_perbaikan', type: 'string' },
        { name: 'rekon', type: 'string' },
        { name: 'ava_rekon', type: 'string' },
        { name: 'avability', type: 'string' },
        { name: 'keterangan', type: 'string' },
  
  
      ],
      columngroups: [
        
        { text: 'Rekon', align: 'center', name: 'rekongroup' },
        
      ],
      columns: [
        { text: 'NO', datafield: 'number', width: '3%', editable: false, },
        { text: 'Point Number', datafield: 'point_number', width: '10%', editable: false, },
        { text: 'Tipe Point', datafield: 'nama_pointtype', width: '10%', editable: false, },
        { text: 'B1 (Lokasi)', datafield: 'path1', width: '10%', editable: false, },
     
        { text: 'B2(Tegangan)', datafield: 'path2', width: '10%', editable: false, },
     
        { text: 'B3(Bay)', datafield: 'path3', width: '10%', editable: false, },
     
        { text: 'Element', datafield: 'path4', width: '5%', editable: false, },
        { text: 'Info', datafield: 'path5', width: '5%', editable: false, },
     
        { text: 'Normal Time (dd:hh:mm:ss)', datafield: 'durasi_alltime', width: '10%', editable: false, },
        { text: 'Uptime (dd:hh:mm:ss)', datafield: 'durasi_uptime', width: '10%', editable: false, },
        { text: 'Downtime (dd:hh:mm:ss)', datafield: 'durasi_downtime', width: '10%', editable: false, },
        { text: 'Tanggal Perbaikan', datafield: 'tanggal_perbaikan', width: '10%', editable: true, },
        { text: 'Avability', datafield: 'avability', width: '10%', editable: false, },
        // { text: 'keterangan', datafield: 'keterangan', width: '10%', editable: false, },
        { text: 'Status Rekon', datafield: 'rekon', columngroup: 'rekongroup', width: '10%',    columntype: "checkbox",},
        { text: 'Ava Rekon %', datafield: 'ava_rekon',  columngroup: 'rekongroup',width: '10%', editable: true, },
        { text: 'Keterangan', datafield: 'keterangan',  columngroup: 'rekongroup',width: '10%', editable: true, },
      ],
    };
  };
export const SCADATEL_KINERJA_MASTER_BULAN_COLUMN_GRID = () => {
    return {
      datafields: [
        { name: 'number', type: 'number' },
        { name: 'point_number', type: 'string' },
        { name: 'nama_pointtype', type: 'string' },
        { name: 'path1', type: 'string' },
        { name: 'path2', type: 'string' },
        { name: 'path3', type: 'string' },
        { name: 'path4', type: 'string' },
        { name: 'path5', type: 'string' },
        { name: 'durasi_alltime', type: 'string' },
        { name: 'durasi_uptime', type: 'string' },
        { name: 'durasi_downtime', type: 'string' },
        { name: 'avability', type: 'string' },
  
  
      ],
      columns: [
        { label: 'NO', dataField: 'number', width: '3%', editable: false, },
        { label: 'Point Number', dataField: 'point_number', width: '10%', editable: false, },
        { label: 'Tipe Point', dataField: 'nama_pointtype', width: '10%', editable: false, },
        { label: 'B1 (Lokasi)', dataField: 'path1', width: '10%', editable: false, },
     
        { label: 'B2(Tegangan)', dataField: 'path2', width: '10%', editable: false, },
     
        { label: 'B3(Bay)', dataField: 'path3', width: '10%', editable: false, },
     
        { label: 'Element', dataField: 'path4', width: '5%', editable: false, },
        { label: 'Info', dataField: 'path5', width: '5%', editable: false, },
     
        { label: 'Normal Time (dd:hh:mm:ss)', dataField: 'durasi_alltime', width: '10%', editable: false, },
        { label: 'Uptime (dd:hh:mm:ss)', dataField: 'durasi_uptime', width: '10%', editable: false, },
        { label: 'Downtime (dd:hh:mm:ss)', dataField: 'durasi_downtime', width: '10%', editable: false, },
        { label: 'Avability', dataField: 'avability', width: '10%', editable: false, }
      ],
    };
  };
export const SCADATEL_KINERJA_MASTER_HARI_COLUMN_JQX = () => {
    return {
      datafields: [
        { name: 'number', type: 'number' },
        { name: 'thn_bln', type: 'number' },
        { name: 'point_number', type: 'string' },
        { name: 'path1', type: 'string' },
        { name: 'path2', type: 'string' },
        { name: 'path3', type: 'string' },
        { name: 'path4', type: 'string' },
        { name: 'path5', type: 'string' },
        { name: 'datum', type: 'string' },
        { name: 'durasi_alltime', type: 'string' },
        { name: 'durasi_uptime', type: 'string' },
        { name: 'durasi_downtime', type: 'string' },
        { name: 'avability', type: 'string' },
        { name: 'kinerja', type: 'string' }
  
      ],
      columns: [
        { text: 'NO', datafield: 'number', width: '3%', editable: false, },
        { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
        { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
        { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
        { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
        { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
        { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
        { text: 'Datum', datafield: 'datum', width: '10%', editable: false, },
        { text: 'Normal Time (dd:hh:mm:ss)', datafield: 'durasi_alltime', width: '10%', editable: false, },
        { text: 'Uptime (dd:hh:mm:ss)', datafield: 'durasi_uptime', width: '10%', editable: false, },
        { text: 'Downtime (dd:hh:mm:ss)', datafield: 'durasi_downtime', width: '10%', editable: false, },
        { text: 'Avability', datafield: 'avability', width: '10%', editable: false, },
        { text: 'Kinerja', datafield: 'kinerja', width: '10%', editable: false,columntype: "checkbox",
          filtertype: "bool" }
      ],
    };
  };

export const SCADATEL_KINERJA_master_DETAIL_COLUMN = () => {
  return [
    ...NO(),
    {
      Header: "B1",
      accessor: "path1",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B2",
      accessor: "path2",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "B3",
      accessor: "path3",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Durasi Up",
      accessor: "durasi_perubahan",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Avability(%)",
      accessor: "msgstatus",
      minWidth: "180px",
      disableFilters: true,
      show: true,
    },
  ];
};