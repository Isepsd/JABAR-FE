import React, { useState, useRef } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { SCADATEL_STATUS_TELEMETERING_COLUMN_JQX } from '@app/configs/react-table/fasop/spectrum-realtime.column'

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

import Filter from './Filter';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function StatTelemeteringPageJQnew() {
    let roleAccess = ROLE_ACCESS("telemetering");
    const roleActions = {
        view: ROLE_ACTION(roleAccess, 'view'),
        create: ROLE_ACTION(roleAccess, 'create'),
        update: ROLE_ACTION(roleAccess, 'update'),
        delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    const dataSelected = useRef<any>();


    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                number: item?.number,
                point_number: item?.point_number,
                nama_pointtype: item?.nama_pointtype,
                path1: item?.path1,
                path2: item?.path2,
                path3: item?.path3,
                path4: item?.path4,
                path5: item?.path5,
                status_2: item?.status_2,
                datum_2: item?.datum_2,
                durasi: item?.durasi,
                value: item?.value,
                datum_capture: item?.datum_capture,
                kesimpulan: item?.kesimpulan
            });
        });
        return dataTableValue;
    }

    const handleRowSelected = (data: any) => {
        dataSelected.current = data.current;
       
    }

    const [filterValues, setFilterValues] = useState<any>({
    
    });
//npm install smart-webcomponents-react --force
const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);

    };
    return (
        <>
         <Filter onFilterChange={handleFilterChange} />
            {roleActions.create && roleActions.update && roleActions.delete &&
                <JqxTabs theme={"light"}>
                    <ul style={{ marginLeft: 10 }} key="1">
                        <li><i className="fa-solid fa-server"></i> Telemetring</li>
                        {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
                    </ul>
                    <div key="2">
                        <TableDataJqxGridNew
                            //AKSI 
                            // addbtn={roleActions.create}
                            // updatebtn={roleActions.update}
                            // deletebtn={roleActions.delete}

                            //TABLE DATA
                            path={API_PATH().fasop.realtime.analog}
                            filterParams={{id_induk_pointtype: '798be05c-4df2-4945-9a47-5745a0de66c6', ...filterValues }}
                            dataFieldsColsConfig={SCADATEL_STATUS_TELEMETERING_COLUMN_JQX()}
                            primaryKey={'id_pointtype'}
                            respDataApi={handleRespDataApi}
                            filterable={true}
                            onRowSelected={handleRowSelected}
                            exportbtn={true}
                        />
                    </div>
                </JqxTabs>
            }

           
        </>
    );
}
