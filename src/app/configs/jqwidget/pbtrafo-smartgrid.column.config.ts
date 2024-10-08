// import { useRef } from "react";
import { CeilBackgroundPengukuranBeban } from "@app/helper/smartgrid.helper";
import { NO_DATAFIELD_SMARTGRID } from "./_more-smartgrid.datafield.config";
import {
  MORE_PENGUKURAN_BEBAN_1PHASE,
  MORE_PENGUKURAN_BEBAN_3PHASE,
  MORE_TEGANGAN_TRAFO,
} from "./_more-smartgrid.column.config";

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

export const PENGUKURAN_BEBAN_TRAFO_COLUMN_SMARTGRID = (roleActions: any) => {
  //   const grid = useRef();
  //   const tap: any[] = [
  //     { value: null, label: "" },
  //     { value: "1", label: "1" },
  //     { value: "2", label: "2" },
  //     { value: "3", label: "3" },
  //     { value: "4", label: "4" },
  //     { value: "5", label: "5" },
  //     { value: "6", label: "6" },
  //     { value: "7", label: "7" },
  //   ];

  return {
    columns: [
      {
        label: "No",
        cellsAlign: "center",
        align: "center",
        dataField: "number",
        width: "3%",
        freeze: true,
        allowEdit: false,
      },
      {
        label: "Tanggal",
        cellsAlign: "center",
        align: "center",
        dataField: "datum",
        width: "9%",
        freeze: true,
      },

      {
        label: "Unit Induk",
        cellsAlign: "left",
        align: "center",
        dataField: "pemilik",
        width: "8%",
        freeze: true,
        allowEdit: false,
      },
      {
        label: "Gardu Induk",
        cellsAlign: "left",
        align: "center",
        dataField: "nama_gardu_induk",
        width: "10%",
        freeze: true,
        allowEdit: false,
      },
      {
        label: "Trafo",
        cellsAlign: "left",
        align: "center",
        dataField: "nama_lokasi",
        allowEdit: false,
        width: "7%",
        freeze: true,
      },

      {
        label: "I. Max (A)",
        cellsAlign: "right",
        align: "center",
        dataField: "i_max",
        allowEdit: false,
        width: "5%",
        freeze: true,
      },
      {
        label: "No Urut",
        cellsAlign: "center",
        align: "center",
        dataField: "no_urut_cell",
        allowEdit: roleActions?.update || false,
        width: "5%",
        freeze: true,
        editor: "numberInput",
        // createeditor: (row: number, cellvalue: any, editor: any): void => {
        //   editor.jqxnumberInput({ decimalDigits: 0, digits: 3 });
        // },
      },
      {
        label: "Posisi Tap Changer",
        cellsAlign: "center",
        align: "center",
        dataField: "tap",
        allowEdit: roleActions?.update || false,
        width: "9%",

        // createeditor: (row: number, value: any, editor: any): void => {
        //   editor.jqxDropDownList({
        //     height: 27,
        //     source: tap,
        //     displayMember: "label",
        //     valueMember: "value",
        //   });
        // },

        editor: {
          template: "<smart-drop-down-list></smart-drop-down-list>",
          onInit: (row: any, column: any, editor: any) => {
            const dropDownList = editor.firstElementChild;

            dropDownList.dataSource = ["Belgium", "France", "USA", "Lebanon"];
            dropDownList.dropDownAppendTo = "body";
            // dropDownList.selectedValues = [
            //   grid.current.rows[row].cells[0].value,
            // ];

            // dropDownList.addEventListener("change", function () {
            //   change.current = true;
            // });
          },
          onRender: (row: any, column: any, editor: any) => {
            editor.firstElementChild.selectedValues = [
              //   grid.current.rows[row].cells[0].value,
            ];
          },
          getValue(value: any) {
            return value[0].value || "";
          },
        },
      },
      {
        label: "R",
        cellsAlign: "right",
        align: "center",
        dataField: "arus_ir",
        columnGroup: "arus",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        //validation: validateData,
      },
      {
        label: "S",
        cellsAlign: "right",
        align: "center",
        dataField: "arus_is",
        columnGroup: "arus",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        //validation: validateData,
      },
      {
        label: "T",
        cellsAlign: "right",
        align: "center",
        dataField: "arus_it",
        columnGroup: "arus",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        //validation: validateData,
      },
      {
        label: "R-S",
        cellsAlign: "right",
        align: "center",
        dataField: "vrs",
        columnGroup: "tegangan",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        //validation: validateData,
      },
      {
        label: "R-T",
        cellsAlign: "right",
        align: "center",
        dataField: "vrt",
        columnGroup: "tegangan",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        //validation: validateData,
      },
      {
        label: "S-T",
        cellsAlign: "right",
        align: "center",
        dataField: "vst",
        columnGroup: "tegangan",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        //validation: validateData,
      },

      {
        label: "R-N",
        cellsAlign: "right",
        align: "center",
        dataField: "vrn",
        columnGroup: "tegangan",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        //validation: validateData,
      },
      {
        label: "S-N",
        cellsAlign: "right",
        align: "center",
        dataField: "vsn",
        columnGroup: "tegangan",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        //validation: validateData,
      },
      {
        label: "T-N",
        cellsAlign: "right",
        align: "center",
        dataField: "vtn",
        columnGroup: "tegangan",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "4%",
        //validation: validateData,
      },
      {
        label: "Cos Phi",
        cellsAlign: "right",
        align: "center",
        dataField: "cosq",
        width: "5%",
        allowEdit: roleActions?.update || false,
        // validation: validateDataCOSPHI,
      },
      {
        label: "Arus Avg (A)",
        cellsAlign: "right",
        align: "center",
        dataField: "i",
        width: "5%",
        //allowEdit: false,
      },
      {
        label: "Teg. Avg (kV)",
        cellsAlign: "right",
        align: "center",
        dataField: "v",
        width: "7%",
        //allowEdit: false,
      },
      {
        label: "Daya Aktif (MW)",
        cellsAlign: "right",
        align: "center",
        dataField: "p",
        width: "8%",
        // allowEdit: roleActions?.update || false,
        //allowEdit: false,

        //validation: validateData,
      },
    ],
    dataField: [...NO_DATAFIELD_SMARTGRID()],
  };
};

export const PENGUKURAN_BEBAN_TRAFO_COLUMN_1PHASE_SMARTGRID = (
  roleActions: any
) => {
  return {
    columns: [
      {
        label: "No",
        cellsAlign: "center",
        align: "center",
        dataField: "number",
        width: "3%",
        freeze: true,
        //allowEdit: false,
      },
      {
        label: "Tanggal",
        cellsAlign: "left",
        align: "center",
        dataField: "datum",
        width: "10%",
        freeze: true,
        //allowEdit: false,
      },
      {
        label: "Gardu Induk",
        cellsAlign: "left",
        align: "center",
        dataField: "nama_parent",
        width: "10%",
        freeze: true,
        //allowEdit: false,
      },
      {
        label: "Trafo",
        cellsAlign: "left",
        align: "center",
        dataField: "nama_lokasi",
        //allowEdit: false,
        width: "7%",
        freeze: true,
      },
      {
        label: "No Urut",
        cellsAlign: "center",
        align: "center",
        dataField: "no_urut_cell",
        allowEdit: roleActions?.update || false,
        cellclassname: roleActions?.update
          ? CeilBackgroundPengukuranBeban
          : false,
        width: "5%",
        freeze: true,
        editor: "numberInput",
        createeditor: (row: number, cellvalue: any, editor: any): void => {
          editor.jqxnumberInput({ decimalDigits: 0, digits: 3 });
        },
      },
      {
        label: "I. Max (A)",
        cellsAlign: "right",
        align: "center",
        dataField: "i_max",
        //allowEdit: false,
        width: "5%",
        freeze: true,
      },

      ...MORE_PENGUKURAN_BEBAN_1PHASE(roleActions),
    ],
    dataField: [...NO_DATAFIELD_SMARTGRID()],
  };
};

export const TEGANGAN_TRAFO_COLUMN_SMARTGRID = (roleActions: any) => {
  console.log("TEGANGAN_TRAFO_COLUMN_SMARTGRID");
  console.log(roleActions);
  return {
    columns: [
      {
        label: "No",
        cellsAlign: "center",
        align: "center",
        dataField: "number",
        width: "3%",
        freeze: true,
        allowEdit: false,
      },
      {
        label: "Tanggal",
        cellsAlign: "left",
        align: "center",
        dataField: "datum",
        width: "9%",
        freeze: true,
        allowEdit: false,
      },
      // {
      //   label: "Regional",
      //   cellsAlign: "left",
      //   align: "center",
      //   dataField: "regional",
      //   width: "10%",
      //   freeze: true,
      //   //allowEdit: false,
      // },
      // {
      //   label: "UID/UIW",
      //   cellsAlign: "left",
      //   align: "center",
      //   dataField: "pemilik",
      //   width: "10%",
      //   freeze: true,
      //   //allowEdit: false,
      // },
      {
        label: "Unit Induk",
        cellsAlign: "left",
        align: "center",
        dataField: "pemilik",
        width: "9%",
        freeze: true,
        allowEdit: false,
      },
      {
        label: "Gardu Induk",
        cellsAlign: "left",
        align: "center",
        dataField: "nama_parent",
        width: "10%",
        freeze: true,
        allowEdit: false,
      },
      {
        label: "Trafo",
        cellsAlign: "left",
        align: "center",
        dataField: "nama_lokasi",
        allowEdit: false,
        width: "7%",
        freeze: true,
      },
      {
        label: "No Urut",
        cellsAlign: "center",
        align: "center",
        dataField: "no_urut_cell",
        allowEdit: roleActions?.update || false,
        // cellclassname: roleActions?.update
        //   ? CeilBackgroundPengukuranBeban
        //   : false,
        width: "5%",
        freeze: true,
        editor: "numberInput",
        // createeditor: (row: number, cellvalue: any, editor: any): void => {
        //   editor.jqxnumberInput({ decimalDigits: 0, digits: 3 });
        // },
      },
      {
        label: "I. Max (A)",
        cellsAlign: "right",
        align: "center",
        dataField: "i_max",
        allowEdit: roleActions?.update || false,
        width: "7%",
        freeze: true,
        editor: "numberInput",
        cellsFormat: "f2",
      },

      ...MORE_TEGANGAN_TRAFO(roleActions),
    ],
    dataField: [...NO_DATAFIELD_SMARTGRID()],
  };
};

export const PENGUKURAN_BEBAN_TRAFO_COLUMN_3PHASE_SMARTGRID = (
  roleActions: any
) => {
  return {
    columns: [
      {
        label: "No",
        cellsAlign: "center",
        align: "center",
        dataField: "number",
        width: "3%",
        freeze: true,
        //allowEdit: false,
      },
      {
        label: "Tanggal",
        cellsAlign: "left",
        align: "center",
        dataField: "datum",
        width: "10%",
        freeze: true,
        //allowEdit: false,
      },
      {
        label: "Gardu Induk",
        cellsAlign: "left",
        align: "center",
        dataField: "nama_parent",
        width: "10%",
        freeze: true,
        //allowEdit: false,
      },
      {
        label: "Trafo",
        cellsAlign: "left",
        align: "center",
        dataField: "nama_lokasi",
        //allowEdit: false,
        width: "7%",
        freeze: true,
      },
      {
        label: "No Urut",
        cellsAlign: "center",
        align: "center",
        dataField: "no_urut_cell",
        allowEdit: roleActions?.update || false,
        cellclassname: roleActions?.update
          ? CeilBackgroundPengukuranBeban
          : false,
        width: "5%",
        freeze: true,
        editor: "numberInput",
        createeditor: (row: number, cellvalue: any, editor: any): void => {
          editor.jqxnumberInput({ decimalDigits: 0, digits: 3 });
        },
      },
      {
        label: "I. Max (A)",
        cellsAlign: "right",
        align: "center",
        dataField: "i_max",
        //allowEdit: false,
        width: "10%",
        freeze: true,
      },

      ...MORE_PENGUKURAN_BEBAN_3PHASE(roleActions),
    ],
    dataField: [...NO_DATAFIELD_SMARTGRID()],
  };
};

export const PENGUKURAN_BEBAN_GH_COLUMN_SMARTGRID = (roleActions: any) => {
  return {
    columns: [
      {
        label: "No",
        cellsAlign: "center",
        align: "center",
        dataField: "number",
        width: "3%",
        freeze: true,
        //allowEdit: false,
      },
      {
        label: "Tanggal",
        cellsAlign: "center",
        align: "center",
        dataField: "datum",
        width: "7%",
        freeze: true,
        //allowEdit: false,
      },
      {
        label: "Gardu Induk/Penyulang",
        cellsAlign: "left",
        align: "center",
        dataField: "parent_lokasi",
        width: "25%",
        freeze: true,
        //allowEdit: false,
      },
      {
        label: "Gardu Hubung",
        cellsAlign: "left",
        align: "center",
        dataField: "lokasi",
        //allowEdit: false,
        width: "25%",
        freeze: true,
      },
      // {
      //   label: 'I. Max (A)', cellsAlign: 'right', align: 'center', dataField: 'i_max', //allowEdit: false, width: 130,
      // },
      {
        label: "Arus (A)",
        cellsAlign: "right",
        align: "center",
        dataField: "i",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "10%",
      },
      {
        label: "Tegangan (kV)",
        cellsAlign: "right",
        align: "center",
        dataField: "v",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "10%",
      },
      {
        label: "Cos Phi",
        cellsAlign: "right",
        align: "center",
        dataField: "cosq",
        width: "10%",
        allowEdit: roleActions?.update || false,
      },
      {
        label: "Daya Aktif (MW)",
        cellsAlign: "right",
        align: "center",
        dataField: "p",
        width: "10%",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        //validation: validateData,
      },
    ],
    dataField: [...NO_DATAFIELD_SMARTGRID()],
  };
};

export const PENGUKURAN_BEBAN_KP_COLUMN_SMARTGRID = (roleActions: any) => {
  return {
    columns: [
      {
        label: "No",
        cellsAlign: "center",
        align: "center",
        dataField: "number",
        width: "3%",
        freeze: true,
        //allowEdit: false,
      },
      {
        label: "Tanggal",
        cellsAlign: "center",
        align: "center",
        dataField: "datum",
        width: "7%",
        freeze: true,
        //allowEdit: false,
      },
      {
        label: "Gardu Induk/Penyulang",
        cellsAlign: "left",
        align: "center",
        dataField: "parent_lokasi",
        width: "25%",
        freeze: true,
        //allowEdit: false,
      },
      {
        label: "Keypoint",
        cellsAlign: "left",
        align: "center",
        dataField: "lokasi",
        //allowEdit: false,
        width: "25%",
        freeze: true,
      },
      // {
      //   label: 'I. Max (A)', cellsAlign: 'right', align: 'center', dataField: 'i_max', //allowEdit: false, width: 130,
      // },
      {
        label: "Arus (A)",
        cellsAlign: "right",
        align: "center",
        dataField: "i",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "10%",
      },
      {
        label: "Tegangan (kV)",
        cellsAlign: "right",
        align: "center",
        dataField: "v",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        width: "10%",
      },
      {
        label: "Cos Phi",
        cellsAlign: "right",
        align: "center",
        dataField: "cosq",
        width: "10%",
        allowEdit: roleActions?.update || false,
      },
      {
        label: "Daya Aktif (MW)",
        cellsAlign: "right",
        align: "center",
        dataField: "p",
        width: "10%",
        allowEdit: roleActions?.update || false,
        //cellclassname: CeilBackgroundPengukuranBeban,
        //validation: validateData,
      },
    ],
    dataField: [...NO_DATAFIELD_SMARTGRID()],
  };
};
