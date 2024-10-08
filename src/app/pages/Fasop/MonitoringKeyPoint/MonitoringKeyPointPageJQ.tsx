import React, { useState, useRef } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
// import TableDataListAction from "@app/modules/Table/TableDataListAction";

/** CONFIG */
import { MONITORING_KEY_POINT_COLUMN_JQX } from "@app/configs/react-table/fasop/monitoring-key-point.column ";

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
// import KinTelemeteringDetailPage from './KinTelemeteringDetailPage';
import { Card, Col, Row } from 'react-bootstrap';
import MonitoringKeyPointDetailPage from './MonitoringKeyPointDetailPage';
import Filter from "./Filter";

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';


export default function MonitoringKeyPointPageJQ() {

    const dataSelected = useRef<any>();
    const [details, setDetails] = useState<any>();
    // const [columns, setColumns] = useState<any>({});
    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                point_number: item?.point_number,
                number: item?.number,
                path1: item?.path1,
                path3: item?.path3,
                value: item?.value,
                path1text: item?.path1text,
                path2text: item?.path2text,
                path3text: item?.path3text
            });
        });
        return dataTableValue;
    }

    const handleRowSelected = (data: any) => {
        dataSelected.current = data.current;
        setDetails(dataSelected?.current);
    }

    const [filterValues, setFilterValues] = useState<any>({
        path1text: '',
        path2text: '',
        path3text: '',
    });

    const handleFilterChange = (newFilterValues: any) => {
        setFilterValues(newFilterValues);
    };
    

    return (
        <>
        {/* <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        filterLayout='card'
        >
        
        </TableDataListAction> */}
        <Filter onFilterChange={handleFilterChange} />
            <JqxTabs theme="light">
             <ul style={{ marginLeft: 10 }} key="1">
                 <li><i className="fa-solid fa-server"></i> Monitoring Keypoint</li>
             </ul>
              <div key="2">
              <TableDataJqxGridNew
                  path={API_PATH().fasop.laporan_scada.monitoring_keypoint}
                  filterParams={{ sort_by: "path1,path2,path3", ...filterValues }}
                  dataFieldsColsConfig={MONITORING_KEY_POINT_COLUMN_JQX()}
                  primaryKey="point_number"
                  respDataApi={handleRespDataApi}
                  filterable={true}
                  onRowSelected={handleRowSelected}
                  exportbtn={true}
              />
               <hr className="my-4" />
                <Row>
                    <Col md={12} className="mb-4">
                        <Card className="card-widget">
                            <Card.Header> Detail Monitoring Keypoint {dataSelected.current?.path3}</Card.Header>
                           <MonitoringKeyPointDetailPage filterParams={ details } />
                        </Card>
                    </Col>
                </Row>
          </div>
      </JqxTabs>
    </>
  );
}