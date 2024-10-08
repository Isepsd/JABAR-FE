// import React from "react";
// import { ACTION_COLUMN, NO } from "./_more.columns.config";

export const ASET_REF_COLUMNS_JQ = () => {
  return {
    datafields: [
      { name: "number" },
      { name: "nama", type: "string" },
      { name: "status", type: "int" },
    ],
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
      },
      { text: "Nama", datafield: "nama", width: "80%" },
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

export const ASET_REF_KATEGORI_COLUMNS_JQ = () => {
  return {
    // datafields: [
    //   { name: "number" },
    //   { name: "group_aset", type: "string" },
    //   { name: "nama", type: "string" },
    //   { name: "status", type: "int" },
    // ],
    columngroups: [{ text: "Level Inspeksi", align: "center", name: "il" }],
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
      },
      { text: "Nama Kategori", datafield: "nama", width: "30%" },
      { text: "Group", datafield: "aset_group", width: "32%" },
      {
        text: "IL-1",
        datafield: "il_1",
        width: "8%",
        columntype: "checkbox",
        filtertype: "bool",
        columnGroup: "il",
      },
      {
        text: "IL-2",
        datafield: "il_2",
        width: "8%",
        columntype: "checkbox",
        filtertype: "bool",
        columnGroup: "il",
      },
      {
        text: "IL-3",
        datafield: "il_3",
        width: "8%",
        columntype: "checkbox",
        filtertype: "bool",
        columnGroup: "il",
      },
      {
        text: "Status",
        datafield: "status",
        width: "8%",
        columntype: "checkbox",
        filtertype: "bool",
      },
    ],
  };
};

export const ASET_REF_KATEGORI_EXT_ATR_COLUMNS_JQ = () => {
  return {
    columns: [
      // {
      //   text: "No",
      //   cellsalign: "center",
      //   align: "center",
      //   datafield: "number",
      //   width: "5%",
      // },

      { text: "Nama Atribut", datafield: "nama", width: "30%" },
      {
        text: "Urutan",
        datafield: "urutan",
        cellsalign: "center",
        align: "center",
        width: "10%",
      },
      { text: "Satuan", datafield: "satuan", width: "25%" },
    ],
  };
};

export const ASET_REF_PRIORITAS_COLUMNS_JQ = () => {
  return {
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
      },
      { text: "Nama Prioritas", datafield: "nama", width: "15%" },
      { text: "Deskripsi", datafield: "deskripsi", width: "15%" },
      { text: "Range Tahun(Awal)", datafield: "nilai_awal", width: "15%" },
      { text: "Range Tahun(Akhir)", datafield: "nilai_akhir", width: "15%" },
      { text: "Keterangan", datafield: "keterangan", width: "40%" },
    ],
  };
};

export const ASET_REF_HI_COLUMNS_JQ = () => {
  return {
    datafields: [
      { name: "number" },
      { name: "nama", type: "string" },
      { name: "bobot_awal", type: "int" },
      { name: "bobot_akhir", type: "int" },
      { name: "status", type: "int" },
    ],
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
      },
      { text: "Nama", datafield: "nama", width: "30%" },
      { text: "Bobot Awal", datafield: "bobot_awal", width: "25%" },
      { text: "Bobot Akhir", datafield: "bobot_akhir", width: "25%" },
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

export const ASET_REF_ASET_COLUMNS_JQ = () => {
  return {
    columngroups: [
      { text: "Lokasi Aset", align: "center", name: "lokasi" },
      { text: "Pemeliharaan", align: "center", name: "har" },
    ],
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
      },
      { text: "No Aset", datafield: "no_aset_int", width: "5%" },
      { text: "No Maximo", datafield: "no_aset_ext", width: "6%" },
      { text: "Group", datafield: "group_aset", width: "8%" },
      { text: "Kategori", datafield: "kategori_aset", width: "10%" },
      { text: "Deskripsi", datafield: "deskripsi", width: "15%" },
      { text: "Parent Aset", datafield: "parent_aset", width: "15%" },
      {
        text: "Station",
        datafield: "station",
        width: "8%",
        columnGroup: "lokasi",
      },
      { text: "Trafo", datafield: "trafo", width: "6%", columnGroup: "lokasi" },
      {
        text: "Penyulang",
        datafield: "penyulang",
        width: "8%",
        columnGroup: "lokasi",
      },
      {
        text: "Unit Induk",
        datafield: "unit_induk",
        width: "10%",
        columnGroup: "lokasi",
      },
      {
        text: "UP3",
        datafield: "up3",
        width: "10%",
        columnGroup: "lokasi",
      },
      {
        text: "ULP",
        datafield: "ulp",
        width: "10%",
        columnGroup: "lokasi",
      },
      // {
      //   text: "Ruangan",
      //   datafield: "ruangan",
      //   width: "10%",
      //   columnGroup: "lokasi",
      // },
      // {
      //   text: "Lantai",
      //   datafield: "lantai",
      //   width: "10%",
      //   columnGroup: "lokasi",
      // },
      // {
      //   text: "Rak",
      //   datafield: "rak",
      //   width: "10%",
      //   columnGroup: "lokasi",
      // },
      {
        text: "Tahun",
        datafield: "tahun",
        cellsalign: "center",
        align: "center",
        width: "5%",
      },
      {
        text: "Usia (Tahun)",
        datafield: "usia_tahun",
        cellsalign: "center",
        align: "center",
        width: "5%",
      },
      {
        text: "Prioritas (IL-3)",
        datafield: "prioritas",
        cellsalign: "center",
        align: "center",
        width: "9%",
      },
      // {
      //   text: "Tgl Terakhir IL-1",
      //   datafield: "tgl_il1",
      //   columnGroup: "har",
      //   width: "8%",
      // },
      // {
      //   text: "Tgl Terakhir IL-2",
      //   datafield: "tgl_il2",
      //   columnGroup: "har",
      //   width: "8%",
      // },
      // {
      //   text: "Tgl Terakhir IL-3",
      //   datafield: "tgl_il3",
      //   columnGroup: "har",
      //   width: "8%",
      // },
      { text: "No Seri", datafield: "no_seri", width: "8%" },
      { text: "Manufaktur", datafield: "manufaktur", width: "8%" },
      { text: "Tipe", datafield: "tipe", width: "8%" },
      { text: "Model", datafield: "model", width: "8%" },
      { text: "Kondisi Aset", datafield: "kondisi_aset", width: "7%" },
      { text: "Status Aset", datafield: "status_aset", width: "7%" },
      { text: "Pengelola", datafield: "bagian", width: "20%" },
    ],
  };
};

export const ASET_REF_ASET_EXT_ATR_COLUMNS_JQ = () => {
  return {
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
      },
      { text: "Atribut", datafield: "atribut", width: "10%" },
      { text: "Nilai", datafield: "nilai", width: "5%" },
      { text: "Satuan", datafield: "satuan", width: "8%" },
    ],
  };
};

export const ASET_REF_ASET_RIWAYAT_MUTASI_COLUMNS_JQ = () => {
  return {
    columngroups: [
      { text: "Lokasi Lama", align: "center", name: "lama" },
      { text: "Lokasi Baru", align: "center", name: "baru" },
    ],
    columns: [
      {
        text: "No",
        cellsalign: "center",
        align: "center",
        datafield: "number",
        width: "3%",
      },
      { text: "Tgl Mutasi", datafield: "tgl_entri", width: "10%" },
      { text: "No Work Order", datafield: "nomor_wo", width: "10%" },

      {
        text: "Station",
        datafield: "station_lama",
        width: "10%",
        columnGroup: "lama",
      },
      {
        text: "Trafo",
        datafield: "trafo_lama",
        width: "6%",
        columnGroup: "lama",
      },
      {
        text: "Penyulang",
        datafield: "penyulang_lama",
        width: "10%",
        columnGroup: "lama",
      },
      {
        text: "Ruangan",
        datafield: "ruangan_lama",
        width: "6%",
        columnGroup: "lama",
      },
      {
        text: "Lantai",
        datafield: "lantai_lama",
        width: "6%",
        columnGroup: "lama",
      },
      {
        text: "Rak",
        datafield: "rak_lama",
        width: "6%",
        columnGroup: "lama",
      },
      {
        text: "Kondisi",
        datafield: "kondisi_lama",
        width: "6%",
        columnGroup: "lama",
      },

      {
        text: "Station",
        datafield: "station_baru",
        width: "10%",
        columnGroup: "baru",
      },
      {
        text: "Trafo",
        datafield: "trafo_baru",
        width: "6%",
        columnGroup: "baru",
      },
      {
        text: "Penyulang",
        datafield: "penyulang_baru",
        width: "10%",
        columnGroup: "baru",
      },
      {
        text: "Ruangan",
        datafield: "ruangan_baru",
        width: "6%",
        columnGroup: "baru",
      },
      {
        text: "Lantai",
        datafield: "lantai_baru",
        width: "6%",
        columnGroup: "baru",
      },
      {
        text: "Rak",
        datafield: "rak_baru",
        width: "6%",
        columnGroup: "baru",
      },
      {
        text: "Kondisi",
        datafield: "kondisi_baru",
        width: "6%",
        columnGroup: "baru",
      },
    ],
  };
};
