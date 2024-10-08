import React, { useState, useRef } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { SCADATEL_STATUS_TELEMETERING_5m_COLUMN_JQX } from '@app/configs/react-table/fasop/spectrum-realtime.column'

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import StatTelemeteringDetailPage from './StatTelemeteringDetailPage';

import Filter from './FilterJQ';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function HisTelemetring5MPageJQ() {
    let roleAccess = ROLE_ACCESS("telemetering-5mnt");
    const roleActions = {
        view: ROLE_ACTION(roleAccess, 'view'),
        create: ROLE_ACTION(roleAccess, 'create'),
        update: ROLE_ACTION(roleAccess, 'update'),
        delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    const dataSelected = useRef<any>();
    const [detailspoint_number, setDetailspoint_number] = useState<any>();


    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                number: item?.number,
                point_number: item.point_number,
                path1: item.path1,
                path2: item.path2,
                path3: item.path3,
                path4: item.path4,
                path5: item.path5,
                tanggal: item.datum,
                value: item?.value,
            });
        });
        return dataTableValue;
    }

    const handleRowSelected = (data: any) => {
        dataSelected.current = data.current;
        setDetailspoint_number(dataSelected?.current?.point_number);
       
    }

    const [filterValues, setFilterValues] = useState<any>({
        // path1: '',
        // path2: '',
        // path3: '',
        // path4: '',
    
    });
//npm install smart-webcomponents-react --force
const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);

    };
    return (
        <>
         <Filter onFilterChange={handleFilterChange} />
            {roleActions.create && roleActions.update && roleActions.delete &&
                <JqxTabs theme={"light"}>
                    <ul style={{ marginLeft: 10 }} key="1">
                        <li><i className="fa-solid fa-server"></i> Telemetring</li>
                        {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
                    </ul>
                    <div key="2">
                        <TableDataJqxGridNew
                            //AKSI 
                            // addbtn={roleActions.create}
                            // updatebtn={roleActions.update}
                            // deletebtn={roleActions.delete}

                            //TABLE DATA
                            path={API_PATH().master.fasop.c_point}
                            filterParams={{ point_type:'A',sort_by:'path1',...filterValues }}
                            dataFieldsColsConfig={SCADATEL_STATUS_TELEMETERING_5m_COLUMN_JQX()}
                            primaryKey={'id'}
                            respDataApi={handleRespDataApi}
                            filterable={true}
                            onRowSelected={handleRowSelected}
                            exportbtn={true}
                        />
                    </div>
                </JqxTabs>
            }

            <hr className='my-4' />

            {/* <Row>
                <Col md={12} className='mb-4'>
                    <Card className='card-widget'>
                        <Card.Header > Detail Kontak Group {dataSelected?.current?.nama}</Card.Header> */}
                        <StatTelemeteringDetailPage filterParams={{ point_number: detailspoint_number,  }} />

                    {/* </Card>
                </Col>
            </Row> */}

        </>
    );
}
