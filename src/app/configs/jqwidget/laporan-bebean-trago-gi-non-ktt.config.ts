import { BEBAN_PERJAM_JQWIDGET, DATETIME_JQWidget, GARDU_INDUK_JQWidget, MONTH_YEAR_JQWidget, MORE_BEBAN_MULTI_COLUMN_JQWidget, NO_JQWidget, TRAFO_JQWidget, YEAR_JQWidget } from "./_more-jqwidget.column.config"
import { BEBAN_PERJAM_DATAFIELD_JQWidget, DATETIME_DATAFIELD_JQWidget, NO_DATAFIELD_JQWidget, TRAFO_DATAFIELD_JQWidget, UNIT_PEMBANGKIT_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config"

export const BEBAN_TRAFOGI_PERJAM_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...DATETIME_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      ...TRAFO_JQWidget(),

      { text: 'Jenis Layanan', cellsalign: 'left', align: 'left', datafield: 'jenis_layanan', width: 140 },
      { text: 'Kapasitas Trafo', cellsalign: 'left', align: 'left', datafield: 'kapasitas', width: 140 },
      ...BEBAN_PERJAM_JQWIDGET()
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...UNIT_PEMBANGKIT_DATAFIELD_JQWidget(),
      ...TRAFO_DATAFIELD_JQWidget(),
      { name: 'jenis_layanan', type: 'string' },
      { name: 'kapasitas', type: 'string' },
      ...BEBAN_PERJAM_DATAFIELD_JQWidget()
    ]
  }
}

export const BEBAN_TRAFOGI_HARIAN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...DATETIME_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      ...TRAFO_JQWidget(),
      { text: 'Jenis Layanan', cellsalign: 'center', align: 'center', datafield: 'jenis_layanan ', width: 140 },
      { text: 'Kapasitas Trafo', cellsalign: 'center', align: 'center', datafield: 'kapasitas ', width: 140 },
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "", "MW", "Hari"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_siang", "MW", "Siang"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_malam", "MW", "Malam"),
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...UNIT_PEMBANGKIT_DATAFIELD_JQWidget(),
      ...TRAFO_DATAFIELD_JQWidget(),
    ],

  }
}

export const BEBAN_TRAFOGI_BULAN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...MONTH_YEAR_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      ...TRAFO_JQWidget(),
      { text: 'Jenis Layanan', cellsalign: 'center', align: 'center', datafield: 'jenis_layanan ', width: 140 },
      { text: 'Kapasitas Trafo', cellsalign: 'center', align: 'center', datafield: 'kapasitas ', width: 140 },
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "", "MW", "Bulan"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_siang", "MW", "Siang"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_malam", "MW", "Malam"),
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...UNIT_PEMBANGKIT_DATAFIELD_JQWidget(),
      ...TRAFO_DATAFIELD_JQWidget(),
    ],

  }
}

export const BEBAN_TRAFOGI_TAHUN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...YEAR_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      ...TRAFO_JQWidget(),
      { text: 'Jenis Layanan', cellsalign: 'center', align: 'center', datafield: 'jenis_layanan', width: 140 },
      { text: 'Kapasitas Trafo', cellsalign: 'center', align: 'center', datafield: 'kapasitas', width: 140 },
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "", "MW", "Tahun"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_siang", "MW", "Siang"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_malam", "MW", "Malam"),
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...UNIT_PEMBANGKIT_DATAFIELD_JQWidget(),
      ...TRAFO_DATAFIELD_JQWidget(),
    ],

  }
}