import { NO_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config";
export const validateData = (cell: any, value: any) => {
  if (value < 0 || !value || value === "") {
    return { result: false, message: "Nilai min 0" };
  }
  // else if (isNaN(Number(value)) === true)
  //   return { result: false, message: "Nilai harus angka" };
  return true;
}

export const PENGUKURAN_BEBAN_PEMBANGKIT_COLUMN_JQWIDGET = (roleActions: any) => {
  return {
    columns: [
      { text: 'No', cellsalign: 'center', align: 'center', datafield: 'number', width: '5%', pinned: true, editable: false, },
      { text: 'Tanggal', cellsalign: 'center', align: 'center', datafield: 'datum', width: '10%', pinned: true, editable: false, },
      { text: 'Unit Pembangkit', cellsalign: 'left', align: 'center', datafield: 'nama_parent', width: '20%', pinned: true, editable: false },
      { text: 'Pembangkit', cellsalign: 'left', align: 'center', datafield: 'nama_lokasi', editable: false,width: '20%', },
      {
        text: 'Arus (A)', cellsalign: 'right', align: 'center', datafield: 'i',width: '10%', editable: roleActions?.update || false,
      },
      {
        text: 'Tegangan (kV)', cellsalign: 'right', align: 'center', datafield: 'v',width: '10%', editable: roleActions?.update || false,
      },
      {
        text: 'Daya Aktif (MW)', cellsalign: 'right', align: 'center', datafield: 'p',width: '10%',  editable: roleActions?.update || false,
      }
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
    ]
  }
}
