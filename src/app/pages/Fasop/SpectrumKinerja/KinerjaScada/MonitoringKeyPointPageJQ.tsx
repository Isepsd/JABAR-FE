import React, { useState, useRef,useEffect } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
// import TableDataListAction from "@app/modules/Table/TableDataListAction";

/** CONFIG */
import { KIN_SCADA_COLUMNS_JQX } from '@app/configs/react-table/fasop/spectrum-kinerja.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
// import KinTelemeteringDetailPage from './KinTelemeteringDetailPage';
import { Card, Col, Row } from 'react-bootstrap';
import MonitoringKeyPointDetailPage from './MonitoringKeyPointDetailPage';
import Filter from "./Filter";
import axios from 'axios';
import { getAllByPath } from '@app/services/main.service';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import moment from 'moment';

export default function MonitoringKeyPointPageJQ() {

    const dataSelected = useRef<any>();
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
    const [details, setDetails] = useState<any>();
    // const [columns, setColumns] = useState<any>({});
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
        avability: item?.avability,
        point_number:item?.point_number
            });
        });
        return dataTableValue;
    }

    const handleRowSelected = (data: any) => {
        dataSelected.current = data.current;
        setDetails(dataSelected?.current);
    }

    const [filterValues, setFilterValues] = useState<any>({
        harian: moment().subtract(1, 'days').format('YYYY-MM-DD'), // Change made here
        bulanan: undefined,
        thn_bln: moment().format('YYYY-MM'),
        datum: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        path1text: "",
        path2text: "",
        path3text: "",
        path4text: "",
        path5text: "",
        id_induk_pointtype: null, 
        jenispoint: null,
        id_pointtype: null,
        id_unit: null,
    });

    const handleFilterChange = (newFilterValues: any) => {
        setFilterValues(newFilterValues);
    };
    useEffect(() => {
        getAllData()
      }, [])
    

    return (
        <>
        {/* <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        filterLayout='card'
        >
        
        </TableDataListAction> */}
      <Filter optionsScada={scada} onFilterChange={handleFilterChange} />
            <JqxTabs theme="light">
             <ul style={{ marginLeft: 10 }} key="1">
                 <li><i className="fa-solid fa-server"></i> Monitoring Keypoint</li>
             </ul>
              <div key="2">
              <TableDataJqxGridNew
                path={API_PATH().fasop.laporan_scada.kinerja_peralatan_scada}
                  filterParams={{sort_by: 'path1text,path2text,path3text', ...filterValues }}
                  dataFieldsColsConfig={KIN_SCADA_COLUMNS_JQX()}
                  primaryKey="point_number"
                  respDataApi={handleRespDataApi}
                  filterable={true}
                  onRowSelected={handleRowSelected}
                  exportbtn={true}
                //   pagingPresistance={false}
              />
               <hr className="my-4" />
                <Row>
                    <Col md={12} className="mb-4">
                        <Card className="card-widget">
                            <Card.Header> Detail Monitoring Keypoint {dataSelected.current?.point_number}</Card.Header>
                           <MonitoringKeyPointDetailPage filterParams={ details } />
                        </Card>
                    </Col>
                </Row>
          </div>
      </JqxTabs>
    </>
  );
}