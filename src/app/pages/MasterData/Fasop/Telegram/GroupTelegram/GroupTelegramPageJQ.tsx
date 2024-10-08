import React, { useEffect, useState, useRef } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { TELEGRAM_GROUP_COLUMNS_JQX, } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

// import BadgeStatusJQ from '@app/components/Status/BadgeStatusJQ';
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
                number: item.number,
                nama: item.nama,
                id_chat: item.id_chat,
                bot_name: item?.telegram_bot?.bot_name,
                status: item?.status
            });
        });
        return dataTableValue;
    }

    const handleCheckedRows = (data: any) => {
        dataSelected.current = data;
    }

    /** MODAL JENIS POINT */


    // /** EDIT HANDLING */
    // const handleEdit = (item: any) => {
    //     dataSelected.current = item;
    // };

    // const handleAddClick = () => {
    //     dataSelected.current = undefined;

    // };

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
                        <li><i className="fa-solid fa-server"></i> Group Telegram</li>
                    </ul>
                <div key="2">
                <TableDataJqxGridNew
                    //AKSI 
                    // addbtn={roleActions?.create}
                    editable={roleActions?.update} // Edit on table
                    addbtn={roleActions.create}
                    // onClickAdd={handleAddClick}
                    updatebtn={roleActions.update}
                    // onClickUpdate={handleEdit}
                    deletebtn={roleActions.delete}


                    //TABLE DATA
                    path={API_PATH().master.fasop.telegram_group}
                    filterParams={{}}
                    dataFieldsColsConfig={TELEGRAM_GROUP_COLUMNS_JQX()}
                    primaryKey={'id_telegram_group'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleCheckedRows}
                    exportbtn={true}
                />
            </div>
            </JqxTabs>
         }
        </>
    );
}
