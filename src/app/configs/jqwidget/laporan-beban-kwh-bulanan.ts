import { DATE_JQWidget, NO_JQWidget, GARDU_INDUK_JQWidget, PENYULANG_JQWidget } from "./_more-jqwidget.column.config"
import { DATETIME_DATAFIELD_JQWidget, NO_DATAFIELD_JQWidget, GARDU_INDUK_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config"



export const BEBAN_KWH_BULANAN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...DATE_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      {
        text: "Pemilik",
        cellsalign: "center",
        align: "center",
        datafield: "pemilik",
        width: 50,
        pinned: false,
      },
      ...PENYULANG_JQWidget(),
      {
        text: "No Urut",
        cellsalign: "center",
        align: "center",
        datafield: "no_urut",
        width: 50,
        pinned: false,
      },
      {
        text: "Kelompok",
        cellsalign: "center",
        align: "center",
        datafield: "kelompok",
        width: 50,
        pinned: false,
      },
      {
        text: "Jenis",
        cellsalign: "center",
        align: "center",
        datafield: "jenis",
        width: 50,
        pinned: false,
      },
      {
        text: "FK",
        cellsalign: "center",
        align: "center",
        datafield: "fk",
        width: 50,
        pinned: false,
      },
      {
        text: "Stand Awal",
        cellsalign: "center",
        align: "center",
        datafield: "stand_awal",
        width: 50,
        pinned: false,
      },
      {
        text: "Stand Akhir",
        cellsalign: "center",
        align: "center",
        datafield: "stand_akhir",
        width: 50,
        pinned: false,
      },
      {
        text: "Selisih",
        cellsalign: "center",
        align: "center",
        datafield: "selisih",
        width: 50,
        pinned: false,
      },
      {
        text: "KWH",
        cellsalign: "center",
        align: "center",
        datafield: "KWH",
        width: 50,
        pinned: false,
      },
      {
        text: "Keterangan",
        cellsalign: "center",
        align: "center",
        datafield: "keterangan",
        width: 50,
        pinned: false,
      },
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...GARDU_INDUK_DATAFIELD_JQWidget(),
      
    ],

  }
}

