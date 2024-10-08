import React, { useState ,useEffect} from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';


/** CONFIG */
import { KIN_SCADA_COLUMNS_JQX } from '@app/configs/react-table/fasop/spectrum-kinerja.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';


/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import Filter from './Filter';
import axios from 'axios';
import { getAllByPath } from '@app/services/main.service';
import moment from 'moment';
export default function KinerjaScadaPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});

  const [scada, setScada] = useState<any>([]);

  const source = axios.CancelToken.source();
   /** GET DATA unit pembangkit */
   const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        is_induk: 'INDUK',
      };


      const req: any = await getAllByPath(API_PATH().master.fasop.point_type_get, params, source.token);

      const { results } = req;
      let unit: any = []
      results?.map((item: any) => {
        unit.push({
          label: item?.name,
          value: item?.id_pointtype,
          jenis: item?.jenispoint
        })
      })
      
      setScada(unit)
    } catch (err: any) {
      setScada(null)
     
    }
  };
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id_kin_scd: item?.id_kin_scd,
        number: item?.number,
        kelompok: item.kelompok,
        path1text: item?.path1text,
        path2text: item?.path2text,
        path3text: item?.path3text,
        path4text: item?.path4text,
        path5text: item?.path5text,
        avability: item?.avability
      });
    });
    return dataTableValue;
  }

  const [filterValues, setFilterValues] = useState<any>({
    id_induk_pointtype: '',
    harian: moment().format('YYYY-MM-DD'),
    bulanan: undefined,
    path1text: "",
    path3text: "",
  
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


  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
    
         <Filter optionsScada={scada} onFilterChange={handleFilterChange} />
        
      <JqxTabs theme='light'>
        <ul style={{ marginLeft: 10 }} key="1">
          <li><i className="fa-solid fa-server"></i> Ketersediaan Peralatan SCADA</li>
          {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
        </ul>
        <div key="2">
          <TableDataJqxGridNew

            //TABLE DATA
            path={API_PATH().fasop.laporan_scada.kinerja_peralatan_scada}
            filterParams={{ sort_by: "id_induk_pointtype", ...filterValues }}
            dataFieldsColsConfig={KIN_SCADA_COLUMNS_JQX()}
            primaryKey={'point_number'}
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