import React, { useEffect, useState } from 'react';

/** CONFIG */
import { SCADATEL_KINERJA_TRIP_BULAN_COLUMN_JQX } from "@app/configs/react-table/fasop/scadatel-column";

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';
import moment from "moment";

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import Filter from './Filter';
import CardWidget from '@app/components/Card/CardWidget';

export default function KinTripPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        number: item?.number,
        point_number: item?.point_number,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        path5: item?.path5,
        tripx: item?.tripx,
        // sukses: item?.sukses,
        // gagal: item?.gagal,
        performance: item?.avability
       
  
      });
    });
    return dataTableValue;
  }

  const [filterValues, setFilterValues] = useState<any>({
    datum_range_after: moment().subtract(1, "day").format("YYYY-MM-DD") ,
    datum_range_before: moment().format("YYYY-MM-DD") ,
        
        });

    const handleFilterChange = (newFilterValues: any) => {
        setFilterValues(newFilterValues);

        };

  const handleCheckedRows = (data: any) => {
    return data;
  }
 
  useEffect(() => {
    const tabs = document.getElementById('tabs');
    if (tabs) {
      (window as any).jqwidgets.createInstance(tabs, 'jqxTabs', { theme: "light", reorder: true });
    }

  }, []);


  return (
    <>
          <CardWidget title='FILTER'>
            <Filter onFilterChange={handleFilterChange} />
            </CardWidget>
      <div style={{ marginTop: '20px' }}></div>
        <div id="tabs">
          <ul style={{ marginLeft: 10 }} key="1">
            <li><i className="fa-solid fa-server"></i> Trip</li>
          </ul>
        <div key="2">
          <TableDataJqxGridNew
            
            //TABLE DATA
            path={API_PATH().fasop.kinerja.trip}
            filterParams={{...filterValues}}
            dataFieldsColsConfig={SCADATEL_KINERJA_TRIP_BULAN_COLUMN_JQX()}
            primaryKey={'id_pointtype'}
            respDataApi={handleRespDataApi}
            filterable={true}
            onRowSelected={handleCheckedRows}
            exportbtn={true}
          />
        </div>

      </div>
    </>
  );
}