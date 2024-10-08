import React, { useEffect, useState } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { MASTER_MODULE_API_COLUMN_JQX } from '@app/configs/react-table/master-opsisdis.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

export default function ModuleAPIJQ() {
    const [roleActions, setRoleActions] = useState<any>({});

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id_module:item?.id_module,
                number: item?.number,
                nama: item?.nama,
                // tanggal_buat: item?.ext_user_token.tanggal_buat
                
                
            });
        });
        return dataTableValue;
    }



    const handleCheckedRows = (data: any) => {
        return data;
    }

    useEffect(() => {
        let roleAccess = ROLE_ACCESS("module-api");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, 'view'),
            create: ROLE_ACTION(roleAccess, 'create'),
            update: ROLE_ACTION(roleAccess, 'update'),
            delete: ROLE_ACTION(roleAccess, 'delete'),
        };
        setRoleActions(roleAct);
        console.log('roleAct', roleAct);

    }, []);


    return (
        <>
        {roleActions.create && roleActions.update && roleActions.delete &&
            <JqxTabs theme="light">
                <ul style={{ marginLeft: 10 }} key="1">
                    <li><i className="fa-solid fa-server"></i> Module API</li>
                </ul>
                <div key="2">
                    <TableDataJqxGridNew
                        //AKSI 
                        // addbtn={roleActions?.create}
                        editable={roleActions?.update} // Edit on table
                        addbtn={roleActions.create}
                        updatebtn={roleActions.update}
                        deletebtn={roleActions.delete}


                        //TABLE DATA
                        path={API_PATH().master.external.extmodule}
                        filterParams={{}}
                        dataFieldsColsConfig={MASTER_MODULE_API_COLUMN_JQX()}
                        primaryKey={'id_module'}
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
