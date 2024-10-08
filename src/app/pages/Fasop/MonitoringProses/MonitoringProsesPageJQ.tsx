import React, { useEffect, useRef } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
// import TableDataListAction from "@app/modules/Table/TableDataListAction";

/** CONFIG */
import { MONITORING_PROSES_COLUMN_JQX } from "@app/configs/react-table/fasop/monitoring-proses.column";

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';


export default function MonitoringProsesPageJQ() {
    const source = axios.CancelToken.source();
    const dataSelected=useRef<any>();
    /** MAP DATA FROM API RESPONSE */
      const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                number:item.number,
                name: item?.name,
                tgl_update_proses: item?.tgl_update_proses,
                status_data: item?.status_data,
                group_proses: item?.group_proses,
                expire_running: item?.expire_running,
                expire_satuan: item?.expire_satuan,
                keterangan: item?.keterangan,
            });
        });
        return dataTableValue;
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
            const params = {
              keyword: '', // Replace with your actual keyword
              page: 1,
              limit: 10,
            };
    
            const req: any = await getAllByPath(API_PATH().fasop.laporan_scada.monitoring_proses, params, source.token);
    
            const { results } = req;
            handleRespDataApi(results);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        const timer = setInterval(() => {
          fetchData();
        }, 30000); // Refresh every 5 seconds (5000 milliseconds)
    
        // Initial data fetch
        fetchData();
    
        return () => {
          source.cancel();
          clearInterval(timer);
        };
      }, []);
    
      const handleRowSelected = (data: any) => {
        dataSelected.current = data.current;
     
    }

    return (
        <>
        {/* <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        filterLayout='card'
        >
        </TableDataListAction> */}
            <JqxTabs theme="light">
             <ul style={{ marginLeft: 10 }} key="1">
                 <li><i className="fa-solid fa-server"></i> Monitoring Proses</li>
             </ul>
              <div key="2">
              <TableDataJqxGridNew
                  path={API_PATH().fasop.laporan_scada.monitoring_proses}
                  dataFieldsColsConfig={MONITORING_PROSES_COLUMN_JQX()}
                  primaryKey="id"
                  respDataApi={handleRespDataApi}
                  filterable={true}
                  exportbtn={true}
                  onRowSelected={handleRowSelected}
              />
             
          </div>
      </JqxTabs>
    </>
  );
}