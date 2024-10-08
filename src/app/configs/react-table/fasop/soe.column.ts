import { NO, B1, B2, B3 } from "../_more.columns.config";

export const SOE_COLUMNS = () => {
  return [
    ...NO(),
    {
      Header: "Tanggal",
      accessor: "tanggal",
      minWidth: "160px",
      disableFilters: true,
      show: true,
    },
    ...B1(),
    ...B2(),
    ...B3(),
    {
      Header: "Element",
      accessor: "element",
      minWidth: "150px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Info",
      accessor: "info",
      minWidth: "150px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Status",
      accessor: "msgstatus",
      minWidth: "150px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Tag",
      accessor: "tag",
      minWidth: "150px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Operator",
      accessor: "operator",
      minWidth: "150px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Limit",
      accessor: "limit",
      minWidth: "150px",
      disableFilters: true,
      show: true,
    },
    {
      Header: "Value",
      accessor: "value",
      minWidth: "150px",
      disableFilters: true,
      show: true,
    },
  ];
};

export const SOE_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: "number", type: "number" },
      { name: "time_stamp", type: "string" },
      { name: "system_time_stamp", type: "string" },
      { name: "path1", type: "string" },
      { name: "path2", type: "string" },
      { name: "path3", type: "string" },
      { name: "path4", type: "string" },
      { name: "path5", type: "string" },
      { name: "msgstatus", type: "string" },
      { name: "tag", type: "string" },
      { name: "operator", type: "string" },
      { name: "limit", type: "string" },
      { name: "message_text", type: "string" },
      { name: "value", type: "string" },
    ],
    columns: [
      { text: "No", datafield: "number", width: "3%", editable: false },
      { text: "Time Stamp RTU", datafield: "time_stamp", width: "17%", editable: false },
      { text: "Time Stamp MASTER", datafield: "system_time_stamp", width: "17%", editable: false },
      {
        text: "Message",
        datafield: "message_text",
        width: "20%",
        editable: false,
      },
      {
        text: "B1 (Lokasi)",
        datafield: "path1",
        width: "15%",
        editable: false,
      },
      {
        text: "B2 (Tegangan)",
        datafield: "path2",
        width: "15%",
        editable: false,
      },
      {
        text: "B3 (Bay)",
        datafield: "path3",
        width: "15%",
        editable: false,
      },
      {
        text: "Element",
        datafield: "path4",
        width: "15%",
        editable: false,
      },
      { text: "Info", datafield: "path5", width: "10%", editable: false },
      { text: "Status", datafield: "msgstatus", width: "10%", editable: false },
      { text: "Tag", datafield: "tag", width: "10%", editable: false },

      {
        text: "Operator",
        datafield: "operator",
        width: "10%",
        editable: false,
      },
      { text: "Limit", datafield: "limit", width: "10%", editable: false },
      { text: "Value", datafield: "value", width: "10%", editable: false },
    ],
  };
};
