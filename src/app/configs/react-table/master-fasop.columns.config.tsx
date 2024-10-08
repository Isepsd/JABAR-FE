import React from "react";
import { ACTION_COLUMN, NO } from "./_more.columns.config";
// import { Form } from 'react-bootstrap';
// import Badge from 'react-bootstrap/Badge';

export const WHATSAPP_BOT_COLUMNS = () => {
  return [
    ...NO(),
    {
      Header: "Nama",
      accessor: "nama",
      minWidth: "90%",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Url",
      accessor: "url",
      minWidth: "20%",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Token",
      accessor: "token",
      minWidth: "100px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Instance_id",
      accessor: "instance_id",
      minWidth: "100px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "100px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};

export const WHATSAPP_BOT_COLUMNS_JQ = () => {
  return {
    datafields: [
      { name: "id_wa_bot", type: "number" },
      { name: "number", type: "number" },
      { name: "nama", type: "string" },
      { name: "url", type: "string" },
      { name: "status", type: "string" },
      { name: "datum_created", type: "string" },
      { name: "token", type: "string" },
      { name: "instance_id", type: "string" },
    ],
    columns: [
      { text: "No", datafield: "number", width: "3%", editable: false },
      { text: "Nama Bot", datafield: "nama", width: "17%", editable: false },
      { text: "Url", datafield: "url", width: "20%", editable: false },
      { text: "Token", datafield: "token", width: "20%", editable: false },
      {
        text: "Instance ID",
        datafield: "instance_id",
        width: "20%",
        editable: false,
      },
      {
        text: "Status",
        datafield: "status",
        width: "20%",
        columntype: "checkbox",
        filtertype: "bool",
      },
    ],
  };
};

export const WHATSAPP_TAMBAH_KONTAK_GROUP_COLUMNS = () => {
  return {
    datafields: [
      { name: "nama_kontak", type: "string" },
      { name: "no_kontak", type: "number" },
      { name: "id_wa_kontak", type: "number" },
    ],
    columns: [
      { text: "Nama Kontak", datafield: "nama_kontak", width: 450 },
      { text: "No Kontak", datafield: "no_kontak", width: 150 },
    ],
  };
};

export const WHATSAPP_KONTAK_SETTING_COLUMNS = () => {
  return [
    ...NO(),
    {
      Header: "Nama",
      accessor: "nama",
      minWidth: "90%",
      show: true,
      disableFilters: true,
    },
    {
      Header: "No Kontak",
      accessor: "no_kontak",
      minWidth: "90%",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};

export const WHATSAPP_KONTAK_GROUP_COLUMNS = () => {
  return {
    datafields: [
      { name: "nama_kontak", type: "string" },
      { name: "no_kontak", type: "number" },
      { name: "id_wa_kontak", type: "number" },
      { name: "id", type: "number" },
      { name: "number", type: "number" },
    ],
    columns: [
      { text: "No", datafield: "number", width: "3%" },
      { text: "Nama Kontak", datafield: "nama_kontak", width: "47%" },
      { text: "No Kontak", datafield: "no_kontak", width: "50%" },
    ],
  };
};

export const WHATSAPP_GROUP_COLUMNS = () => {
  return {
    datafields: [
      { name: "id_wa_group", type: "number" },
      { name: "number", type: "number" },
      { name: "nama", type: "string" },
      { name: "nama_bot", type: "string" },
      { name: "status", type: "string" },
    ],
    columns: [
      { text: "No", datafield: "number", width: "3%" },
      { text: "Nama Group", datafield: "nama", width: "40%" },
      { text: "Id Group", datafield: "id_wa_group", width: "5%" },
      { text: "Bot", datafield: "nama_bot", width: "42%" },
      {
        text: "Status",
        datafield: "status",
        width: "10%",
        columntype: "checkbox",
        filtertype: "bool",
      },
    ],
  };
};

export const WHATSAPP_KONTAK_COLUMNS = () => {
  return [
    ...NO(),
    {
      Header: "Nama",
      accessor: "nama",
      minWidth: "90%",
      show: true,
      disableFilters: true,
    },
    {
      Header: "No Kontak",
      accessor: "no_kontak",
      minWidth: "20%",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "100px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};

export const WHATSAPP_KONTAK_COLUMNS_JQ = () => {
  return {
    datafields: [
      { name: "number" },
      { name: "id_wa_kontak", type: "number" },
      { name: "nama", type: "string" },
      { name: "no_kontak", type: "sting" },
      { name: "status", type: "string" },
    ],
    columns: [
      { text: "No", datafield: "number", width: "3%" },
      { text: "Nama Kontak", datafield: "nama", width: "40%" },
      { text: "No Kontak", datafield: "no_kontak", width: "40%" },
      {
        text: "Status",
        datafield: "status",
        width: "17%",
        columntype: "checkbox",
        filtertype: "bool",
      },
    ],
  };
};

export const IP_COLUMNS = () => {
  return [
    ...NO(),
    {
      Header: "Pointpid",
      accessor: "pointpid",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Jenis Point",
      accessor: "jenis_point",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Hitung Kerja",
      accessor: "hitung_kerja",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Kirim Telegram",
      accessor: "kirim_telegram",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Nama",
      accessor: "nama",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "IP 1",
      accessor: "ip1",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "IP 2",
      accessor: "ip2",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};

export const POINT_ANALOG_DIGITAL_COLUMNS = () => {
  return [
    ...NO(),
    {
      Header: "Jenis Point",
      accessor: "id_pointtype",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Station",
      accessor: "station",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Bay",
      accessor: "bay",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Lokasi (B1)",
      accessor: "path1",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Tegangan (B2)",
      accessor: "path2",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Bay (B3)",
      accessor: "path3",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    // ...B1(),
    // ...B2(),
    // ...B3(),
    {
      Header: "Element",
      accessor: "path4",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },

    {
      Header: "Info",
      accessor: "path5",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },

    {
      Header: "Kelompok",
      accessor: "tipe_point",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Hitung Kinerja",
      accessor: "kinerja",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Capture Telemetring",
      accessor: "capture_telemetring",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "ACK",
      accessor: "ack",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Keterangan",
      accessor: "keterangan_point",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Zona",
      accessor: "zona",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    // { Header: 'Send Telegram', accessor: 'send_telegram', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Telemetering 30M', accessor: 'capture_telemetring', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Path1', accessor: 'path1', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Path2', accessor: 'path2', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Path3', accessor: 'path3', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Path4', accessor: 'path4', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Path5', accessor: 'path5', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Value', accessor: 'value', minWidth: '150px', show: true, disableFilters: true },
    {
      Header: "Last Update",
      accessor: "last_update",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};
export const POINT_ANALOG_DIGITAL_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: "number", type: "number" },
      { name: "id_pointtype", type: "string" },
      { name: "point_number", type: "number" },
      { name: "updated_at", type: "string" },
      { name: "station", type: "string" },
      { name: "bay", type: "string" },
      { name: "point_number", type: "number" },
      { name: "path1", type: "string" },
      { name: "path2", type: "string" },
      { name: "path3", type: "string" },
      { name: "path4", type: "string" },
      { name: "path5", type: "string" },
      { name: "point_type", type: "string" },
      { name: "keterangan_point", type: "string" },
      { name: "capture_telemetring", type: "string" },
      { name: "ack", type: "string" },
      { name: "kinerja", type: "string" },
      { name: "last_update", type: "number" },
      { name: "zona", type: "number" },
    ],
    columns: [
      { text: "NO", datafield: "number", width: 50, editable: false },
      {
        text: "Jenis Point",
        datafield: "id_pointtype",
        width: 140,
        editable: false,
      },
      { text: "Station", datafield: "station", width: 200, editable: false },
      { text: "Bay", datafield: "bay", width: 120, editable: false },
      {
        text: "Point Number",
        datafield: "point_number",
        width: 120,
        editable: false,
      },
      { text: "Lokasi (B1)", datafield: "path1", width: 120, editable: false },
      {
        text: "Tegangan (B2)",
        datafield: "path2",
        width: 120,
        editable: false,
      },
      { text: "Bay (B3)", datafield: "path3", width: 150, editable: false },
      { text: "Element", datafield: "path4", width: 120, editable: false },
      { text: "Info", datafield: "path5", width: 120, editable: false },
      {
        text: "Kelompok",
        datafield: "point_type",
        width: 120,
        editable: false,
      },
      {
        text: "Hitung Kinerja",
        datafield: "kinerja",
        width: 100,
        editable: false,
        columntype: "checkbox",
        filtertype: "bool",
      },
      {
        text: "Capture Telemetring",
        datafield: "capture_telemetring",
        width: 100,
        editable: false,
        columntype: "checkbox",
        filtertype: "bool",
      },
      {
        text: "ACK",
        datafield: "ack",
        width: 100,
        editable: false,
        columntype: "checkbox",
        filtertype: "bool",
      },
    
      {
        text: "Keterangan",
        datafield: "keterangan_point",
        width: 170,
        editable: false,
      },
      {
        text: "Zona",
        datafield: "zona",
        width: 120,
        editable: false,
      },
      {
        text: "Last Update",
        datafield: "last_update",
        width: 120,
        editable: false,
      },
    ],
  };
};

export const RTU_COLUMNS = () => {
  return [
    ...NO(),
    {
      Header: "ID",
      accessor: "id",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Station",
      accessor: "station",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Nama",
      accessor: "nama",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "B3Text",
      accessor: "b3text",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Jenis Point",
      accessor: "jenis_point",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Faktor",
      accessor: "faktor",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Aktif",
      accessor: "aktif",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Telegram",
      accessor: "telegram",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Kinerja",
      accessor: "kinerja",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_COLUMNS = () => {
  return [
    ...NO(),
    {
      Header: "Station",
      accessor: "station",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Nama",
      accessor: "nama",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "B3Text",
      accessor: "b3text",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Jenis Point",
      accessor: "jenis_point",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Faktor",
      accessor: "faktor",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Aktif",
      accessor: "aktif",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Telegram",
      accessor: "telegram",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Kinerja",
      accessor: "kinerja",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};

const HEADER_EXTRA_TREE_POINT_TYPE = () => {
  return [
    {
      id: "nama",
      accessor: "nama",
      show: true,
      disableFilters: true,
      hideColumn: true,
      minWidth: "250px",
      Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
        <span {...getToggleAllRowsExpandedProps()}>
          {isAllRowsExpanded ? (
            <i className="fas fa-caret-down"></i>
          ) : (
            <i className="fas fa-caret-right"></i>
          )}{" "}
          Nama
        </span>
      ),
      Cell: ({ row }: any) =>
        row.canExpand ? (
          <div
            {...row.getToggleRowExpandedProps({
              style: {
                paddingLeft: `${row.depth * 1.25}rem`,
              },
            })}
            className="d-flex gap-2"
          >
            {row.isExpanded ? (
              <i className="fas fa-caret-down"></i>
            ) : (
              <i className="fas fa-caret-right"></i>
            )}
            <span> {row.original.nama}</span>
          </div>
        ) : (
          <div
            style={{ paddingLeft: `${row.depth ? row.depth * 1.55 : 1.65}rem` }}
          >
            {row.original.nama}
          </div>
        ),
    },
  ];
};

export const JENIS_POINT_COLUMNS = () => {
  return [
    ...HEADER_EXTRA_TREE_POINT_TYPE(),
    {
      Header: "Tipe Point",
      accessor: "jenis_point",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    // { Header: 'id_pointtype', accessor: 'id', minWidth: '150px', show: true, disableFilters: true },
    {
      Header: "No Urut",
      accessor: "no_urut",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    // {
    //   Header: "Group Telegram",
    //   accessor: "group_telegram",
    //   minWidth: "150px",
    //   show: true,
    //   disableFilters: true,
    // },
    // // { Header: 'Tampil Dashboard', accessor: 'tampil_dashboard', minWidth: '150px', show: true, disableFilters: true },
    // {
    //   Header: "Kirim Ke Telegram",
    //   accessor: "kirim_telegram",
    //   minWidth: "150px",
    //   show: true,
    //   disableFilters: true,
    // },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "100px",
      show: true,
      disableFilters: true,
    },
    // {
    //   Header: "Format Pesan",
    //   accessor: "format_pesan",
    //   minWidth: "350px",
    //   show: true,
    //   disableFilters: true,
    // },
    ...ACTION_COLUMN(),
  ];
};

export const JENIS_POINT_DETAIL_COLUMNS = () => {
  return [
    {
      Header: "ID",
      accessor: "id",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Value",
      accessor: "value",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Quality Code",
      accessor: "quality_code",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "State Label",
      accessor: "state_label",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Valid",
      accessor: "valid",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};

export const JENIS_POINT_COLUMNS_JQ = () => {
  const cellsRenderer = (
    row: any,
    dataField: string,
    cellValueInternal: any,
    rowData: any,
    cellText: string
  ): any => {
    // console.log('row')
    // console.log(row)
    // console.log('dataField')
    // console.log(dataField)
    // console.log('cellValueInternal')
    // console.log(cellValueInternal)
    // console.log('rowData')
    // console.log(rowData)
    if (dataField == "status") {
      if (cellText == "1") {
        return "<div className='position-relative text-center w-100'><span style='background-color: green;color: white;padding: 4px 8px;text-align: center;border-radius: 5px;'>Aktif</span><span class='red-arrow-down'></span></div>";
      }
      return "<div className='position-relative text-center w-100'><span style='background-color: red;color: white;padding: 4px 8px;text-align: center;border-radius: 5px;'>Tidak Aktif</span><span class='green-arrow-up'></span></div>";
    } else if (dataField == "kirim_telegram") {
      if (cellText == "1") {
        return '<span className="text-success">Yes</span>';
      }
      return '<span className="text-danger">No</span>';
    }
    return "";
  };

  return {
    datafields: [
      { name: "jenis_point", type: "string" },
      { name: "id_pointtype", type: "number" },
      { name: "no_urut", type: "string" },
      { name: "group_telegram", type: "string" },
      { name: "kirim_telegram", type: "string" },
      { name: "status", type: "string" },
      { name: "format_pesan", type: "string" },
      { name: "child_pointtype", type: "string" },
      { name: "name", type: "string" },
    ],

    columns: [
      { text: "Nama", datafield: "name", width: "20%" },
      { text: "Tipe Point", datafield: "jenis_point", width: "10%" },
      // { text:'id_pointtype', datafield: 'id', width: '15%' },
      { text: "No Urut", datafield: "no_urut", width: "5%" },
      // { text: "Group Telegram", datafield: "group_telegram", width: "10%" },
      // {
      //   text: "Kirim Ke Telegram",
      //   cellsAlign: "center",
      //   datafield: "kirim_telegram",
      //   width: "10%",
      //   cellsRenderer: cellsRenderer,
      // },
      // // { text: 'Status', datafield: 'status', width: '8%', editable: false, columntype: 'checkbox', filtertype: 'bool' },

      // {
      //   text: "Format Pesan Telegram",
      //   datafield: "format_pesan",
      //   width: "25%",
      // },
      {
        text: "Status",
        cellsAlign: "center",
        dataField: "status",
        width: "8%",
        cellsRenderer: cellsRenderer,
      },
    ],
  };
};
export const JENIS_POINT_DETAIL_COLUMNS_JQ = () => {
  return {
    datafields: [
      { name: "id_pointtype_state", type: "number" },
      { name: "statekey", type: "number" },
      { name: "quality_code", type: "string" },
      { name: "state_label", type: "string" },
      { name: "valid", type: "string" },
      { name: "status", type: "string" },
    ],
    columns: [
      { text: "No", datafield: "number", width: "4%" },
      // { text: "ID", datafield: "id_pointtype_state", width: "10%" },
      { text: "Value", datafield: "statekey", width: "16%" },
      { text: "Quality Code", datafield: "quality_code", width: "15%" },
      { text: "State Label", datafield: "state_label", width: "20%" },
      { text: "Valid", datafield: "valid", width: "20%" },
      {
        text: "Status",
        datafield: "status",
        width: "15%",
        columntype: "checkbox",
        filtertype: "bool",
      },
    ],
  };
};

export const JENIS_POINT_DETAIL_COLUMNS_COPY_GRID = () => {
  return {
    datafields: [
      { name: "id_pointtype_state", type: "number" },
      { name: "statekey", type: "number" },
      { name: "quality_code", type: "string" },
      { name: "state_label", type: "string" },
      { name: "valid", type: "string" },
      { name: "status", type: "string" },
    ],
    columns: [
      { label: "No", dataField: "number", width: "4%" },
      // { label: "ID", dataField: "id_pointtype_state", width: "10%" },
      { label: "Value", dataField: "statekey", width: "16%" },
      { label: "Quality Code", dataField: "quality_code", width: "15%" },
      { label: "State Label", dataField: "state_label", width: "20%" },
      { label: "Valid", dataField: "valid", width: "20%" },
      {
        label: "Status",
        dataField: "status",
        width: "15%",
        template: "checkBox",
      },
    ],
  };
};
export const REF_POINT_RC_TRIP_COLUMNS = () => {
  return [
    ...NO(),
    {
      Header: "Point Number",
      accessor: "point_number",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Point Name",
      accessor: "point_name",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Point Text",
      accessor: "point_text",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Wilayah",
      accessor: "ref_lokasi",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "RC",
      accessor: "rc",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Kirim RC Ke Telegram",
      accessor: "kirim_rc_telegram",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "TRIP",
      accessor: "trip",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Kirim TRIP Ke Telegram",
      accessor: "kirim_trip_telegram",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};
export const REF_PATH1_COLUMNS = () => {
  return [
    {
      Header: "No",
      accessor: "number",
      width: "50px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Path 1",
      accessor: "path",
      minWidth: "150px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Lokasi",
      accessor: "lokasi",
      minWidth: "200px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "100px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};
export const REF_PATH3_COLUMNS = () => {
  return [
    {
      Header: "No",
      accessor: "number",
      width: "50px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Path 3",
      accessor: "path",
      minWidth: "350px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Lokasi",
      accessor: "lokasi",
      minWidth: "200px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "100px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};

export const TELEGRAM_BOT_COLUMNS = () => {
  return [
    {
      Header: "Nama",
      accessor: "nama",
      minWidth: "90%",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Chat Code",
      accessor: "chat_code",
      minWidth: "20%",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "100px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};
export const TELEGRAM_BOT_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: "number", type: "number" },
      { name: "id_telegram_bot", type: "number" },
      { name: "nama", type: "string" },
      { name: "chat_code", type: "string" },
      { name: "status", type: "string" },
    ],
    columns: [
      { text: "No", datafield: "number", width: "4%", editable: false },
      { text: "Nama", datafield: "nama", width: "36%", editable: false },
      {
        text: "Chat Code",
        datafield: "chat_code",
        width: "30%",
        editable: false,
      },
      {
        text: "Status",
        datafield: "status",
        width: "30%",
        editable: false,
        columntype: "checkbox",
        filtertype: "bool",
      },
    ],
  };
};

export const TELEGRAM_GROUP_COLUMNS = () => {
  return [
    {
      Header: "Nama",
      accessor: "nama",
      minWidth: "90%",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Id Chat",
      accessor: "id_chat",
      minWidth: "20%",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Bot",
      accessor: "bot_name",
      minWidth: "20%",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: "100px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};

export const TELEGRAM_GROUP_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: "number", type: "number" },
      { name: "id_telegram_group", type: "number" },
      { name: "nama", type: "string" },
      { name: "id_chat", type: "string" },
      { name: "bot_name", type: "string" },
      { name: "status", type: "string" },
    ],
    columns: [
      { text: "No", datafield: "number", width: "4%", editable: false },
      { text: "Nama", datafield: "nama", width: "30%", editable: false },
      { text: "Id Chat", datafield: "id_chat", width: "26%", editable: false },
      { text: "Bot", datafield: "bot_name", width: "20%", editable: false },
      {
        text: "Status",
        datafield: "status",
        width: "20%",
        editable: false,
        columntype: "checkbox",
        filtertype: "bool",
      },
    ],
  };
};

export const FASOP_KINERJA_SCADA = () => {
  return [
    {
      Header: "Tahun",
      accessor: "tahun",
      minWidth: "100px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Jenis Peralatan",
      accessor: "nama_pointtype",
      minWidth: "100px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Jan",
      accessor: "t_01",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Feb",
      accessor: "t_02",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Mar",
      accessor: "t_03",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Apr",
      accessor: "t_04",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Mei",
      accessor: "t_05",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Jun",
      accessor: "t_06",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Jul",
      accessor: "t_07",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Agu",
      accessor: "t_08",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Sep",
      accessor: "t_09",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Okt",
      accessor: "t_10",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Nov",
      accessor: "t_11",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    {
      Header: "Des",
      accessor: "t_12",
      minWidth: "80px",
      show: true,
      disableFilters: true,
    },
    ...ACTION_COLUMN(),
  ];
};

export const MONITORING_KINERJA_SCADA_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: "trans_id_kinerja", type: "number" },
      { name: "tahun", type: "string" },
      { name: "nama_pointtype", type: "string" },
      { name: "t_01", type: "number" },
      { name: "t_02", type: "number" },
      { name: "t_03", type: "number" },
      { name: "t_04", type: "number" },
      { name: "t_05", type: "number" },
      { name: "t_06", type: "number" },
      { name: "t_07", type: "number" },
      { name: "t_08", type: "number" },
      { name: "t_10", type: "number" },
      { name: "t_11", type: "number" },
      { name: "t_12", type: "number" },
      { name: "number", type: "number" },
      // { name: 'group_name', type: 'string' },
      // { name: 'keterangan', type: 'string' },
      // { name: 'status_data', type: 'number' },
      // { name: 'tipe_data', type: 'bool' },
    ],
    columns: [
      // { text: 'trans_id_kinerja', datafield: 'trans_id_kinerja', width: 120, editable: false, },
      { text: "No", datafield: "number" },
      { text: "Tahun", datafield: "tahun", width: 120 },
      { text: "Jenis Peralatan", datafield: "nama_pointtype", width: 400 },
      { text: "Jan", datafield: "t_01", width: 120 },
      { text: "Feb", datafield: "t_02", width: 120 },
      { text: "Mar", datafield: "t_03", width: 120 },
      { text: "Apr", datafield: "t_04", width: 120 },
      { text: "Mei", datafield: "t_05", width: 120 },
      { text: "Jun", datafield: "t_06", width: 120 },
      { text: "Jul", datafield: "t_07", width: 120 },
      { text: "Agu", datafield: "t_08", width: 120 },
      { text: "Sep", datafield: "t_09", width: 120 },
      { text: "Okt", datafield: "t_10", width: 120 },
      { text: "Nov", datafield: "t_11", width: 120 },
      { text: "Des", datafield: "t_12", width: 120 },
    ],
  };
};

export const API_WA_GATEWAY_COLUMN = () => {
  return {
    datafields: [
      { name: "groupId", type: "number" },
      { name: "name", type: "string" },
      { name: "contacts", type: "number" },
      { name: "created_at", type: "string" },
    ],
    columns: [
      { text: "GroupId", datafield: "groupId", width: "15%" },
      { text: "Name Group", datafield: "name", width: "20%" },
      { text: "Contacts", datafield: "contacts", width: "50%" },
      { text: "Created_at", datafield: "created_at", width: "15%" },
    ],
  };
};

export const MASTERFAS_SISTEM_SCADA_COLUMN_GRID = () => ({
  datafields: [
    { name: "id_sistem_scada", type: "string" },
    { name: "number", type: "number" },
    { name: "name", type: "string" },
    { name: "jenis_scada", type: "string" },
    { name: "jenis_koneksi", type: "string" },
    // { name: 'alias_db1', type: 'string' },
    { name: "ip_db1", type: "string" },
    { name: "name_db1", type: "string" },
    { name: "instance_db1", type: "string" },
    { name: "port_db1", type: "string" },
    { name: "username_db1", type: "string" },
    { name: "password_db1", type: "string" },
    { name: "status_db1", type: "string" },
    // { name: 'alias_db2', type: 'string' },
    { name: "ip_db2", type: "string" },
    { name: "name_db2", type: "string" },
    { name: "instance_db2", type: "string" },
    { name: "port_db2", type: "string" },
    { name: "username_db2", type: "string" },
    { name: "password_db2", type: "string" },
    { name: "status_db2", type: "string" },
  ],

  columns: [
    { label: "NO", dataField: "number", width: 50 },
    { label: "Nama", dataField: "name", width: 300 },
    { label: "Jenis SCADA", dataField: "jenis_scada", width: 150 },
    { label: "Jenis Koneksi", dataField: "jenis_koneksi", width: 150 },
    // { label: 'Hostname DB1', dataField: 'alias_db1', width: 150 },
    { label: "IP DB1", dataField: "ip_db1", width: 150 },
    { label: "Nama DB1", dataField: "name_db1", width: 150 },
    { label: "Instance DB1", dataField: "instance_db1", width: 150 },
    { label: "Port DB1", dataField: "port_db1", width: 150 },
    { label: "Username DB1", dataField: "username_db1", width: 150 },
    { label: "Password DB1", dataField: "password_db1", width: 150 },
    { label: "Status DB1", dataField: "status_db1", width: 150 },
    // { label: 'Hostname DB2', dataField: 'alias_db2', width: 150 },
    { label: "IP DB2", dataField: "ip_db2", width: 150 },
    { label: "Nama DB2", dataField: "name_db2", width: 150 },
    { label: "Instance DB2", dataField: "instance_db2", width: 150 },
    { label: "Port DB2", dataField: "port_db2", width: 150 },
    { label: "Username DB2", dataField: "username_db2", width: 150 },
    { label: "Password DB2", dataField: "password_db2", width: 150 },
    { label: "Status DB2", dataField: "status_db2", width: 150 },
  ],
});
