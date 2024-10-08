import React, { useEffect, useState } from 'react';

/** CONFIG */

import { SCADATEL_STATUS_TELESIGNAL_COLUMN_JQX } from '@app/configs/react-table/fasop/spectrum-realtime.column'
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import Filter from './Filter';


export default function StatTelesignalPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        number: item?.number,
        point_number: item?.point_number,
        nama_pointtype: item?.nama_pointtype,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        path5: item?.path5,
        status_2: item?.status_2,
        datum_2: item?.datum_2,
        durasi: item?.durasi,
        value: item?.value,
        datum_capture: item?.datum_capture,
        kesimpulan: item?.kesimpulan

      });
    });
    return dataTableValue;
  }



  const handleCheckedRows = (data: any) => {
    return data;
  }

  const [filterValues, setFilterValues] = useState<any>({
            path1: '',
            path2: '',
            path3: '',
            path4: '',
        
        });

  const handleFilterChange = (newFilterValues: any) => {
        setFilterValues(newFilterValues);

        };

  useEffect(() => {
    const tabs = document.getElementById('tabs');
    if (tabs) {
      (window as any).jqwidgets.createInstance(tabs, 'jqxTabs', { theme: "light", reorder: true });
    }

  }, []);


  return (
    <>
    
            <Filter onFilterChange={handleFilterChange} />
      <div style={{ marginTop: '20px' }}>
        <div id="tabs">
          <ul style={{ marginLeft: 10 }} key="1">
            <li><i className="fa-solid fa-server"></i> Telesignal Status</li>
          </ul>
        <div key="2">
          <TableDataJqxGridNew
            
            //TABLE DATA
            path={API_PATH().fasop.realtime.digital}
            filterParams={{ id_induk_pointtype: '5a9d6c6f-a333-45cc-9c0f-06e244b7d00c', ...filterValues }}
            dataFieldsColsConfig={SCADATEL_STATUS_TELESIGNAL_COLUMN_JQX()}
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