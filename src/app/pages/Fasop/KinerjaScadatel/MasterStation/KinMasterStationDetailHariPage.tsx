import React, { useRef } from 'react';

/** CONFIG */
import { HIS_MASTER_COLUMNS_JQX } from '@app/configs/react-table/fasop/spectrum-history.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import moment from 'moment';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { timeFormat } from '@app/helper/time.helper';
export default function KinTelemeteringDetailPage({ filterParams }: any) {
    
    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id: item?.id,
                master: item.master?.path3,
                datum_before: timeFormat(item.datum_before),
                datum_after: timeFormat(item.datum_after),
                msec_awal: item?.statekey_1,
                msec_akhir: item?.statekey_2,
                status_awal: item.status_1 == '1' ? 'runUp' : 'notCon',
                status_akhir: item.status_2 == '1' ? 'runUp' : 'notCon',
                kesimpulan: item.kesimpulan == '1' ? 'Valid' : 'Invalid',
                durasi: moment.utc(moment(item.datum_after).diff(moment(item.datum_before))).format("DD:HH:mm:ss"),
            });
        });
        return dataTableValue;
    }

    const path1 = filterParams?.path1 || null;
   

    const path3 = filterParams?.path3 || null;
   

     const mergedFilterParams = {
        ...filterParams,
        path1: path1,
        path3: path3,
       
    };

    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
            {filterParams?.path1 &&
                <TableDataJqxGridNew
                    //TABLE DATA
                    path={API_PATH().fasop.history.digital}
                    filterParams={mergedFilterParams}
                    dataFieldsColsConfig={HIS_MASTER_COLUMNS_JQX()}
                    primaryKey={'id'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
            }

        </>
    );
}
