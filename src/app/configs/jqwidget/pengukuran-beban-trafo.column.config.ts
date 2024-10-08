import {
  CeilBackgroundPengukuranBeban,
  CeilBackgroundPengukuranBebanNew,
} from "@app/helper/jq-widget.helper";
import { CeilBackgroundNoEntri } from "@app/helper/jqx-widget.helper";
import { NO_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config";
import {
  MORE_PENGUKURAN_BEBAN_1PHASE,
  MORE_PENGUKURAN_BEBAN_3PHASE,
  MORE_TEGANGAN_TRAFO,
} from "./_more-jqwidget.column.config";

export const validateData = (value: any) => {
  if (value < 0 || !value || value === "") {
    return { result: false, message: "Nilai min 0" };
  }
  // else if (isNaN(Number(value)) === true)
  //   return { result: false, message: "Nilai harus angka" };
  return true;
};
export const validateDataCOSPHI = (value: any) => {
  if (value < 0 || !value || value === "") {
    return { result: false, message: "Nilai antara 0 sampai 1" };
  }
  //  else if (isNaN(Number(value)) === true)
  //   return { result: false, message: "Nilai harus angka" };
  return true;
};

export const PENGUKURAN_BEBAN_TRAFO_COLUMN_JQWIDGET = (roleActions: any) => {
  const tap: any[] = [
    { value: null, text: "" },
    { value: "1", text: "1" },
    { value: "2", text: "2" },
    { value: "3", text: "3" },
    { value: "4", text: "4" },
    { value: "5", text: "5" },
    { value: "6", text: "6" },
    { value: "7", text: "7" },
  ];

  return {
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
        pinned: true,
        editable: false,
        cellclassname: CeilBackgroundNoEntri,
      },
      {
        text: "Tanggal",
        cellsalign: "center",
        align: "center",
        datafield: "datum",
        width: "9%",
        pinned: true,
        editable: false,
        cellclassname: CeilBackgroundNoEntri,
      },
      // {
      //   text: "Jam",
      //   cellsalign: "center",
      //   align: "center",
      //   datafield: "jam",
      //   width: "4%",
      //   pinned: true,
      //   editable: false,
      // },
      {
        text: "Unit Induk",
        cellsalign: "left",
        align: "center",
        datafield: "pemilik",
        width: "8%",
        pinned: true,
        editable: false,
        cellclassname: CeilBackgroundNoEntri,
      },
      {
        text: "Gardu Induk",
        cellsalign: "left",
        align: "center",
        datafield: "nama_parent",
        width: "10%",
        pinned: true,
        editable: false,
        cellclassname: CeilBackgroundNoEntri,
      },
      {
        text: "Trafo",
        cellsalign: "left",
        align: "center",
        datafield: "nama_lokasi",
        editable: false,
        width: "7%",
        pinned: true,
        cellclassname: CeilBackgroundNoEntri,
      },

      {
        text: "I. Max (A)",
        cellsalign: "right",
        align: "center",
        datafield: "i_max",
        editable: false,
        width: "5%",
        pinned: true,
        cellclassname: CeilBackgroundNoEntri,
      },
      {
        text: "No Urut",
        cellsalign: "center",
        align: "center",
        datafield: "no_urut_cell",
        editable: roleActions?.update || false,
        width: "5%",
        pinned: true,
        columntype: "numberinput",
        // cellclassname: roleActions?.update
        //   ? CeilBackgroundPengukuranBeban
        //   : false,
        createeditor: (row: number, cellvalue: any, editor: any): void => {
          editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
        },
      },
      {
        text: "Posisi Tap Changer",
        cellsalign: "center",
        align: "center",
        datafield: "tap",
        editable: roleActions?.update || false,
        width: "9%",
        // validation: validateData,
        columntype: "dropdownlist",
        // cellclassname: roleActions?.update
        //   ? CeilBackgroundPengukuranBeban
        //   : false,
        createeditor: (row: number, value: any, editor: any): void => {
          editor.jqxDropDownList({
            height: 27,
            source: tap,
            displayMember: "label",
            valueMember: "value",
          });
        },
      },
      {
        text: "R",
        cellsalign: "right",
        align: "center",
        datafield: "arus_ir",
        columnGroup: "arus",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        validation: validateData,
      },
      {
        text: "S",
        cellsalign: "right",
        align: "center",
        datafield: "arus_is",
        columnGroup: "arus",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        validation: validateData,
      },
      {
        text: "T",
        cellsalign: "right",
        align: "center",
        datafield: "arus_it",
        columnGroup: "arus",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        validation: validateData,
      },
      {
        text: "R-S",
        cellsalign: "right",
        align: "center",
        datafield: "vrs",
        columnGroup: "tegangan",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        validation: validateData,
      },
      {
        text: "R-T",
        cellsalign: "right",
        align: "center",
        datafield: "vrt",
        columnGroup: "tegangan",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        validation: validateData,
      },
      {
        text: "S-T",
        cellsalign: "right",
        align: "center",
        datafield: "vst",
        columnGroup: "tegangan",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        validation: validateData,
      },

      {
        text: "R-N",
        cellsalign: "right",
        align: "center",
        datafield: "vrn",
        columnGroup: "tegangan",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        validation: validateData,
      },
      {
        text: "S-N",
        cellsalign: "right",
        align: "center",
        datafield: "vsn",
        columnGroup: "tegangan",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        validation: validateData,
      },
      {
        text: "T-N",
        cellsalign: "right",
        align: "center",
        datafield: "vtn",
        columnGroup: "tegangan",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        validation: validateData,
      },
      {
        text: "Cos Phi",
        cellsalign: "right",
        align: "center",
        datafield: "cosq",
        width: "5%",
        editable: roleActions?.update || false,
        validation: validateDataCOSPHI,
      },
      {
        text: "Arus Avg (A)",
        cellsalign: "right",
        align: "center",
        datafield: "i",
        width: "5%",
        editable: false,
        cellclassname: CeilBackgroundNoEntri,
      },
      {
        text: "Teg. Avg (kV)",
        cellsalign: "right",
        align: "center",
        datafield: "v",
        width: "7%",
        editable: false,
        cellclassname: CeilBackgroundNoEntri,
      },
      {
        text: "Daya Aktif (MW)",
        cellsalign: "right",
        align: "center",
        datafield: "p",
        width: "8%",
        // editable: roleActions?.update || false,
        editable: false,
        cellclassname: CeilBackgroundNoEntri,
        validation: validateData,
      },
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};

export const PENGUKURAN_BEBAN_TRAFO_COLUMN_1PHASE_JQWIDGET = (
  roleActions: any
) => {
  return {
    columngroups: [
      { text: "Arus (A)", align: "center", name: "arus" },
      { text: "Tegangan (kV)", align: "center", name: "tegangan" },
      { text: "00:00", align: "center", name: "0000" },
      { text: "00:30", align: "center", name: "0030" },
      { text: "01:00", align: "center", name: "0100" },
      { text: "01:30", align: "center", name: "0130" },
      { text: "02:00", align: "center", name: "0200" },
      { text: "02:30", align: "center", name: "0230" },
      { text: "03:00", align: "center", name: "0300" },
      { text: "03:30", align: "center", name: "0330" },
      { text: "04:00", align: "center", name: "0400" },
      { text: "04:30", align: "center", name: "0430" },
      { text: "05:00", align: "center", name: "0500" },
      { text: "05:30", align: "center", name: "0530" },
      { text: "06:00", align: "center", name: "0600" },
      { text: "06:30", align: "center", name: "0630" },
      { text: "07:00", align: "center", name: "0700" },
      { text: "07:30", align: "center", name: "0730" },
      { text: "08:00", align: "center", name: "0800" },
      { text: "08:30", align: "center", name: "0830" },
      { text: "09:00", align: "center", name: "0900" },
      { text: "09:30", align: "center", name: "0930" },
      { text: "10:00", align: "center", name: "1000" },
      { text: "10:30", align: "center", name: "1030" },
      { text: "11:00", align: "center", name: "1100" },
      { text: "11:30", align: "center", name: "1130" },
      { text: "12:00", align: "center", name: "1200" },
      { text: "12:30", align: "center", name: "1230" },
      { text: "13:00", align: "center", name: "1300" },
      { text: "13:30", align: "center", name: "1330" },
      { text: "14:00", align: "center", name: "1400" },
      { text: "14:30", align: "center", name: "1430" },
      { text: "15:00", align: "center", name: "1500" },
      { text: "15:30", align: "center", name: "1530" },
      { text: "16:00", align: "center", name: "1600" },
      { text: "16:30", align: "center", name: "1630" },
      { text: "17:00", align: "center", name: "1700" },
      { text: "17:30", align: "center", name: "1730" },
      { text: "18:00", align: "center", name: "1800" },
      { text: "18:30", align: "center", name: "1830" },
      { text: "19:00", align: "center", name: "1900" },
      { text: "19:30", align: "center", name: "1930" },
      { text: "20:00", align: "center", name: "2000" },
      { text: "20:30", align: "center", name: "2030" },
      { text: "21:00", align: "center", name: "2100" },
      { text: "21:30", align: "center", name: "2130" },
      { text: "22:00", align: "center", name: "2200" },
      { text: "22:30", align: "center", name: "2230" },
      { text: "23:00", align: "center", name: "2300" },
      { text: "23:30", align: "center", name: "2330" },
    ],
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "left",
        align: "center",
        datafield: "datum",
        width: "8%",
        pinned: true,
        editable: false,
      },
      {
        text: "Gardu Induk",
        cellsalign: "left",
        align: "center",
        datafield: "nama_parent",
        width: "10%",
        pinned: true,
        editable: false,
      },
      {
        text: "Trafo",
        cellsalign: "left",
        align: "center",
        datafield: "nama_lokasi",
        editable: false,
        width: "7%",
        pinned: true,
      },
      {
        text: "No Urut",
        cellsalign: "center",
        align: "center",
        datafield: "no_urut_cell",
        // editable: roleActions?.update || false,
        cellclassname: roleActions?.update
          ? CeilBackgroundPengukuranBebanNew
          : false,
        width: "5%",
        pinned: true,
        columntype: "numberinput",
        createeditor: (row: number, cellvalue: any, editor: any): void => {
          editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
        },
      },
      {
        text: "I. Max (A)",
        cellsalign: "right",
        align: "center",
        datafield: "i_max",
        width: "5%",
        pinned: true,
        // editable: roleActions?.update || false,
        cellclassname: roleActions?.update
          ? CeilBackgroundPengukuranBebanNew
          : false,
        columntype: "numberinput",
        createeditor: (row: number, cellvalue: any, editor: any): void => {
          editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
        },
      },

      ...MORE_PENGUKURAN_BEBAN_1PHASE(),
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};

export const TEGANGAN_TRAFO_COLUMN_JQWIDGET = (roleActions: any) => {
  return {
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "left",
        align: "center",
        datafield: "datum",
        width: "6%",
        pinned: true,
        editable: false,
      },
      // {
      //   text: "Regional",
      //   cellsalign: "left",
      //   align: "center",
      //   datafield: "regional",
      //   width: "10%",
      //   pinned: true,
      //   editable: false,
      // },
      // {
      //   text: "UID/UIW",
      //   cellsalign: "left",
      //   align: "center",
      //   datafield: "pemilik",
      //   width: "10%",
      //   pinned: true,
      //   editable: false,
      // },
      {
        text: "Unit Induk",
        cellsalign: "left",
        align: "center",
        datafield: "pemilik",
        width: "7%",
        pinned: true,
        editable: false,
      },
      {
        text: "Gardu Induk",
        cellsalign: "left",
        align: "center",
        datafield: "nama_parent",
        width: "10%",
        pinned: true,
        editable: false,
      },
      {
        text: "Trafo",
        cellsalign: "left",
        align: "center",
        datafield: "nama_lokasi",
        editable: false,
        width: "7%",
        pinned: true,
      },
      {
        text: "No Urut",
        cellsalign: "center",
        align: "center",
        datafield: "no_urut_cell",
        editable: roleActions?.update || false,
        cellclassname: roleActions?.update
          ? CeilBackgroundPengukuranBeban
          : false,
        width: "5%",
        pinned: true,
        columntype: "numberinput",
        createeditor: (row: number, cellvalue: any, editor: any): void => {
          editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
        },
      },
      {
        text: "I. Max (A)",
        cellsalign: "right",
        align: "center",
        datafield: "i_max",
        editable: false,
        width: "5%",
        pinned: true,
      },

      ...MORE_TEGANGAN_TRAFO(roleActions),
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};

export const PENGUKURAN_BEBAN_TRAFO_COLUMN_3PHASE_JQWIDGET = (
  roleActions: any
) => {
  return {
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "left",
        align: "center",
        datafield: "datum",
        width: "10%",
        pinned: true,
        editable: false,
      },
      {
        text: "Gardu Induk",
        cellsalign: "left",
        align: "center",
        datafield: "nama_parent",
        width: "10%",
        pinned: true,
        editable: false,
      },
      {
        text: "Trafo",
        cellsalign: "left",
        align: "center",
        datafield: "nama_lokasi",
        editable: false,
        width: "7%",
        pinned: true,
      },
      {
        text: "No Urut",
        cellsalign: "center",
        align: "center",
        datafield: "no_urut_cell",
        editable: roleActions?.update || false,
        cellclassname: roleActions?.update
          ? CeilBackgroundPengukuranBeban
          : false,
        width: "5%",
        pinned: true,
        columntype: "numberinput",
        createeditor: (row: number, cellvalue: any, editor: any): void => {
          editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
        },
      },
      {
        text: "I. Max (A)",
        cellsalign: "right",
        align: "center",
        datafield: "i_max",
        editable: false,
        width: "10%",
        pinned: true,
      },

      ...MORE_PENGUKURAN_BEBAN_3PHASE(),
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};

export const PENGUKURAN_BEBAN_GH_COLUMN_JQWIDGET = (roleActions: any) => {
  return {
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "center",
        align: "center",
        datafield: "datum",
        width: "7%",
        pinned: true,
        editable: false,
      },
      {
        text: "Gardu Induk/Penyulang",
        cellsalign: "left",
        align: "center",
        datafield: "parent_lokasi",
        width: "25%",
        pinned: true,
        editable: false,
      },
      {
        text: "Gardu Hubung",
        cellsalign: "left",
        align: "center",
        datafield: "lokasi",
        editable: false,
        width: "25%",
        pinned: true,
      },
      // {
      //   text: 'I. Max (A)', cellsalign: 'right', align: 'center', datafield: 'i_max', editable: false, width: 130,
      // },
      {
        text: "Arus (A)",
        cellsalign: "right",
        align: "center",
        datafield: "i",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "10%",
      },
      {
        text: "Tegangan (kV)",
        cellsalign: "right",
        align: "center",
        datafield: "v",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "10%",
      },
      {
        text: "Cos Phi",
        cellsalign: "right",
        align: "center",
        datafield: "cosq",
        width: "10%",
        editable: roleActions?.update || false,
      },
      {
        text: "Daya Aktif (MW)",
        cellsalign: "right",
        align: "center",
        datafield: "p",
        width: "10%",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        validation: validateData,
      },
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};

export const PENGUKURAN_BEBAN_KP_COLUMN_JQWIDGET = (roleActions: any) => {
  return {
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "center",
        align: "center",
        datafield: "datum",
        width: "7%",
        pinned: true,
        editable: false,
      },
      {
        text: "Gardu Induk/Penyulang",
        cellsalign: "left",
        align: "center",
        datafield: "parent_lokasi",
        width: "25%",
        pinned: true,
        editable: false,
      },
      {
        text: "Keypoint",
        cellsalign: "left",
        align: "center",
        datafield: "lokasi",
        editable: false,
        width: "25%",
        pinned: true,
      },
      // {
      //   text: 'I. Max (A)', cellsalign: 'right', align: 'center', datafield: 'i_max', editable: false, width: 130,
      // },
      {
        text: "Arus (A)",
        cellsalign: "right",
        align: "center",
        datafield: "i",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "10%",
      },
      {
        text: "Tegangan (kV)",
        cellsalign: "right",
        align: "center",
        datafield: "v",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: "10%",
      },
      {
        text: "Cos Phi",
        cellsalign: "right",
        align: "center",
        datafield: "cosq",
        width: "10%",
        editable: roleActions?.update || false,
      },
      {
        text: "Daya Aktif (MW)",
        cellsalign: "right",
        align: "center",
        datafield: "p",
        width: "10%",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        validation: validateData,
      },
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};
