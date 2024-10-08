import React, { useEffect, useState } from 'react';

/** CONFIG */
import { MONITORING_KEY_POINT_COLUMN_JQX,} from '@app/configs/react-table/admin.columns.config';

/** COMPONENTS */
import TableDataJqxGrid from './TableDataJqxGrid';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';


export default function ConfigsPage() {
    const [roleActions, setRoleActions] = useState<any>({});

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
            b1: item?.path1,
             b3: item?.path3,
             value:item?.value,
             status:item?.status,
            });
        });
        return dataTableValue;
    }

   

    const handleCheckedRows = (data: any) => {
        return data;
    }
    // const handleCheckedRows2 = (data: any) => {
    //     return data;
    // }

    // Initialize jqxTabs
    useEffect(() => {
        const tabs = document.getElementById('tabs');
        if (tabs) {
            (window as any).jqwidgets.createInstance(tabs, 'jqxTabs', { theme: "light", reorder: true });
        }

        let roleAccess = ROLE_ACCESS("config-app");
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
            <div id="tabs">
                <ul style={{ marginLeft: 10 }} key="1">
                    <li><i className="fa-solid fa-server"></i> Monitoring Keypoint</li>
                    {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
                </ul>
                <div key="2">
                    <TableDataJqxGrid
                        //AKSI 
                        // addbtn={roleActions?.create}
                        editable={roleActions?.update} // Edit on table


                        //TABLE DATA
                        path={API_PATH().fasop.laporan_scada.monitoring_keypoint}
                        filterParams={{}}
                        dataFieldsColsConfig={MONITORING_KEY_POINT_COLUMN_JQX()}
                        primaryKey={'id'}
                        respDataApi={handleRespDataApi}

                        filterable={true}
                        selectionmode={'singlerow'}
                        onRowSelected={handleCheckedRows}
                        exportbtn={true}
                    />
                </div>
             
            </div>
        </>
    );
}
