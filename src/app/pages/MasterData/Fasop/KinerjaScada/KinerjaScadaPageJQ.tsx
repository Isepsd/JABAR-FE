import React, { useEffect, useState, useRef } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { MONITORING_KINERJA_SCADA_COLUMN_JQX, } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

import ModalForm from '@app/components/Modals/ModalForm';
import KinerjaScadaForm from './KinerjaScadaForm';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';


export default function ConfigsPage() {
    const [roleActions, setRoleActions] = useState<any>({});
    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                number: item?.number,
                trans_id_kinerja: item?.trans_id_kinerja,
                tahun: item?.tahun,
                nama_pointtype: item?.nama_pointtype,
                t_01: item?.t_01,
                t_02: item?.t_02,
                t_03: item?.t_03,
                t_04: item?.t_04,
                t_05: item?.t_05,
                t_06: item?.t_06,
                t_07: item?.t_07,
                t_08: item?.t_08,
                t_09: item?.t_09,
                t_10: item?.t_10,
                t_11: item?.t_11,
                t_12: item?.t_12,
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
        size: 'lg',
        title: `Target Kinerja SCADA`,
    });

    /** EDIT HANDLING */
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

    // Initialize jqxTabs
    useEffect(() => {
        let roleAccess = ROLE_ACCESS("fasop-md-kinerja-scada");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, 'view'),
            create: ROLE_ACTION(roleAccess, 'create'),
            update: ROLE_ACTION(roleAccess, 'update'),
            delete: ROLE_ACTION(roleAccess, 'delete'),
        };
        setRoleActions(roleAct);
    }, []);


    return (
        <> 
           {roleActions.create && roleActions.update && roleActions.delete &&
            <JqxTabs theme="light">
                <ul style={{ marginLeft: 10 }} key="1">
                    <li><i className="fa-solid fa-server"></i> Kinerja SCADA</li>
                </ul>
                <div key="2">
            <TableDataJqxGridNew
                //AKSI 
                addbtn={roleActions.create}
                onClickAdd={handleAddClick}
                updatebtn={roleActions.update}
                onClickUpdate={handleEdit}
                deletebtn={roleActions.delete}

                //TABLE DATA
                path={API_PATH().master.fasop.kinerja_scada}
                filterParams={{}}
                dataFieldsColsConfig={MONITORING_KINERJA_SCADA_COLUMN_JQX()}
                primaryKey={'trans_id_kinerja'}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleCheckedRows}
                exportbtn={true}
            />
            <ModalForm modalProps={modal}> <KinerjaScadaForm /> </ModalForm>

            </div>
        </JqxTabs>
        }
        </>
    );
}
