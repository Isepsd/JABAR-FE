import React, { useEffect, useState } from 'react';

/** CONFIG */
import { MASTER_FREQUENSI_METER_COLUMN_JQX, } from '@app/configs/react-table/master-opsisdis.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

export default function FrequensiMeterJQ() {
    const [roleActions, setRoleActions] = useState<any>({});

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id: item?.id,
                number: item?.number,
                id_meter: item?.id_meter,
                nama: item?.nama,
                koneksi: item?.lokasi,
                mode: item?.general_mode,
                lokasi: item?.lokasi,
                address: item?.general_address,
                slave_id: item?.general_slaveid,
                interval_logging: item?.general_interval_logging,
                xonxoff: item?.serial_xonxoff ? 'RTU ENABLE' : 'RTU DISBALED',
                byte_size: item?.serial_bytesize,
                baud_rate: item?.serial_baudrate,
                port: item?.serial_port,
                stop_bits: item?.serial_stopbits ? 'ONE' : '-',
                scale: item?.general_scale,
                parity: item?.serial_parity,
                serial: item?.serial_port,
                ip_host: item?.ip_host,
                ip_port: item?.ip_port,
                status: item?.status,
                general_logging: item?.general_logging,
                sumber_data: item?.sumber_data,
                path1: item?.path1,
                path2: item?.path2,
                path3: item?.path3,
                point_number: item?.point_number,

                
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
        let roleAccess = ROLE_ACCESS("frequensi-meter");
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
                    <li><i className="fa-solid fa-server"></i> Frequensi Meter</li>
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
                        path={API_PATH().master.opsisdis.frequensi}
                        filterParams={{}}
                        dataFieldsColsConfig={MASTER_FREQUENSI_METER_COLUMN_JQX()}
                        primaryKey={'id_meter'}
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