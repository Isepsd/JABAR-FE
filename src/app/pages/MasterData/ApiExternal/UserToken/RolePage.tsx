import React, { useState, useRef } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { MASTER_DATA_TOKEN_JQX } from '@app/configs/react-table/master-opsisdis.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import RoleDetailPage from './RoleDetailPage';
import { Card, Col, Row } from 'react-bootstrap';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import moment from 'moment';

export default function RolePage() {
    let roleAccess = ROLE_ACCESS("user-token");
    const roleActions = {
        view: ROLE_ACTION(roleAccess, 'view'),
        create: ROLE_ACTION(roleAccess, 'create'),
        update: ROLE_ACTION(roleAccess, 'update'),
        delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    const dataSelected = useRef<any>();
    const [details, setDetails] = useState<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id_token: item?.id_token,
                number : item?.number,
                nama: item?.nama,
                token:item?.token,
                user_token:item?.user?.fullname,
                tanggal_buat: item.created_at ? moment(item.created_at).format("DD-MM-YYYY HH:mm") : '-',
            });
        });
        return dataTableValue;
    }

    const handleRowSelected = (data: any) => {
        dataSelected.current = data.current;
        setDetails(dataSelected?.current?.id_token);
    }


    return (
        <>
        {roleActions.create && roleActions.update && roleActions.delete &&
            <JqxTabs theme="light">
                <ul style={{ marginLeft: 10 }} key="1">
                    <li><i className="fa-solid fa-server"></i> User Akses Token</li>
                </ul>
                <div key="2">
                    <TableDataJqxGridNew
                        // AKSI 
                        addbtn={roleActions.create}
                        updatebtn={roleActions.update}
                        deletebtn={roleActions.delete}

                        // TABLE DATA
                        path={API_PATH().master.external.usertoken}
                        filterParams={{}}
                        dataFieldsColsConfig={MASTER_DATA_TOKEN_JQX()}
                        primaryKey={'id_token'}
                        respDataApi={handleRespDataApi}
                        filterable={true}
                        onRowSelected={handleRowSelected}
                        exportbtn={true}
                    />
                    <hr className='my-4' />
                    <Row>
                        <Col md={12} className='mb-4'>
                            <Card className='card-widget'>
                                <Card.Header> Detail Nama Token {dataSelected?.current?.nama}</Card.Header>
                                <RoleDetailPage filterParams={{ id_token: details ? details : null }} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </JqxTabs>
            }
        </>
    );
}