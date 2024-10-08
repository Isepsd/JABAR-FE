import React, { useEffect, useState } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { MASTER_AMR_CUSTOMER_COLUMN_JQX, } from '@app/configs/react-table/master-opsisdis.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

export default function AmrCustomerJQ() {
    const [roleActions, setRoleActions] = useState<any>({});

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id: item?.id,
                number: item?.number,
                nama: item?.nama,
                lok: item?.lok,
                alamat: item?.alamat,
                customer_rid: item?.customer_rid,
                meter_id: item?.meter_id,
                meter_type: item?.meter_type,
                rate: item?.rate,
                modem_adr: item?.modem_adr,
                daya: item?.daya,
                bapm: item?.bapm,
                faktor_kali: item?.faktor_kali,
                nofa: item?.nofa,
                goltarif: item?.goltarif,
                kodegardu: item?.kodegardu,
                
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
        let roleAccess = ROLE_ACCESS("amr-customer");
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
                    <li><i className="fa-solid fa-server"></i> AMR Customer</li>
                    {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
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
                        path={API_PATH().master.opsisdis.customer}
                        filterParams={{}}
                        dataFieldsColsConfig={MASTER_AMR_CUSTOMER_COLUMN_JQX()}
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
