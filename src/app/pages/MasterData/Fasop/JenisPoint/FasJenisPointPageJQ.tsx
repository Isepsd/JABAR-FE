import React, { useState, useRef, useCallback, useMemo } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
// import BadgeStatus from "@app/components/Status/BadgeStatus";
// import { Form } from 'react-bootstrap';
/** CONFIG */
import { JENIS_POINT_COLUMNS_JQ } from '@app/configs/react-table/master-fasop.columns.config';
import ModalForm from '@app/components/Modals/ModalForm';
/** COMPONENTS */
import TableJqxTreeGrid from '@app/modules/Table/TableJqxTreeGrid';
import FasJenisPointDetailPage from './FasJenisPointDetailPageJQ';
import { Card, Col, Row } from 'react-bootstrap';
import { IFasopPointType } from '@app/interface/fasop-pointtype.interface';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import FasJenisPointFormPage from './JenisPointForm';

export default function FasJenisPointPageJQ() {
    let roleAccess = ROLE_ACCESS("jenis-point");
    const roleActions = {
        view: ROLE_ACTION(roleAccess, 'view'),
        create: ROLE_ACTION(roleAccess, 'create'),
        update: ROLE_ACTION(roleAccess, 'update'),
        delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    const dataSelected = useRef<any>();

    const [details, setDetails] = useState<any>();
    const [modal, setModal] = useState<any>({
        approved: false,
        size: 'lg',
        title: `Jenis Point`,
    });
    const [expandedNodes, setExpandedNodes] = useState<string[]>(() => {
        // Load expanded nodes from localStorage
        const storedNodes = localStorage.getItem('expandedRows');
        return storedNodes ? JSON.parse(storedNodes) : [];
    });

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = useMemo(() => (data: any, level = 0) => {
        const mapData = (data: any, level = 0) => {
            return data?.map((item: IFasopPointType) => ({
                key: (item as any)?.key,
                id_pointtype: item.id_pointtype,
                no_urut: item.no_urut,
                name: item.name,
                jenis_point: item.jenispoint,
                disabled: item?.id_induk_pointtype == null,
                group_telegram: item?.telegram_group?.nama,
                status: item?.status,
                kirim_telegram: item?.send_telegram,
                child_pointtype: mapData(item?.child_pointtype, level + 1),
            })) || [];
        };

        return mapData(data, level);
    }, []);

    // Handle expand/collapse
    const handleExpandCollapse = useCallback((rowId: string) => {
        if (!rowId) {
            console.error('rowId is not available');
            return;
        }
        setExpandedNodes(prevState => {
            const newExpandedNodes = prevState.includes(rowId)
                ? prevState.filter(id => id !== rowId) // Collapse
                : [...prevState, rowId]; // Expand

            // Save to localStorage
            localStorage.setItem('expandedRows', JSON.stringify(newExpandedNodes));
            return newExpandedNodes;
        });
    }, []);

    const handleExpand = (event: any) => {
        const rowId = event?.args?.rowId;
        handleExpandCollapse(rowId);
    };

    const handleCollapse = (event: any) => {
        const rowId = event?.args?.rowId;
        handleExpandCollapse(rowId);
    };

    const handleEdit = (item: any) => {
        dataSelected.current = item;
    };

    const handleAddClick = () => {
        dataSelected.current = undefined;
        setModal((prevState: any) => ({
            ...prevState,
            show: true,
        }));
    };

    const handleRowSelected = (event: any) => {
        // Mengambil data baris yang dipilih
        const selectedRow = event?.data;

        // Menyimpan data yang dipilih
        dataSelected.current = selectedRow;

        // Mengatur detail berdasarkan id_pointtype
        const idPointType = selectedRow?.id_pointtype;
        setDetails(idPointType);
    };

    return (
        <>
            {roleActions.create && roleActions.update && roleActions.delete &&
                <JqxTabs theme="light">
                    <ul style={{ marginLeft: 10 }} key="1">
                        <li><i className="fa-solid fa-server"></i> Jenis Point</li>
                    </ul>
                    <div key="2">
                        <TableJqxTreeGrid
                            //AKSI 
                            addbtn={roleActions.create}
                            onClickAdd={handleAddClick}
                            updatebtn={roleActions.update}
                            onClickUpdate={handleEdit}
                            // deletebtn={roleActions.delete}
                            // selectionmode={"checkbox"} // Ensure correct mode is set
                            //TABLE DATA
                            path={API_PATH().master.fasop.point_type + '-tree'}
                            filterParams={{ page: 1 }}
                            dataFieldsColsConfig={JENIS_POINT_COLUMNS_JQ()}
                            primaryKey={'id_pointtype'}
                            respDataApi={handleRespDataApi}
                            hierarchy={{ root: 'child_pointtype' }}
                            onRowSelected={handleRowSelected} // Make sure this is called
                            exportbtn={true}
                            // expandedRows={expandedNodes} // Pass expanded nodes
                            // onRowExpand={handleExpand} // Track expansion
                            // onRowCollapse={handleCollapse} // Track collapse
                        />
                        <hr className='my-4' />
                        <Row>
                            <Col md={12} className='mb-4'>
                                <Card className='card-widget'>
                                    <Card.Header>Detail Jenis Point {dataSelected?.current?.name}</Card.Header>
                                    <FasJenisPointDetailPage filterParams={{ id_pointtype: details ? details : null }} />
                                </Card>
                            </Col>
                        </Row>
                        <ModalForm modalProps={modal}>
                            <FasJenisPointFormPage />
                        </ModalForm>
                    </div>
                </JqxTabs>
            }
        </>
    );
}
