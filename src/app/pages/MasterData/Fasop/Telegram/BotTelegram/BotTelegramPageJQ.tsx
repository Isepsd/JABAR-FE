import React, { useEffect, useState, useRef } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { TELEGRAM_BOT_COLUMNS_JQX, } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

// import BadgeStatusJQ from '@app/components/Status/BadgeStatusJQ';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';


export default function BotTelegramPageJQ() {
    const [roleActions, setRoleActions] = useState<any>({});
    const dataSelected = useRef<any>();
    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id_telegram_bot: item?.id_telegram_bot,
                number: item.number,
                nama: item.nama,
                chat_code: item.chat_code,
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
        let roleAccess = ROLE_ACCESS("bot-telegram");
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
                        <li><i className="fa-solid fa-server"></i> Bot Telegram</li>
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
                    path={API_PATH().master.fasop.telegram_bot}
                    filterParams={{}}
                    dataFieldsColsConfig={TELEGRAM_BOT_COLUMNS_JQX()}
                    primaryKey={'id_telegram_bot'}
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
