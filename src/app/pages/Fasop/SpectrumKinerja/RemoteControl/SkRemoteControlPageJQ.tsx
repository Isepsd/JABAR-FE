import React, { useState } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';


/** CONFIG */
import { KIN_RC_COLUMNS_JQX } from '@app/configs/react-table/fasop/spectrum-kinerja.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

import moment from 'moment';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import RCKinFilter from '@app/modules/Fasop/RCKinFilter';


export default function SkRemoteControlPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});
 
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id: item?.id,
        number: item?.number,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        jlm_rc: item?.jlm_rc,
        sukses: item?.sukses,
        gagal: item?.gagal,
        performance: item?.performance ? item?.performance : "0.0"
      });
    });
    return dataTableValue;
  }

  const [filterValues, setFilterValues] = useState<any>({
    harian: moment().format('YYYY-MM-DD'),
          bulanan: undefined,
          path1text: '',
          path3text: '',
          id_induk_pointtype: null,
          jenispoint: null,
  
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
  return (
    <>
    
         <RCKinFilter onFilterChange={handleFilterChange} />
        
      <JqxTabs theme='light'>
        <ul style={{ marginLeft: 10 }} key="1">
          <li><i className="fa-solid fa-server"></i> Ketersediaan RC</li>
          {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
        </ul>
        <div key="2">
          <TableDataJqxGridNew

            //TABLE DATA
            path={API_PATH().fasop.laporan_scada.kinerja_rc}
            filterParams={{ sort_by: "id_induk_pointtype,path1,path3", ...filterValues }}
            dataFieldsColsConfig={KIN_RC_COLUMNS_JQX()}
            primaryKey={'id'}
            respDataApi={handleRespDataApi}
            filterable={true}
            onRowSelected={handleCheckedRows}
            exportbtn={true}
          />
        </div>
      </JqxTabs>
    </>
  );
}