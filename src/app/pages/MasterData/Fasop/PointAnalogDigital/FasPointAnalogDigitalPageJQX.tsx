import React, { useEffect, useState, useRef } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { POINT_ANALOG_DIGITAL_COLUMN_JQX, } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import { Form } from 'react-bootstrap';

import ModalForm from '@app/components/Modals/ModalForm';
import CpointUpload from './CpointUpload';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { timeFormatAlt } from '@app/helper/time.helper';


export default function ConfigsPage() {
    const [roleActions, setRoleActions] = useState<any>({});
    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                ...item,
                trans_id_kinerja: item?.trans_id_kinerja,
                number: item?.number,
                id: item?.point_number,
                jenis_point: item?.pointtype?.name || '-',
                point_number: item?.point_number,
                point_name: item?.point_name,
                point_text: item?.point_text || '-',
                tipe_point: item?.point_type,
                kinerja: item?.kinerja,
                send_telegram: (<div className='position-relative text-center w-100'><Form.Check defaultChecked={!!item?.send_telegram} disabled /></div>),
                capture_telemetring: (<div className='position-relative text-center w-100'><Form.Check defaultChecked={!!item?.capture_telemetring} disabled /></div>),
                b1: item?.path1,
                b2: item?.path2,
                b3: item?.path3,
                path4: item?.path4,
                path5: item?.path5,
                value: item?.value,
                last_update: timeFormatAlt(item?.last_update),
            });
        });
        return dataTableValue;
    }

    const handleCheckedRows = (data: any) => {
        dataSelected.current = data;
    }

    /** MODAL JENIS POINT */
    const [modal, setModal] = useState<any>({
        approved: false,
        size: 'md',
        title: `Form Upload Data Update CPoint`,
    });

    /** EDIT HANDLING */

    const handleAddClick = () => {
        dataSelected.current = undefined;
        setModal((prevState: any) => ({
            ...prevState,
            show: true,
        }));
    };

    // Initialize jqxTabs
    useEffect(() => {
        let roleAccess = ROLE_ACCESS("point-analog-digital");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, 'view'),
            create: ROLE_ACTION(roleAccess, 'create'),
            update: ROLE_ACTION(roleAccess, 'update'),
            delete: ROLE_ACTION(roleAccess, 'delete'),
            upload: ROLE_ACTION(roleAccess, 'upload'),
        };
        setRoleActions(roleAct);
    }, []);


    return (
        <> 
           {roleActions.create && roleActions.update && roleActions.delete &&
            <JqxTabs theme="light">
                <ul style={{ marginLeft: 10 }} key="1">
                    <li><i className="fa-solid fa-server"></i> Perangkat SCADA</li>
                </ul>
                <div key="2">
            <TableDataJqxGridNew
                //AKSI 
                // addbtn={roleActions.create}
                uploadbtn={roleActions.upload}
                onClickUpload={handleAddClick}
                // updatebtn={roleActions.update}
                // onClickUpdate={handleEdit}
                // deletebtn={roleActions.delete}

                //TABLE DATA
                path={API_PATH().master.fasop.c_point}
                filterParams={{}}
                dataFieldsColsConfig={POINT_ANALOG_DIGITAL_COLUMN_JQX()}
                primaryKey={'trans_id_kinerja'}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleCheckedRows}
                exportbtn={true}
            />
            <ModalForm modalProps={modal}> <CpointUpload /> </ModalForm>

            </div>
        </JqxTabs>
        }
        </>
    );
}
