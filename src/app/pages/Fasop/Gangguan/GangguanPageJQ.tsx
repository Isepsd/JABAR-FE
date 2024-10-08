import React, { useEffect, useState } from 'react';

/** CONFIG */
import { GANGGUAN_SAAT_INI_COLUMNS_JQX } from '@app/configs/react-table/fasop/gangguan-column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

import { Col, Row } from 'react-bootstrap';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import Filter from './Filter';
import axios from 'axios';
import PeralatanScada from '@app/modules/Fasop/PeralatanScada';
import { getAllByPath } from '@app/services/main.service';
export default function GangguanPageJQ() {

  const source = axios.CancelToken.source();
  const [scada, setScada] = useState<any>([]);
 
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
  // const [roleActions, setRoleActions] = useState<any>({});
 

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id_pointtype: item?.id_pointtype,
        number: item?.number,
        kelompok: item?.kelompok,
        jenis: item?.jenis,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        path5: item?.path5,
        tgl_gangguan: item?.tgl_gangguan,
        durasi: item?.durasi,
        id_induk_pointtype:item?.id_induk_pointtype
      });
    });
    return dataTableValue;
  }
  const [filterValues, setFilterValues] = useState<any>({
    id_induk_pointtype: '',
  
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

useEffect(() => {
    getAllData()
  
    
  }, [])
  return (
    <>
   
          <Row>
              <Col md={4}>
              <Filter optionsScada={scada} onFilterChange={handleFilterChange} />
              </Col>
              <Col md={8}>
                <PeralatanScada />
              </Col>
            </Row>
         
      <div id="tabs">
        <ul style={{ marginLeft: 10 }} key="1">
          <li><i className="fa-solid fa-server"></i> Gangguan Peralatan SCADA</li>
          {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
        </ul>
        <div key="2">
          <TableDataJqxGridNew

            //TABLE DATA
            path={API_PATH().fasop.laporan_scada.gangguan_peralatan_scada}
            filterParams={{ sort_by: "id_induk_pointtype", ...filterValues }}
            dataFieldsColsConfig={GANGGUAN_SAAT_INI_COLUMNS_JQX()}
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