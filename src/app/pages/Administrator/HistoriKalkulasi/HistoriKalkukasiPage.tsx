import React, { useEffect, useState } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */

import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';
import { HIS_KALKUKASI_COLUMNS_JQX } from "@app/configs/react-table.config";
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';


export default function JarGarduDistribusiJQ() {
    const [roleActions, setRoleActions] = useState<any>({});

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
              number:item?.number,
              id:item?.id,
              datum:item?.datum,
              name:item?.name,
              jenis:item?.jenis,
              mulai_kalkulasi:item?.mulai_kalkulasi,
              selesai_kalkulasi:item?.selesai_kalkulasi,
              status:item?.status
            });
        });
        return dataTableValue;
    }

    const handleCheckedRows = (data: any) => {
        return data;
    }
   
    useEffect(() => {

        let roleAccess = ROLE_ACCESS("gardu-distribusi");
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
                    <li><i className="fa-solid fa-server"></i> Gardu Distribusi</li>
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
                        path={API_PATH().admin.his_kalkulasi}
                        filterParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().gardu_distribusi, sort_by: '-id_ref_lokasi' }}
                        dataFieldsColsConfig={HIS_KALKUKASI_COLUMNS_JQX()}
                        primaryKey={'id'}
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
