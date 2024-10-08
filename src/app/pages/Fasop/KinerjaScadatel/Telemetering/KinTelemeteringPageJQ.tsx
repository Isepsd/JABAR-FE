import React, { useState, useRef } from 'react';

/** CONFIG */
import { SCADATEL_KINERJA_TELEMETERING_BULAN_COLUMN_JQX } from "@app/configs/react-table/fasop/scadatel-column";

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
// import KinTelemeteringDetailPage from './KinTelemeteringDetailPage';
import { Card, Col, Row } from 'react-bootstrap';
import KinTelemeteringDetailPage from './KinTelemeteringDetailPage';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import Filter from "./Filter";
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import moment from 'moment';
import CardWidget from '@app/components/Card/CardWidget';
export default function KinTelemeteringPageJQ() {
    const dataSelected = useRef<any>();
    const [detailspath1, setDetailspath1] = useState<any>();
    const [detailspath2, setDetailspath2] = useState<any>();
    const [detailspath3, setDetailspath3] = useState<any>();
    const [detailspath4, setDetailspath4] = useState<any>();
    const [detailspath5, setDetailspath5] = useState<any>();
    const [detailspoint_number, setDetailspoint_number] = useState<any>();
    const [detailsnama_pointtype, setDetailsnama_pointtype] = useState<any>();

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
    });
   

    const handleFilterChange = (newFilterValues: any) => {
        setFilterValues(newFilterValues);
    };

   
    const handleRowSelected = (data: any) => {
        dataSelected.current = data.current;
        setDetailspath1(dataSelected?.current.path1);
        setDetailspath2(dataSelected?.current.path2);
        setDetailspath3(dataSelected?.current.path3);
        setDetailspath4(dataSelected?.current.path4);
        setDetailspath5(dataSelected?.current.path5);
        setDetailspoint_number(dataSelected?.current.point_number);
        setDetailsnama_pointtype(dataSelected?.current.nama_pointtype);
    }

    return (
        <>
            <CardWidget title='FILTER'>
            <Filter onFilterChange={handleFilterChange} />
            </CardWidget>
            <div style={{ margin: '20px' }}>
                <JqxTabs theme={"light"}>
                    <ul style={{ marginLeft: 10 }} key="1">
                        <li><i className="fa-solid fa-server"></i> Telemetering</li>
                    </ul>
                    <div key="2">
                        <TableDataJqxGridNew
                            //TABLE DATA
                            path={API_PATH().fasop.kinerja.analog}
                            filterParams={{ rekap_kinerja: 1,
                                id_induk_pointtype: '798be05c-4df2-4945-9a47-5745a0de66c6',...filterValues}}
                            dataFieldsColsConfig={SCADATEL_KINERJA_TELEMETERING_BULAN_COLUMN_JQX()}
                            primaryKey={'id_scd_statusgardu'}
                            respDataApi={handleRespDataApi}
                            filterable={true}
                            onRowSelected={handleRowSelected}
                            exportbtn={true}
                        />
                        <hr className='my-4' />
                        <Row>
                            <Col md={12} className='mb-4'>
                                <Card className='card-widget'>
                                    <Card.Header> Detail Telemetering {dataSelected?.current?.path1}</Card.Header>
                                    <KinTelemeteringDetailPage 
                                        filterParams={{ path1: detailspath1 ? detailspath1 : null, path2: detailspath2, path3: detailspath3, path4: detailspath4, path5: detailspath5, point_number: detailspoint_number, nama_pointtype: detailsnama_pointtype }} 
                                        filterValues={filterValues} 
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </JqxTabs>
            </div>
        </>
    );
}
