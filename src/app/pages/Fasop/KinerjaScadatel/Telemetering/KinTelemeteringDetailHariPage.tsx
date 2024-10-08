import React, { useRef } from 'react';

/** CONFIG */
import { SCADATEL_HISTORI_TELEMETERING_COLUMN_JQX } from '@app/configs/react-table/fasop/spectrum-history.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function KinTelemeteringDetailPage({ filterParams }: any) {
    
    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id_pointtype: item?.id_pointtype,
        number: item?.number,
        point_number: item?.point_number,
        jenis: item?.jenis,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        path5: item?.path5,
        datum_1: item?.datum_1,
        status_1: item?.status_1,
        value_1: item?.value_1,
        msec_1: item?.msec_1,
        datum_2: item?.datum_2,
        status_2: item?.status_2,
        value_2: item?.value_2,
        msec_2: item?.msec_2,
        durasi: item?.durasi,
        status_data: item?.status_data,
        kesimpulan: item?.kesimpulan
            });
        });
        return dataTableValue;
    }

    const path1 = filterParams?.path1 || null;
   

     const mergedFilterParams = {
        ...filterParams,
        path1: path1,
       
    };

    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
            {filterParams?.path1 &&
                <TableDataJqxGridNew
                    //TABLE DATA
                    path={API_PATH().fasop.history.analog}
                    filterParams={mergedFilterParams}
                    dataFieldsColsConfig={SCADATEL_HISTORI_TELEMETERING_COLUMN_JQX()}
                    primaryKey={'id_scd_statusgardu'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
            }

        </>
    );
}
