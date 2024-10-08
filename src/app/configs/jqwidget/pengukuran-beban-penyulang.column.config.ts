import {
  CeilBackgroundPengukuranBeban,
  CeilBackgroundPengukuranBebanNew,
} from "@app/helper/jq-widget.helper";
import { ULP_JQWidget, UP3_JQWidget } from "./_more-jqwidget.column.config";
import { NO_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config";
import {
  MORE_PENGUKURAN_BEBAN_1PHASE,
  MORE_PENGUKURAN_BEBAN_3PHASE,
} from "./_more-jqwidget.column.config";

export const validateData = (cell: any, value: any) => {
  if (value < 0 || !value || value === "") {
    return { result: false, message: "Nilai min 0" };
  }
  // else if (isNaN(Number(value)) === true)
  //   return { result: false, message: "Nilai harus angka" };
  return true;
};

export const validateDataCOSPHI = (cell: any, value: any) => {
  if (value < 0 || !value || value === "") {
    return { result: false, message: "Nilai antara 0 sampai 1" };
  }
  // else if (isNaN(Number(value)) === true)
  //   return { result: false, message: "Nilai harus angka" };
  return true;
};
export const PENGUKURAN_BEBAN_GH_COLUMN_JQWIDGET = (roleActions: any) => {
  return {
    columns: [
      {
        text: "NO",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: 50,
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "center",
        align: "center",
        datafield: "datum",
        width: 160,
        pinned: true,
        editable: false,
      },
      {
        text: "Gardu Hubung",
        cellsalign: "left",
        align: "center",
        datafield: "nama_parent",
        width: 160,
        pinned: true,
        editable: false,
      },
      {
        text: "Trafo",
        cellsalign: "left",
        align: "center",
        datafield: "nama_lokasi",
        editable: false,
        width: 160,
        pinned: true,
      },
      {
        text: "I. Max (A)",
        cellsalign: "right",
        align: "center",
        datafield: "i_max",
        editable: false,
        width: 130,
      },
      {
        text: "Arus (A)",
        cellsalign: "right",
        align: "center",
        datafield: "i",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: 130,
      },
      {
        text: "Tegangan (kV)",
        cellsalign: "right",
        align: "center",
        datafield: "v",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: 130,
      },
      {
        text: "COS PHI",
        cellsalign: "right",
        align: "center",
        datafield: "cosq",
        width: 100,
        editable: roleActions?.update || false,
      },
      {
        text: "Daya Aktif (MW)",
        cellsalign: "right",
        align: "center",
        datafield: "p",
        width: 130,
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        validation: validateData,
      },
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};

export const PENGUKURAN_BEBAN_PENYULANG_COLUMN_JQWIDGET = (
  roleActions: any
) => {
  return {
    columns: [
      {
        text: "NO",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: 50,
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "center",
        align: "center",
        datafield: "datum",
        width: 140,
        pinned: true,
        editable: false,
      },
      {
        text: "Gardu Induk",
        cellsalign: "left",
        align: "center",
        datafield: "nama_gardu_induk",
        width: 160,
        pinned: true,
        editable: false,
      },

      {
        text: "Trafo",
        cellsalign: "left",
        align: "center",
        datafield: "trafo",
        editable: false,
        width: 160,
      },
      {
        text: "Penyulang",
        cellsalign: "left",
        align: "center",
        datafield: "nama_lokasi",
        editable: false,
        width: 160,
      },
      ...UP3_JQWidget(),
      ...ULP_JQWidget(),

      // {
      //   text: 'Pemilik', cellsalign: 'right', align: 'center', datafield: 'pemilik', editable: false, width: 140
      // },
      {
        text: "I. Max (A)",
        cellsalign: "right",
        align: "center",
        datafield: "i_max",
        editable: false,
        width: 140,
      },
      {
        text: "Arus (A)",
        cellsalign: "right",
        align: "center",
        datafield: "i",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: 140,
      },
      {
        text: "Tegangan (kV)",
        cellsalign: "right",
        align: "center",
        datafield: "v",
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        width: 140,
      },
      {
        text: "COS PHI",
        cellsalign: "right",
        align: "center",
        datafield: "cosq",
        width: 140,
        editable: roleActions?.update || false,
        validation: validateData,
      },
      {
        text: "Daya Aktif (MW)",
        cellsalign: "right",
        align: "center",
        datafield: "p",
        width: 140,
        editable: roleActions?.update || false,
        cellclassname: CeilBackgroundPengukuranBeban,
        validation: validateData,
      },
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};

export const PENGUKURAN_BEBAN_PENYULANG_COLUMN_1PHASE_JQWIDGET = () => {
  return {
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: 50,
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "center",
        align: "center",
        datafield: "datum",
        width: 140,
        pinned: true,
        editable: false,
      },
      {
        text: "Gardu Induk",
        cellsalign: "left",
        align: "center",
        datafield: "nama_gardu_induk",
        width: 160,
        pinned: true,
        editable: false,
      },
      {
        text: "Trafo",
        cellsalign: "left",
        align: "center",
        datafield: "trafo",
        editable: false,
        width: 160,
      },
      {
        text: "Penyulang",
        cellsalign: "left",
        align: "center",
        datafield: "nama_lokasi",
        editable: false,
        width: 160,
      },
      ...UP3_JQWidget(),
      ...ULP_JQWidget(),
      // {
      //   text: 'Pemilik', cellsalign: 'right', align: 'center', datafield: 'pemilik', editable: false, width: 140
      // },
      {
        text: "I. Max (A)",
        cellsalign: "right",
        align: "center",
        datafield: "i_max",
        editable: false,
        width: 140,
      },

      ...MORE_PENGUKURAN_BEBAN_1PHASE(),
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};

export const PENGUKURAN_BEBAN_PENYULANG_COLUMN_3PHASE_JQWIDGET = () => {
  const statuscb: any[] = [
    { value: null, label: "" },
    { value: "ON", label: "ON" },
    { value: "OFF", label: "OFF" },
  ];
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
        width: 50,
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "center",
        align: "center",
        datafield: "datum",
        width: 140,
        pinned: true,
        editable: false,
      },
      {
        text: "Penyulang",
        cellsalign: "left",
        align: "center",
        datafield: "nama_lokasi",
        editable: false,
        pinned: true,
        width: 100,
      },

      {
        text: "Pemilik",
        cellsalign: "left",
        align: "center",
        datafield: "pemilik",
        editable: false,
        pinned: true,
        width: 100,
      },
      {
        text: "Gardu Induk",
        cellsalign: "left",
        align: "center",
        datafield: "nama_gardu_induk",
        width: 150,
        pinned: true,
        editable: false,
      },
      {
        text: "Trafo",
        cellsalign: "left",
        align: "center",
        datafield: "trafo",
        editable: false,
        width: 80,
        pinned: true,
      },
      {
        text: "I. Max(A)",
        cellsalign: "center",
        align: "center",
        datafield: "i_max",
        editable: false,
        pinned: true,
        width: 70,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      {
        text: "Status CB",
        cellsalign: "center",
        align: "center",
        datafield: "status_cb",
        cellclassname: CeilBackgroundPengukuranBebanNew,
        width: "5%",
        pinned: true,
        columntype: "dropdownlist",
        createeditor: (row: number, value: any, editor: any): void => {
          editor.jqxDropDownList({
            height: 27,
            source: statuscb,
            displayMember: "label",
            valueMember: "value",
          });
        },
      },
      {
        text: "No Urut",
        cellsalign: "center",
        align: "center",
        datafield: "no_urut_cell",
        width: 70,
        pinned: true,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },
      {
        text: "Rel",
        cellsalign: "left",
        align: "center",
        datafield: "rel",
        width: 50,
        pinned: true,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      {
        text: "Keterangan",
        cellsalign: "left",
        align: "left",
        datafield: "keterangan",
        width: "10%",
        pinned: true,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      // ...UP3_JQWidget(),
      // ...ULP_JQWidget(),
      // {
      //   text: 'Pemilik', cellsalign: 'right', align: 'center', datafield: 'pemilik', editable: false, width: 140
      // },

      ...MORE_PENGUKURAN_BEBAN_3PHASE(),
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};

export const PENGUKURAN_BEBAN_TRAFO_COLUMN_3PHASE_JQWIDGET = () => {
  const statuscb: any[] = [
    { value: null, label: "" },
    { value: "ON", label: "ON" },
    { value: "OFF", label: "OFF" },
  ];
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
        width: 50,
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "center",
        align: "center",
        datafield: "datum",
        width: 140,
        pinned: true,
        editable: false,
      },

      {
        text: "Gardu Induk",
        cellsalign: "left",
        align: "center",
        datafield: "nama_gardu_induk",
        width: 150,
        pinned: true,
        editable: false,
      },
      {
        text: "Trafo",
        cellsalign: "left",
        align: "center",
        datafield: "trafo",
        editable: false,
        width: 80,
        pinned: true,
      },
      {
        text: "Pemilik",
        cellsalign: "left",
        align: "center",
        datafield: "pemilik",
        editable: false,
        pinned: true,
        width: 100,
      },
      {
        text: "I. Max(A)",
        cellsalign: "center",
        align: "center",
        datafield: "i_max",
        editable: false,
        pinned: true,
        width: 70,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      {
        text: "Status CB",
        cellsalign: "center",
        align: "center",
        datafield: "status_cb",
        cellclassname: CeilBackgroundPengukuranBebanNew,
        width: "5%",
        pinned: true,
        columntype: "dropdownlist",
        createeditor: (row: number, value: any, editor: any): void => {
          editor.jqxDropDownList({
            height: 27,
            source: statuscb,
            displayMember: "label",
            valueMember: "value",
          });
        },
      },
      {
        text: "No Urut",
        cellsalign: "center",
        align: "center",
        datafield: "no_urut_cell",
        width: 70,
        pinned: true,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },
      {
        text: "Rel",
        cellsalign: "left",
        align: "center",
        datafield: "rel",
        width: 50,
        pinned: true,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      {
        text: "Keterangan",
        cellsalign: "left",
        align: "left",
        datafield: "keterangan",
        width: "10%",
        pinned: true,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      // ...UP3_JQWidget(),
      // ...ULP_JQWidget(),
      // {
      //   text: 'Pemilik', cellsalign: 'right', align: 'center', datafield: 'pemilik', editable: false, width: 140
      // },

      ...MORE_PENGUKURAN_BEBAN_3PHASE(),
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};

export const PENGUKURAN_BEBAN_PEMBANGKIT_COLUMN_3PHASE_JQWIDGET = () => {
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
        width: 50,
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "center",
        align: "center",
        datafield: "datum",
        width: 140,
        pinned: true,
        editable: false,
      },
      {
        text: "Pembangkit",
        cellsalign: "left",
        align: "center",
        datafield: "nama_lokasi",
        editable: false,
        pinned: true,
        width: 100,
      },
      {
        text: "Unit Pembangkit",
        cellsalign: "left",
        align: "center",
        datafield: "nama_parent",
        width: 150,
        pinned: true,
        editable: false,
      },
      {
        text: "I. Max(A)",
        cellsalign: "center",
        align: "center",
        datafield: "i_max",
        editable: false,
        pinned: true,
        width: 70,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      {
        text: "No Urut",
        cellsalign: "center",
        align: "center",
        datafield: "no_urut_cell",
        width: 70,
        pinned: true,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      {
        text: "Keterangan",
        cellsalign: "left",
        align: "left",
        datafield: "keterangan",
        width: "10%",
        pinned: true,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      // ...UP3_JQWidget(),
      // ...ULP_JQWidget(),
      // {
      //   text: 'Pemilik', cellsalign: 'right', align: 'center', datafield: 'pemilik', editable: false, width: 140
      // },

      ...MORE_PENGUKURAN_BEBAN_3PHASE(),
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};

export const PENGUKURAN_BEBAN_GH_COLUMN_3PHASE_JQWIDGET = () => {
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
        width: 50,
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "center",
        align: "center",
        datafield: "datum",
        width: 140,
        pinned: true,
        editable: false,
      },
      {
        text: "Gardu Hubung",
        cellsalign: "left",
        align: "center",
        datafield: "nama_lokasi",
        editable: false,
        pinned: true,
        width: 100,
      },
      {
        text: "GI/Penyulang",
        cellsalign: "left",
        align: "center",
        datafield: "nama_parent",
        width: 150,
        pinned: true,
        editable: false,
      },
      {
        text: "I. Max(A)",
        cellsalign: "center",
        align: "center",
        datafield: "i_max",
        editable: false,
        pinned: true,
        width: 70,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      {
        text: "No Urut",
        cellsalign: "center",
        align: "center",
        datafield: "no_urut_cell",
        width: 70,
        pinned: true,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      {
        text: "Keterangan",
        cellsalign: "left",
        align: "left",
        datafield: "keterangan",
        width: "10%",
        pinned: true,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      // ...UP3_JQWidget(),
      // ...ULP_JQWidget(),
      // {
      //   text: 'Pemilik', cellsalign: 'right', align: 'center', datafield: 'pemilik', editable: false, width: 140
      // },

      ...MORE_PENGUKURAN_BEBAN_3PHASE(),
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};

export const PENGUKURAN_BEBAN_KP_COLUMN_3PHASE_JQWIDGET = () => {
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
        width: 50,
        pinned: true,
        editable: false,
      },
      {
        text: "Tanggal",
        cellsalign: "center",
        align: "center",
        datafield: "datum",
        width: 140,
        pinned: true,
        editable: false,
      },
      {
        text: "Keypoint",
        cellsalign: "left",
        align: "center",
        datafield: "nama_lokasi",
        editable: false,
        pinned: true,
        width: 100,
      },
      {
        text: "GI/Penyulang",
        cellsalign: "left",
        align: "center",
        datafield: "nama_parent",
        width: 150,
        pinned: true,
        editable: false,
      },
      {
        text: "I. Max(A)",
        cellsalign: "center",
        align: "center",
        datafield: "i_max",
        editable: false,
        pinned: true,
        width: 70,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      {
        text: "No Urut",
        cellsalign: "center",
        align: "center",
        datafield: "no_urut_cell",
        width: 70,
        pinned: true,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      {
        text: "Keterangan",
        cellsalign: "left",
        align: "left",
        datafield: "keterangan",
        width: "10%",
        pinned: true,
        cellclassname: CeilBackgroundPengukuranBebanNew,
      },

      // ...UP3_JQWidget(),
      // ...ULP_JQWidget(),
      // {
      //   text: 'Pemilik', cellsalign: 'right', align: 'center', datafield: 'pemilik', editable: false, width: 140
      // },

      ...MORE_PENGUKURAN_BEBAN_3PHASE(),
    ],
    dataField: [...NO_DATAFIELD_JQWidget()],
  };
};
