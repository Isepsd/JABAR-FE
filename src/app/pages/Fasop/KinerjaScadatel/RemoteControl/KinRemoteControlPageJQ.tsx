import React, { useEffect, useState,useRef } from 'react';

/** CONFIG */
import { SCADATEL_KINERJA_RC_BULAN_COLUMN_JQX } from "@app/configs/react-table/fasop/scadatel-column";
import KinRemoteControlDetailPage from "./KinRemoteControlDetailPage"
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

import { Card, Col, Row } from 'react-bootstrap';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import Filter from './Filter';
import moment from 'moment';
import CardWidget from '@app/components/Card/CardWidget';

export default function KinRemoteControlPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});
  const dataSelected = useRef<any>();
  const [detailspath1, setDetailspath1] = useState<any>();
  const [detailspath2, setDetailspath2] = useState<any>();
  const [detailspath3, setDetailspath3] = useState<any>();
  const [detailspath4, setDetailspath4] = useState<any>();
  const [detailspath5, setDetailspath5] = useState<any>();
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
        poin: item?.poin,
        sukses: item?.sukses,
        gagal: item?.gagal,
        performance: item?.avability,
        avability_rekon: item?.avability_rekon
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
    dataSelected.current = data.current;
    setDetailspath1(dataSelected?.current.path1);
    setDetailspath2(dataSelected?.current.path2);
    setDetailspath3(dataSelected?.current.path3);
    setDetailspath4(dataSelected?.current.path4);
    setDetailspath5(dataSelected?.current.path5);
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
          <CardWidget title='FILTER'>
            <Filter onFilterChange={handleFilterChange} />
            </CardWidget>
            <div style={{ margin: '20px' }}>
      <div id="tabs">
        <ul style={{ marginLeft: 10 }} key="1">
          <li><i className="fa-solid fa-server"></i> Remote Control</li>
          {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
        </ul>
        <div key="2">
          <TableDataJqxGridNew
            
            //TABLE DATA
            path={API_PATH().fasop.kinerja.rc}
            filterParams={{...filterValues}}
            dataFieldsColsConfig={SCADATEL_KINERJA_RC_BULAN_COLUMN_JQX()}
            primaryKey={'id'}
            respDataApi={handleRespDataApi}
            filterable={true}
            onRowSelected={handleCheckedRows}
            exportbtn={true}
          />
          
          <hr className='my-4' />

          <Row>
              <Col md={12} className='mb-4'>
                  <Card className='card-widget'>
                      <Card.Header > Detail Remote Control  {dataSelected?.current?.path3}</Card.Header>
                      <KinRemoteControlDetailPage 
                       filterParams={{ path1: detailspath1 ? detailspath1 : null,path2: detailspath2,path3: detailspath3,path4: detailspath4,path5: detailspath5}} 
                       filterValues={filterValues} />
                  </Card>
              </Col>
          </Row>
        </div>

      </div>
      </div>
    </>
  );
}