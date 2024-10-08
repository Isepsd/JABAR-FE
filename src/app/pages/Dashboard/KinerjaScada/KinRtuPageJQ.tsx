import React, { useEffect, useState ,useRef} from 'react';

/** CONFIG */
import { SCADATEL_KINERJA_RTU_BULAN_COLUMN_JQX } from "@app/configs/react-table/fasop/scadatel-column";

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';


/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import Filter from './Filter';
import moment from 'moment';

export default function KinRtuPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});
  const dataSelected = useRef<any>();

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
        poin: item?.poin,
        durasi_alltime: item?.durasi_alltime,
        durasi_uptime: item?.durasi_uptime,
        durasi_downtime: item?.durasi_downtime,
        avability: item?.avability,
        kinerja: 1
  
      });
    });
    return dataTableValue;
  }

  const [filterValues, setFilterValues] = useState<any>({
    datum_range_after: moment().subtract(1, "day").format("YYYY-MM-DD") ,
    datum_range_before: moment().format("YYYY-MM-DD") ,
          path1: "",
          path2: "",
          path3: "",
          path4: "",
  
});
  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
};

  const handleCheckedRows = (data: any) => {
    dataSelected.current = data.current;
   
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
    
            <Filter onFilterChange={handleFilterChange} />
            <div style={{ margin: '20px' }}>
      <div id="tabs">
        <ul style={{ marginLeft: 10 }} key="1">
        
        <li><i className="fa-solid fa-server"></i> RTU</li>
          {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
        </ul>
       
        <div key="2">
          <TableDataJqxGridNew
            
            //TABLE DATA
            path={API_PATH().fasop.kinerja.digital}
            filterParams={{rekap_kinerja:1, id_induk_pointtype: '3d391819-4288-4699-80f4-7ebd5ae0d733',...filterValues }}
            dataFieldsColsConfig={SCADATEL_KINERJA_RTU_BULAN_COLUMN_JQX()}
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