import { B1, B2, B3 } from "../_more.columns.config"

export const MONITORING_KEY_POINT_COLUMN = () => {
  return [

    // { Header: 'No', accessor: 'number', minWidth: '30px', disableFilters: true, show: true },
    ...B1(),
    // ...B2(),
    ...B3(),
    { Header: 'Value', accessor: 'status', minWidth: '30px', disableFilters: true, show: true },
  ]
}

export const MONITORING_KEY_POINT_COLUMN_JQX = () => {
  const cellsrenderer = (row: number, columnfield: string, value: string | number,): string => {
    if (value === 1) {
      return '<div style="display: flex; justify-content: center; align-items: center; height: 100%;"><div style="background-color: #ff0000; color: white; padding: 4px; border-radius: 4px;">' + 'CLOSE' + '</div></div>';
    } else {
      return '<div style="display: flex; justify-content: center; align-items: center; height: 100%;"><div style="background-color: #008000; color: white; padding: 4px; border-radius: 4px;">' + 'OPEN' + '</div></div>';
    }
  };

  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'path1', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'value', type: 'number' }
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '5%', editable: false },
      { text: 'B1 (Lokasi)', datafield: 'path1', width: '45%', editable: false },
      { text: 'B3 (Bay)', datafield: 'path3', width: '25%', editable: false },
      { text: 'Value', datafield: 'value', width: '25%', editable: false, cellsrenderer: cellsrenderer, cellsalign: 'center', cellsclassname: 'centered', }
    ],
  };
};


export const MONITORING_KEY_POINT_DETAIL_COLUMN = () => {
  return [

    { Header: 'No', accessor: 'number', minWidth: '30px', disableFilters: true, show: true },
    { Header: 'Point Number', accessor: 'point_number', minWidth: '100px', disableFilters: true, show: true },
    ...B1(),
    ...B2(),
    ...B3(),
    { Header: 'Element', accessor: 'path4', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Value', accessor: 'value', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Update Terakhir', accessor: 'datum_capture', minWidth: '100px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'kesimpulan', minWidth: '100px', disableFilters: true, show: true },

  ]
}
export const MONITORING_KEY_POINT_DETAIL_COLUMN_JQX = () => {
  const cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any): string => {
    if (value === 'close') {
      return '<div style="display: flex; justify-content: center; align-items: center; height: 100%;"><div style="background-color: #ff0000; color: white; padding: 4px; border-radius: 4px;">' + value + '</div></div>';
    } else if (value === 'open') {
      return '<div style="display: flex; justify-content: center; align-items: center; height: 100%;"><div style="background-color: #008000; color: white; padding: 4px; border-radius: 4px;">' + value + '</div></div>';
    } else if (typeof value === 'string' && value.includes('disturbe')) {
      return '<div style="display: flex; justify-content: center; align-items: center; height: 100%;"><div style="background-color: orange; color: white; padding: 4px; border-radius: 4px;">' + value + '</div></div>';
    } else {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #000000;">' + value + '</span>';
    }
  };
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'value', type: 'string', },
      { name: 'datume_capture', type: 'string' },
      { name: 'kesimpulan', type: 'string' },
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '10%', editable: false, },
      { text: 'B1 (Lokasi)', datafield: 'path1', width: '17%', editable: false, },
      { text: 'B2 (Tegangan)', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3 (Bay)', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Value', datafield: 'value', width: '10%', editable: false, cellsrenderer: cellsrenderer, },
      { text: 'Update Terakhir', datafield: 'datum_capture', width: '20%', editable: false, },
      { text: 'Status', datafield: 'kesimpulan', width: '10%', editable: false, }
    ],
  };
};
