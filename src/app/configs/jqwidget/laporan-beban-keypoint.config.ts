import { BEBAN_PERJAM_JQWIDGET, DATETIME_JQWidget, GARDU_INDUK_JQWidget, LOADfAKTOR_JQWidget, MONTH_YEAR_JQWidget, MORE_BEBAN_MULTI_COLUMN_JQWidget, NO_JQWidget, KEYPOINT_JQWidget, ULP_JQWidget, UP3_JQWidget, YEAR_JQWidget } from "./_more-jqwidget.column.config"
import { DATETIME_DATAFIELD_JQWidget, NO_DATAFIELD_JQWidget, TRAFO_DATAFIELD_JQWidget, GARDU_INDUK_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config"

export const BEBAN_KEYPOINT_PERJAM_COLUMN_JQWIDGET = () => {
    return {
        columns: [
            ...NO_JQWidget(),
            ...DATETIME_JQWidget(),
            ...GARDU_INDUK_JQWidget(),
            ...KEYPOINT_JQWidget(),
            ...UP3_JQWidget(),
            ...ULP_JQWidget(),
            // { text: 'Pemilik', cellsalign: 'left', align: 'left', datafield: 'pemilik', width: 140 },
            { text: 'Tegangan (kV)', cellsalign: 'left', align: 'left', datafield: 'v', width: 140 },
            ...BEBAN_PERJAM_JQWIDGET(),
            // ...LOADfAKTOR_JQWidget()
        ],
        dataField: [
            ...NO_DATAFIELD_JQWidget(),
            ...DATETIME_DATAFIELD_JQWidget(),
            ...GARDU_INDUK_DATAFIELD_JQWidget(),
            // ...TRAFO_DATAFIELD_JQWidget(),
            // ...BEBAN_PERJAM_DATAFIELD_JQWidget()
        ]
    }
}

export const BEBAN_KEYPOINT_HARIAN_COLUMN_JQWIDGET = () => {
    return {
        columns: [
            ...NO_JQWidget(),
            ...DATETIME_JQWidget(),
            ...GARDU_INDUK_JQWidget(),
            ...KEYPOINT_JQWidget(),
            ...UP3_JQWidget(),
            ...ULP_JQWidget(),
            // { text: 'Pemilik', cellsalign: 'left', align: 'left', datafield: 'pemilik ', width: 140 },
            { text: 'Tegangan (kV)', cellsalign: 'left', align: 'left', datafield: 'v ', width: 140 },
            ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "", "A", "Hari"),
            ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_siang", "A", "Siang"),
            ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_malam", "A", "Malam"),
            ...LOADfAKTOR_JQWidget()
        ],
        dataField: [
            ...NO_DATAFIELD_JQWidget(),
            ...DATETIME_DATAFIELD_JQWidget(),
            ...GARDU_INDUK_DATAFIELD_JQWidget(),
            ...TRAFO_DATAFIELD_JQWidget(),
        ],

    }
}
// export const BEBAN__HARIAN_COLUMN_JQWIDGET = () => {
//     return {
//         columns: [
//             ...NO_JQWidget(),
//             ...DATETIME_JQWidget(),
//             ...GARDU_INDUK_JQWidget(),
//             ...PENYULANG_JQWidget(),
//             ...UP3_JQWidget(),
//             ...ULP_JQWidget(),
//             { text: 'Pemilik', cellsalign: 'left', align: 'left', datafield: 'pemilik ', width: 140 },
//             { text: 'Tegangan (kV)', cellsalign: 'left', align: 'left', datafield: 'v ', width: 140 },
//             ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "", "A", "Hari"),
//             ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_siang", "A", "Siang"),
//             ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_malam", "A", "Malam"),
//             ...LOADfAKTOR_JQWidget()
//         ],
//         dataField: [
//             ...NO_DATAFIELD_JQWidget(),
//             ...DATETIME_DATAFIELD_JQWidget(),
//             ...GARDU_INDUK_DATAFIELD_JQWidget(),
//             ...TRAFO_DATAFIELD_JQWidget(),
//         ],

//     }
// }
export const BEBAN_KEYPOINT_BULAN_COLUMN_JQWIDGET = () => {
    return {
        columns: [
            ...NO_JQWidget(),
            ...MONTH_YEAR_JQWidget(),
            ...GARDU_INDUK_JQWidget(),
            ...KEYPOINT_JQWidget(),
            ...UP3_JQWidget(),
            ...ULP_JQWidget(),
            // { text: 'Pemilik', cellsalign: 'left', align: 'left', datafield: 'pemilik ', width: 140 },
            { text: 'Tegangan (kV)', cellsalign: 'left', align: 'left', datafield: 'v ', width: 140 },
            ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "", "A", "Bulan"),
            ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_siang", "A", "Siang"),
            ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_malam", "A", "Malam"),
            ...LOADfAKTOR_JQWidget()
        ],
        dataField: [
            ...NO_DATAFIELD_JQWidget(),
            ...DATETIME_DATAFIELD_JQWidget(),
            ...GARDU_INDUK_DATAFIELD_JQWidget(),
            ...TRAFO_DATAFIELD_JQWidget(),
        ],

    }
}

export const BEBAN_KEYPOINT_TAHUN_COLUMN_JQWIDGET = () => {
    return {
        columns: [
            ...NO_JQWidget(),
            ...YEAR_JQWidget(),
            ...GARDU_INDUK_JQWidget(),
            ...KEYPOINT_JQWidget(),
            ...UP3_JQWidget(),
            ...ULP_JQWidget(),
            // { text: 'Pemilik', cellsalign: 'left', align: 'left', datafield: 'pemilik ', width: 140 },
            { text: 'Tegangan (kV)', cellsalign: 'left', align: 'left', datafield: 'v ', width: 140 },
            ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "", "A", "Tahun"),
            ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_siang", "A", "Siang"),
            ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_malam", "A", "Malam"),
            ...LOADfAKTOR_JQWidget()
        ],
        dataField: [
            ...NO_DATAFIELD_JQWidget(),
            ...DATETIME_DATAFIELD_JQWidget(),
            ...GARDU_INDUK_DATAFIELD_JQWidget(),
            ...TRAFO_DATAFIELD_JQWidget(),
        ],

    }
}