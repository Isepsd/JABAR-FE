import React, { useEffect, useState } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { MASTER_DATA_PERUSAHAAN_COLUMN_JQX } from '@app/configs/react-table/master-data-adminksa.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

export default function PerusahaanJQ() {
    const [roleActions, setRoleActions] = useState<any>({});

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id_perusahaan:item?.id_perusahaan,
                number: item?.number,
                nama: item?.nama,
                nama_direktur: item?.nama_direktur,
                email: item?.email,
                no_hp: item?.no_hp,
                alamat_kantor: item?.alamat_kantor,


                
                
            });
        });
        return dataTableValue;
    }



    const handleCheckedRows = (data: any) => {
        return data;
    }

    useEffect(() => {
        let roleAccess = ROLE_ACCESS("perusahaan");
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
                    <li><i className="fa-solid fa-server"></i> Rekanan/Vendor</li>
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
                        path={API_PATH().master.admin_ksa.perusahaan}
                        filterParams={{}}
                        dataFieldsColsConfig={MASTER_DATA_PERUSAHAAN_COLUMN_JQX()}
                        primaryKey={'id_perusahaan'}
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
