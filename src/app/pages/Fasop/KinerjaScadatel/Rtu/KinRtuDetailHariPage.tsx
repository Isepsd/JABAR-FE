import React, { useRef } from 'react';


/** CONFIG */
import { HIS_RTU_COLUMNS_JQX } from '@app/configs/react-table/fasop/spectrum-history.column';

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
                id: item?.id,
                number: item?.number,
                point_number: item?.point_number,
                jenis: item?. jenis,
                path1: item?.path1,
                path2: item?.path2,
                path3: item?.path3,
                path4: item?.path4,
                datum_1: item?.datum_1,
                datum_2: item?.datum_2,
                status_1: item.status_1,
                status_2: item.status_2,
                kesimpulan: item.kesimpulan,
                status_data: item.status_data,
                durasi: item?.durasi,
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
                    dataFieldsColsConfig={HIS_RTU_COLUMNS_JQX()}
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
