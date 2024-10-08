import React, { useEffect, useState } from 'react';

/** CONFIG */
import { HIS_ANALOG_30M_COLUMNS_JQX } from '@app/configs/react-table/fasop/spectrum-history.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';


/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import HistoryFilter from '@app/modules/Fasop/HistoryFilter'
import moment from "moment";
import { timeFormat } from '@app/helper/time.helper';

export default function ShPengukuranPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});
 
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id: item?. id,
        jenis_point: item.c_point?.pointtype?.name,
        path1: item?. path1,
        path2: item?. path2,
        path3: item?. path3,
        path4: item?.path4,
        datum: timeFormat(item.datum),
        msec_akhir: item?.msec_akhir,

      });
    });
    return dataTableValue;
  }

  const [filterValues, setFilterValues] = useState<any>({
    datum_after: moment().subtract(1, "day").format("YYYY-MM-DD") + " 00:00:00",
    datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
    path1: "",
    path2: "",
    path3: "",
  
});
  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
};

  const handleCheckedRows = (data: any) => {
    return data;
  }
  // const handleCheckedRows2 = (data: any) => {
  //     return data;
  // }

  // Initialize jqxTabs
  useEffect(() => {
    const tabs = document.getElementById('tabs');
    if (tabs) {
      (window as any).jqwidgets.createInstance(tabs, 'jqxTabs', { theme: "light", reorder: true });
    }

  }, []);


  return (
    <>
     
        <HistoryFilter onFilterChange={handleFilterChange}  selectProps={{ fieldName: 'id_pointtype', pathServiceName: 'master.fasop.point_type', labelField: 'name', valueField: 'id_pointtype', placeholder: 'Pilih Jenis Point' }} queryParams={{page: -1, jenispoint: 'ANALOG'}} fieldKeyword='path1' />
     
     
     

     <div style={{ margin: '20px' }}>
      <div id="tabs">
        <ul style={{ marginLeft: 10 }} key="1">
          <li><i className="fa-solid fa-server"></i> Telemetering 30 Menit</li>
          {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
        </ul>
        <div key="2">
          <TableDataJqxGridNew

            //TABLE DATA
            path={API_PATH().fasop.history.analog_30m}
            filterParams={{ id_induk_pointtype: "798be05c-4df2-4945-9a47-5745a0de66c6", ...filterValues }}
            dataFieldsColsConfig={HIS_ANALOG_30M_COLUMNS_JQX()}
            primaryKey={'id_pointtype'}
            respDataApi={handleRespDataApi}
            filterable={true}
            onRowSelected={handleCheckedRows}
            exportbtn={true}
          />
        </div>

      </div>
      </div>
    </>
  );
}