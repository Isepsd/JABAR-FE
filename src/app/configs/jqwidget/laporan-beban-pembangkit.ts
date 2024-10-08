import { DATE_JQWidget, MONTH_YEAR_JQWidget, MORE_BEBAN_MULTI_COLUMN_JQWidget, NO_JQWidget, PEMBANGKIT_JQWidget, UNIT_PEMBANGKIT_JQWidget, YEAR_JQWidget } from "./_more-jqwidget.column.config"
import { DATETIME_DATAFIELD_JQWidget, DAYA_AKTIF_DATAFIELD_JQWidget, MONTHYEAR_DATAFIELD_JQWidget, NO_DATAFIELD_JQWidget, PEMBANGKIT_DATAFIELD_JQWidget, UNIT_PEMBANGKIT_DATAFIELD_JQWidget, YEAR_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config"


export const BEBAN_PEMBANGKIT_PERJAM_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      { text: 'Tanggal', cellsalign: 'left', align: 'left', datafield: 'datum', width: 140 },
      { text: 'Unit Pembangkit', cellsalign: 'left', align: 'left', datafield: 'unit_pembangkit' },
      { text: 'Pembangkit', cellsalign: 'left', align: 'left', datafield: 'pembangkit', },
      { text: 'Daya Aktif (MW)', cellsalign: 'left', align: 'left', datafield: 'p', width: 140 },
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...UNIT_PEMBANGKIT_DATAFIELD_JQWidget(),
      ...PEMBANGKIT_DATAFIELD_JQWidget(),
      ...DAYA_AKTIF_DATAFIELD_JQWidget()
    ]
  }
}

export const BEBAN_PEMBANGKIT_PERJAM_COLUMN1_JQWIDGET = () => {
  return [
      ...NO_JQWidget(),
      { text: 'Tanggal', cellsalign: 'left', align: 'left', datafield: 'datum', width: 140 },
      { text: 'Unit Pembangkit', cellsalign: 'left', align: 'left', datafield: 'unit_pembangkit' },
      { text: 'Pembangkit', cellsalign: 'left', align: 'left', datafield: 'pembangkit', },
      { text: 'Daya Aktif (MW)', cellsalign: 'left', align: 'left', datafield: 'p', width: 140 },
    
  ]
}

export const BEBAN_PEMBANGKIT_HARIAN_COLUMN_JQWidget = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...DATE_JQWidget(),
      ...UNIT_PEMBANGKIT_JQWidget(),
      ...PEMBANGKIT_JQWidget(),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "", "A", "Hari"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_siang", "A", "Siang"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_malam", "A", "Malam"),
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...UNIT_PEMBANGKIT_DATAFIELD_JQWidget(),
      ...PEMBANGKIT_DATAFIELD_JQWidget(),
    ],

  }
}

export const BEBAN_PEMBANGKIT_BULAN_COLUMN_JQWidget = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...MONTH_YEAR_JQWidget(),
      ...UNIT_PEMBANGKIT_JQWidget(),
      ...PEMBANGKIT_JQWidget(),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "", "MW", "Bulan"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_siang", "MW", "Siang"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_malam", "MW", "Malam"),
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...MONTHYEAR_DATAFIELD_JQWidget(),
      ...UNIT_PEMBANGKIT_DATAFIELD_JQWidget(),
      ...PEMBANGKIT_DATAFIELD_JQWidget(),
    ],

  }
}
export const BEBAN_PEMBANGKIT_TAHUN_COLUMN_JQWidget = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...YEAR_JQWidget(),
      ...UNIT_PEMBANGKIT_JQWidget(),
      ...PEMBANGKIT_JQWidget(),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "", "MW", "Tahun"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_siang", "MW", "Siang"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_malam", "MW", "Malam"),
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...YEAR_DATAFIELD_JQWidget(),
      ...UNIT_PEMBANGKIT_DATAFIELD_JQWidget(),
      ...PEMBANGKIT_DATAFIELD_JQWidget(),
    ],

  }
}