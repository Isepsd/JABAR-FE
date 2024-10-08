import React, { useEffect, useState } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { SUBSISTEM_COLUMN_JQX, } from '@app/configs/react-table/master-jaringan.columns.config';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

export default function SubsistemPageJQX() {
    const [roleActions, setRoleActions] = useState<any>({});

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id_ref_lokasi: item?.id_ref_lokasi,
                number: item?.number,
                nama: item?.nama_lokasi,
                id_user: item?.id_user,
                path1: item?.path1,
                path2: item?.path2,
                path3: item?.path3,
                status_listrik: item?.status_listrik,
            });
        });
        return dataTableValue;
    }

    const handleCheckedRows = (data: any) => {
        return data;
    }

    useEffect(() => {
        let roleAccess = ROLE_ACCESS("subsistem");
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
                        <li><i className="fa-solid fa-server"></i> Subsistem</li>
                    </ul>
                    <div key="2">
                        <TableDataJqxGridNew
                            //AKSI 
                            // addbtn={roleActions?.create}
                            // editable={roleActions?.update} // Edit on table
                            addbtn={roleActions.create}
                            updatebtn={roleActions.update}
                            deletebtn={roleActions.delete}



                            //TABLE DATA
                            path={API_PATH().master.jaringan.ref_lokasi}
                            filterParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().subsistem, sort_by: '-tgl_update,id_ref_lokasi' }}
                            dataFieldsColsConfig={SUBSISTEM_COLUMN_JQX()}
                            primaryKey={'id_ref_lokasi'}
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
