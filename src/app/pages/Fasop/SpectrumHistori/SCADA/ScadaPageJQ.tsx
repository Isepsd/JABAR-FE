import React, { useState ,useEffect} from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { KINERJA_SCADA_HIST_COLUMNS_JQX } from '@app/configs/react-table/fasop/spectrum-history.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';
import TableDataListAction from "@app/modules/Table/TableDataListAction";

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import Filter from './Filter';
import { timeFormat } from '@app/helper/time.helper';
import moment from 'moment';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
export default function ScadaPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});
  const [columns, setColumns] = useState<any>(
    KINERJA_SCADA_HIST_COLUMNS_JQX()
  );
  const source = axios.CancelToken.source();
  const [scada, setScada] = useState<any>([]);
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id_pointtype: item?.id_pointtype,
        number: item?.number,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        path5: item?.path5,
        datum_1: item?.datum_1 ? timeFormat(item.datum_1, "DD-MM-YYYY HH:mm:ss") : "-",
        status_1: item?.status_1,
        datum_2: item?.datum_2 ? timeFormat(item.datum_2, "DD-MM-YYYY HH:mm:ss") : "-",
        status_2: item?.status_2,
        durasi: item?.durasi,
        keterangan: item?.kesimpulan
      });
    });
    return dataTableValue;
  }


  const [filterValues, setFilterValues] = useState<any>({
    tanggal_akhir: moment().format('YYYY-MM-DD'),
    tanggal_mulai: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    id_induk_pointtype: null, jenispoint: null,
    path1: '',
    path2: '',
    path3: '',
    path4: '',
    path5: '',
    id_pointtype: null,
    id_unit: null,
    kesimpulan: ''
  
});
  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
};


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

useEffect(() => {
  getAllData()
  return () => {
    source.cancel()
  }
}, [])
  const handleCheckedRows = (data: any) => {
    return data;
  }
  // const handleCheckedRows2 = (data: any) => {
  //     return data;
  // }

  // Initialize jqxTabs

  
  return (
    <>
     <TableDataListAction
            add={false}
            columns={columns}
            filterLayout="card"
            setColumns={setColumns}
          >
          <Filter optionsScada={scada}  onFilterChange={handleFilterChange}/>
          </TableDataListAction>
        <JqxTabs theme='light'>
        <ul style={{ marginLeft: 10 }} key="1">
          <li><i className="fa-solid fa-server"></i> Histori Gangguan Peralatan SCADA</li>
          {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
        </ul>
        <div key="2">
          <TableDataJqxGridNew
            //TABLE DATA
            path={API_PATH().fasop.laporan_scada.histori_peralatan_scada}
            filterParams={{ sort_by: "tanggal_akhir,tanggal_mulai,id_induk_pointtype,jenispoint", ...filterValues }}
            dataFieldsColsConfig={KINERJA_SCADA_HIST_COLUMNS_JQX()}
            primaryKey={'id_pointtype'}
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